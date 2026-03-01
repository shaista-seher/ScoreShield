# ScoreShield - Digital Reputation Scoring System

ScoreShield is an AI-powered digital reputation scoring system designed for small online sellers on social media platforms like Instagram, WhatsApp, Facebook Marketplace, Meesho, Quikr, OLX, Telegram, and YouTube Live.

## Features

- **Trust Score Calculation**: Real-time trust scores based on multiple factors
- **Fraud Detection**: AI/ML models to detect fake reviews and suspicious activity
- **Sentiment Analysis**: Analyzes review text to determine customer sentiment
- **Platform Analytics**: Comprehensive analytics across multiple platforms
- **Seller Dashboard**: View top-rated sellers and their performance metrics
- **Review Analysis**: Detailed review filtering and analysis

## Tech Stack

### Frontend
- React.js / Next.js
- Tailwind CSS
- Chart.js for analytics
- Lucide React for icons

### Backend
- Python
- FastAPI
- Uvicorn server

### Machine Learning
- XGBoost for fraud detection
- Pandas for data handling
- Scikit-learn for model training
- NLTK/TextBlob for sentiment analysis

### Database
- MongoDB (for production)
- CSV data file (for demo)

## Project Structure

```
ScoreShield/
├── frontend/               # Next.js frontend
│   ├── app/               # App router pages
│   ├── components/        # React components
│   └── public/            # Static assets
├── backend/               # FastAPI backend
│   ├── main.py            # API endpoints
│   ├── database/          # Database models
│   ├── models/            # ML models
│   └── requirements.txt   # Python dependencies
├── ml/                    # Machine Learning
│   └── fraud_detection.py # ML model code
├── data/                  # Dataset
│   └── ScoreShield_12000_Rows_With_Platforms.csv
├── index.html             # Standalone demo
└── README.md
```

## Getting Started

### Option 1: Standalone Demo (HTML)

Simply open `index.html` in a web browser to see the demo.

### Option 2: Full Stack Application

1. **Install Python dependencies**:
```
bash
cd backend
pip install -r requirements.txt
```

2. **Train ML Model** (optional - pre-trained model included):
```
bash
cd ml
python fraud_detection.py
```

3. **Start Backend Server**:
```
bash
cd backend
uvicorn main:app --reload
```

4. **Set up Frontend**:
```
bash
cd frontend
npm install
npm run dev
```

5. **Access the Application**:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000

## API Endpoints

- `GET /` - Root endpoint
- `POST /analyze-review` - Analyze a single review
- `GET /seller/{seller_id}/trust-score` - Get seller trust score
- `GET /sellers/top-rated` - Get top-rated sellers
- `GET /analytics/platform-stats` - Get platform statistics

## Dataset Features

The dataset includes:
- Platform (social media platform)
- Product information (ID, category, subcategory, price)
- Review data (ID, rating, text, sentiment)
- Seller information
- Behavioral features (IP frequency, device reuse)
- Fraud labels (Genuine, Fake, Complaint)

## Trust Score Algorithm

The trust score (0-100) is calculated using:
- Average rating (30%)
- Verified purchase rate (25%)
- Complaint rate (25%)
- Sentiment score (10%)
- Fraud detection rate (10%)

## License

MIT License - © 2026 ScoreShield
