"""
Fraud Detection Model for ScoreShield
Uses XGBoost to detect fake reviews and suspicious seller behavior
"""

import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from xgboost import XGBClassifier
from sklearn.metrics import classification_report, accuracy_score, confusion_matrix
import joblib
import os

# Load dataset
def load_data(filepath):
    """Load the dataset from CSV file"""
    df = pd.read_csv(filepath)
    return df

# Preprocess data
def preprocess_data(df):
    """Preprocess the data for model training"""
    
    # Make a copy
    df = df.copy()
    
    # Encode categorical variables
    label_encoders = {}
    
    categorical_columns = ['Platform', 'Product_Category', 'Product_Subcategory', 
                          'Verified_Purchase', 'Return_Requested', 'Damage_Reported', 
                          'Complaint_Type', 'Fraud_Label']
    
    for col in categorical_columns:
        if col in df.columns:
            le = LabelEncoder()
            df[col] = df[col].fillna('Unknown')
            df[col] = le.fit_transform(df[col].astype(str))
            label_encoders[col] = le
    
    return df, label_encoders

# Feature engineering
def create_features(df):
    """Create features for fraud detection"""
    
    # Text-based features
    df['review_length'] = df['Review_Text'].apply(lambda x: len(str(x)) if pd.notna(x) else 0)
    df['word_count'] = df['Review_Text'].apply(lambda x: len(str(x).split()) if pd.notna(x) else 0)
    
    # Behavioral features (already in dataset)
    # IP_Review_Frequency, Device_Reuse_Count, Burst_Review_Flag
    
    # Sentiment deviation (difference between rating and sentiment score)
    df['sentiment_rating_diff'] = abs(df['Sentiment_Score'] - df['Rating'] / 2)
    
    # Verified purchase vs rating anomaly
    df['verified_rating_anomaly'] = ((df['Verified_Purchase'] == 0) & (df['Rating'] >= 4)).astype(int)
    
    return df

# Prepare features for training
def prepare_features(df):
    """Prepare feature matrix for model training"""
    
    feature_columns = [
        'Rating', 'Review_Length', 'Sentiment_Score', 
        'Delivery_Days', 'IP_Review_Frequency', 'Device_Reuse_Count',
        'sentiment_rating_diff', 'verified_rating_anomaly'
    ]
    
    # Add platform if encoded
    if 'Platform' in df.columns:
        feature_columns.append('Platform')
    
    X = df[feature_columns].fillna(0)
    return X

# Train the model
def train_model(df):
    """Train the fraud detection model"""
    
    # Create features
    df = create_features(df)
    df, label_encoders = preprocess_data(df)
    
    # Prepare features and target
    X = prepare_features(df)
    y = df['Fraud_Label']
    
    # Split data
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )
    
    # Train XGBoost model
    model = XGBClassifier(
        n_estimators=100,
        max_depth=6,
        learning_rate=0.1,
        random_state=42,
        use_label_encoder=False,
        eval_metric='logloss'
    )
    
    model.fit(X_train, y_train)
    
    # Evaluate
    y_pred = model.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)
    
    print("Model Training Complete!")
    print(f"Accuracy: {accuracy:.4f}")
    print("\nClassification Report:")
    print(classification_report(y_test, y_pred))
    
    # Confusion Matrix
    cm = confusion_matrix(y_test, y_pred)
    print("\nConfusion Matrix:")
    print(cm)
    
    return model, label_encoders

# Save model
def save_model(model, label_encoders, model_path='models/fraud_model.pkl'):
    """Save the trained model"""
    os.makedirs(os.path.dirname(model_path), exist_ok=True)
    joblib.dump({'model': model, 'label_encoders': label_encoders}, model_path)
    print(f"Model saved to {model_path}")

# Load model
def load_model(model_path='models/fraud_model.pkl'):
    """Load the trained model"""
    model_data = joblib.load(model_path)
    return model_data['model'], model_data['label_encoders']

# Predict fraud probability
def predict_fraud(model, features):
    """Predict fraud probability for given features"""
    prediction = model.predict(features)
    probability = model.predict_proba(features)
    return prediction, probability

# Calculate trust score
def calculate_trust_score(seller_data, fraud_model):
    """Calculate trust score for a seller based on their reviews"""
    
    if len(seller_data) == 0:
        return 50.0  # Default score
    
    # Calculate various metrics
    avg_rating = seller_data['Rating'].mean()
    verified_purchase_rate = (seller_data['Verified_Purchase'] == 'Yes').mean()
    complaint_rate = seller_data['Fraud_Label'].apply(lambda x: 1 if x != 'Genuine' else 0).mean()
    avg_sentiment = seller_data['Sentiment_Score'].mean()
    
    # Fraud prediction rate
    fraud_predictions = []
    for _, row in seller_data.iterrows():
        features = [[
            row['Rating'], row['Review_Length'], row['Sentiment_Score'],
            row['Delivery_Days'], row['IP_Review_Frequency'], row['Device_Reuse_Count'],
            abs(row['Sentiment_Score'] - row['Rating'] / 2),
            1 if row['Verified_Purchase'] == 'No' and row['Rating'] >= 4 else 0
        ]]
        pred = fraud_model.predict(features)[0]
        fraud_predictions.append(pred)
    
    fraud_rate = np.mean(fraud_predictions)
    
    # Calculate trust score (0-100)
    trust_score = (
        (avg_rating / 5) * 30 +  # Rating contributes 30%
        verified_purchase_rate * 25 +  # Verified purchases contribute 25%
        (1 - complaint_rate) * 25 +  # Low complaints contribute 25%
        (avg_sentiment + 1) / 2 * 10 +  # Sentiment contributes 10%
        (1 - fraud_rate) * 10  # Low fraud contributes 10%
    )
    
    return round(trust_score * 100, 2)

if __name__ == "__main__":
    # Load data
    data_path = "data/ScoreShield_12000_Rows_With_Platforms.csv"
    df = load_data(data_path)
    
    print(f"Loaded {len(df)} records")
    print(f"Columns: {df.columns.tolist()}")
    print(f"\nFraud Label Distribution:")
    print(df['Fraud_Label'].value_counts())
    
    # Train model
    model, label_encoders = train_model(df)
    
    # Save model
    save_model(model, label_encoders, 'backend/models/fraud_model.pkl')
