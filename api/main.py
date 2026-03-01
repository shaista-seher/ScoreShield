"""
ScoreShield Backend API - Vercel Serverless Functions
FastAPI application for digital reputation scoring
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
from datetime import datetime, timedelta
import os
import sys
import hashlib
import secrets

# Vercel serverless environment
vercel_env = os.environ.get('VERCEL', 'false') == 'true'

app = FastAPI(
    title="ScoreShield API",
    description="Digital Reputation Scoring System for Small Online Sellers",
    version="1.0.0"
)

# CORS middleware - allow all origins for Vercel
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Vercel will handle this better in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global variables for ML models (cached across invocations)
fraud_model = None
label_encoders = None

# MongoDB connection
from pymongo import MongoClient
mongo_client = None
db = None

def get_db():
    """Get MongoDB database connection"""
    global mongo_client, db
    if db is None:
        mongo_uri = os.environ.get('MONGODB_URL', os.environ.get('MONGO_URI', ''))
        if mongo_uri:
            try:
                mongo_client = MongoClient(mongo_uri)
                db = mongo_client['scoreshield']
                # Test connection
                mongo_client.admin.command('ping')
                print("Connected to MongoDB")
            except Exception as e:
                print(f"MongoDB connection error: {e}")
                db = None
    return db

# JWT Secret for token generation
JWT_SECRET = os.environ.get('JWT_SECRET', 'scoreshield-secret-key-change-in-production')
ACCESS_TOKEN_EXPIRE_MINUTES = 30

def create_access_token(data: dict):
    """Create JWT access token"""
    import base64
    import json
    import time
    
    payload = {
        "sub": data.get("email", data.get("sub", "")),
        "exp": datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES),
        "iat": datetime.utcnow()
    }
    
    # Simple base64 encoding for demo (use proper JWT in production)
    token_data = json.dumps(payload)
    encoded = base64.b64encode(token_data.encode()).decode()
    return encoded

def verify_token(token: str):
    """Verify JWT token"""
    import base64
    import json
    
    try:
        decoded = base64.b64decode(token.encode()).decode()
        payload = json.loads(decoded)
        
        exp = payload.get("exp")
        if exp:
            exp_datetime = datetime.fromisoformat(exp.replace('Z', '+00:00'))
            if exp_datetime < datetime.utcnow():
                return None
        
        return payload
    except:
        return None

def hash_password(password: str) -> str:
    """Hash password using SHA256"""
    return hashlib.sha256(password.encode()).hexdigest()

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify password against hash"""
    return hash_password(plain_password) == hashed_password

def load_models():
    """Lazy load ML models"""
    global fraud_model, label_encoders
    if fraud_model is None:
        try:
            from ml.fraud_detection import load_model
            import joblib
            
            # Try multiple paths for model
            model_paths = [
                os.path.join(os.path.dirname(__file__), "models", "fraud_model.pkl"),
                os.path.join(os.path.dirname(__file__), "..", "backend", "models", "fraud_model.pkl"),
                "/var/task/backend/models/fraud_model.pkl"
            ]
            
            for model_path in model_paths:
                if os.path.exists(model_path):
                    fraud_model, label_encoders = load_model(model_path)
                    print("ML models loaded successfully")
                    break
        except Exception as e:
            print(f"Error loading ML models: {e}")

# Pydantic models for API
class ReviewData(BaseModel):
    seller_id: str
    rating: float
    review_text: str
    sentiment_score: float
    verified_purchase: bool
    delivery_days: int
    ip_review_frequency: int
    device_reuse_count: int
    platform: str

class TrustScoreResponse(BaseModel):
    seller_id: str
    trust_score: float
    risk_level: str
    factors: Dict[str, Any]
    last_updated: datetime

class ReviewAnalysisResponse(BaseModel):
    review_id: str
    fraud_probability: float
    sentiment_analysis: Dict[str, Any]
    risk_factors: List[str]

# API Routes
@app.get("/")
async def root():
    """Root endpoint"""
    return {"message": "ScoreShield API", "version": "1.0.0", "status": "running"}

@app.get("/api")
async def api_root():
    """API root endpoint"""
    return {"message": "ScoreShield API", "version": "1.0.0", "status": "running"}

@app.post("/api/analyze-review", response_model=ReviewAnalysisResponse)
async def analyze_review(review: ReviewData):
    """Analyze a single review for fraud detection"""
    load_models()
    
    if fraud_model is None:
        raise HTTPException(status_code=503, detail="ML model not loaded")

    try:
        from ml.fraud_detection import create_features
        import pandas as pd
        
        # Prepare features for ML model
        features = create_features(pd.DataFrame([{
            'Rating': review.rating,
            'Review_Text': review.review_text,
            'Sentiment_Score': review.sentiment_score,
            'Verified_Purchase': 'Yes' if review.verified_purchase else 'No',
            'Delivery_Days': review.delivery_days,
            'IP_Review_Frequency': review.ip_review_frequency,
            'Device_Reuse_Count': review.device_reuse_count,
            'Platform': review.platform
        }]))

        # Get fraud prediction
        fraud_pred, fraud_prob = fraud_model.predict(features), fraud_model.predict_proba(features)

        # Analyze sentiment and risk factors
        risk_factors = []
        if fraud_prob[0][1] > 0.7:
            risk_factors.append("High fraud probability")
        if review.ip_review_frequency > 5:
            risk_factors.append("High IP review frequency")
        if review.device_reuse_count > 3:
            risk_factors.append("Device reuse detected")
        if not review.verified_purchase:
            risk_factors.append("Unverified purchase")

        sentiment_analysis = {
            "score": review.sentiment_score,
            "rating_match": abs(review.sentiment_score - review.rating/5) < 0.3
        }

        return ReviewAnalysisResponse(
            review_id=f"review_{review.seller_id}_{datetime.now().timestamp()}",
            fraud_probability=float(fraud_prob[0][1]),
            sentiment_analysis=sentiment_analysis,
            risk_factors=risk_factors
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")

@app.get("/api/seller/{seller_id}/trust-score", response_model=TrustScoreResponse)
async def get_seller_trust_score(seller_id: str):
    """Get trust score for a seller"""
    load_models()
    
    if fraud_model is None:
        raise HTTPException(status_code=503, detail="ML model not loaded")

    try:
        import pandas as pd
        from ml.fraud_detection import calculate_trust_score
        
        # Load seller data
        data_paths = [
            os.path.join(os.path.dirname(__file__), "data", "ScoreShield_12000_Rows_With_Platforms.csv"),
            os.path.join(os.path.dirname(__file__), "..", "data", "ScoreShield_12000_Rows_With_Platforms.csv"),
            "/var/task/data/ScoreShield_12000_Rows_With_Platforms.csv"
        ]
        
        df = None
        for data_path in data_paths:
            if os.path.exists(data_path):
                df = pd.read_csv(data_path)
                break
        
        if df is None:
            raise HTTPException(status_code=500, detail="Data file not found")

        # Filter reviews for this seller
        seller_reviews = df[df['Seller_ID'] == seller_id]

        if len(seller_reviews) == 0:
            raise HTTPException(status_code=404, detail="Seller not found")

        # Calculate trust score
        trust_score = calculate_trust_score(seller_reviews, fraud_model)

        # Determine risk level
        if trust_score >= 80:
            risk_level = "Low Risk"
        elif trust_score >= 60:
            risk_level = "Medium Risk"
        else:
            risk_level = "High Risk"

        # Calculate factors
        avg_rating = seller_reviews['Rating'].mean()
        verified_rate = (seller_reviews['Verified_Purchase'] == 'Yes').mean()
        complaint_rate = seller_reviews['Fraud_Label'].apply(lambda x: 1 if x != 'Genuine' else 0).mean()

        factors = {
            "total_reviews": len(seller_reviews),
            "average_rating": round(avg_rating, 2),
            "verified_purchase_rate": round(verified_rate * 100, 2),
            "complaint_rate": round(complaint_rate * 100, 2),
            "platform_distribution": seller_reviews['Platform'].value_counts().to_dict()
        }

        return TrustScoreResponse(
            seller_id=seller_id,
            trust_score=round(trust_score, 2),
            risk_level=risk_level,
            factors=factors,
            last_updated=datetime.now()
        )

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Trust score calculation failed: {str(e)}")

@app.get("/api/sellers/top-rated")
async def get_top_rated_sellers(limit: int = 10):
    """Get top-rated sellers"""
    try:
        import pandas as pd
        
        data_paths = [
            os.path.join(os.path.dirname(__file__), "data", "ScoreShield_12000_Rows_With_Platforms.csv"),
            os.path.join(os.path.dirname(__file__), "..", "data", "ScoreShield_12000_Rows_With_Platforms.csv"),
            "/var/task/data/ScoreShield_12000_Rows_With_Platforms.csv"
        ]
        
        df = None
        for data_path in data_paths:
            if os.path.exists(data_path):
                df = pd.read_csv(data_path)
                break
        
        if df is None:
            return {"sellers": []}

        # Group by seller and calculate metrics
        seller_stats = df.groupby('Seller_ID').agg({
            'Rating': 'mean',
            'Review_ID': 'count',
            'Verified_Purchase': lambda x: (x == 'Yes').mean(),
            'Fraud_Label': lambda x: (x != 'Genuine').mean()
        }).round(2)

        seller_stats.columns = ['avg_rating', 'total_reviews', 'verified_rate', 'fraud_rate']

        # Filter sellers with minimum reviews
        seller_stats = seller_stats[seller_stats['total_reviews'] >= 5]

        # Calculate trust score approximation
        seller_stats['trust_score'] = (
            seller_stats['avg_rating'] * 0.4 +
            seller_stats['verified_rate'] * 0.3 +
            (1 - seller_stats['fraud_rate']) * 0.3
        ) * 25  # Scale to 0-100

        # Sort by trust score and return top sellers
        top_sellers = seller_stats.nlargest(limit, 'trust_score')

        return {
            "sellers": [
                {
                    "seller_id": seller_id,
                    "trust_score": round(row['trust_score'], 2),
                    "avg_rating": row['avg_rating'],
                    "total_reviews": int(row['total_reviews']),
                    "verified_rate": round(row['verified_rate'] * 100, 2)
                }
                for seller_id, row in top_sellers.iterrows()
            ]
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to get top sellers: {str(e)}")

@app.get("/api/analytics/platform-stats")
async def get_platform_stats():
    """Get platform-wide statistics"""
    try:
        import pandas as pd
        
        data_paths = [
            os.path.join(os.path.dirname(__file__), "data", "ScoreShield_12000_Rows_With_Platforms.csv"),
            os.path.join(os.path.dirname(__file__), "..", "data", "ScoreShield_12000_Rows_With_Platforms.csv"),
            "/var/task/data/ScoreShield_12000_Rows_With_Platforms.csv"
        ]
        
        df = None
        for data_path in data_paths:
            if os.path.exists(data_path):
                df = pd.read_csv(data_path)
                break
        
        if df is None:
            return {
                "total_reviews": 0,
                "total_sellers": 0,
                "avg_rating": 0,
                "fraud_rate": 0,
                "platform_distribution": {},
                "verified_purchase_rate": 0
            }

        stats = {
            "total_reviews": len(df),
            "total_sellers": df['Seller_ID'].nunique(),
            "avg_rating": round(df['Rating'].mean(), 2),
            "fraud_rate": round((df['Fraud_Label'] != 'Genuine').mean() * 100, 2),
            "platform_distribution": df['Platform'].value_counts().to_dict(),
            "verified_purchase_rate": round((df['Verified_Purchase'] == 'Yes').mean() * 100, 2)
        }

        return stats

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to get platform stats: {str(e)}")

# Auth routes
class RegisterRequest(BaseModel):
    email: str
    password: str
    name: str
    role: str = "customer"

class LoginRequest(BaseModel):
    email: str
    password: str

@app.post("/api/auth/register")
async def register(request: RegisterRequest):
    """User registration"""
    database = get_db()
    
    if database is None:
        return {
            "message": "MongoDB not connected. Please configure MONGODB_URL environment variable.",
            "status": "error"
        }
    
    try:
        existing_user = database.users.find_one({"email": request.email})
        if existing_user:
            return {"message": "Email already registered", "status": "error"}
        
        new_user = {
            "email": request.email,
            "password_hash": hash_password(request.password),
            "name": request.name,
            "role": request.role,
            "seller_id": None,
            "is_active": True,
            "created_at": datetime.utcnow()
        }
        
        result = database.users.insert_one(new_user)
        access_token = create_access_token({"email": request.email})
        
        return {
            "message": "User registered successfully",
            "status": "success",
            "user_id": str(result.inserted_id),
            "email": request.email,
            "name": request.name,
            "role": request.role,
            "access_token": access_token,
            "token_type": "bearer"
        }
    except Exception as e:
        return {"message": f"Registration failed: {str(e)}", "status": "error"}

@app.post("/api/auth/login")
async def login(request: LoginRequest):
    """User login"""
    database = get_db()
    
    if database is None:
        return {
            "message": "MongoDB not connected. Please configure MONGODB_URL environment variable.",
            "status": "error"
        }
    
    try:
        user = database.users.find_one({"email": request.email})
        if not user:
            return {"message": "Invalid email or password", "status": "error"}
        
        if not verify_password(request.password, user.get("password_hash", "")):
            return {"message": "Invalid email or password", "status": "error"}
        
        if not user.get("is_active", True):
            return {"message": "Account is disabled", "status": "error"}
        
        access_token = create_access_token({"email": request.email})
        
        return {
            "message": "Login successful",
            "status": "success",
            "email": user["email"],
            "name": user.get("name", ""),
            "role": user.get("role", "customer"),
            "access_token": access_token,
            "token_type": "bearer"
        }
    except Exception as e:
        return {"message": f"Login failed: {str(e)}", "status": "error"}

@app.get("/api/auth/me")
async def get_me(authorization: str = None):
    """Get current user information"""
    if not authorization:
        return {"message": "No token provided", "status": "error"}
    
    if authorization.startswith("Bearer "):
        token = authorization[7:]
    else:
        token = authorization
    
    payload = verify_token(token)
    if payload is None:
        return {"message": "Invalid or expired token", "status": "error"}
    
    database = get_db()
    if database is None:
        return {"message": "Database not connected", "status": "error"}
    
    user = database.users.find_one({"email": payload.get("sub")})
    if not user:
        return {"message": "User not found", "status": "error"}
    
    return {
        "email": user["email"],
        "name": user.get("name", ""),
        "role": user.get("role", "customer"),
        "seller_id": user.get("seller_id"),
        "status": "success"
    }

# Vercel handler
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
