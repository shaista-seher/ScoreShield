'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Shield, 
  Search, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Star, 
  Users,
  ShoppingBag,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Eye
} from 'lucide-react'

// Types
interface Seller {
  seller_id: string
  trust_score: number
  avg_rating: number
  total_reviews: number
  verified_rate: number
  risk_level: string
}

interface PlatformStats {
  total_reviews: number
  total_sellers: number
  avg_rating: number
  fraud_rate: number
  verified_purchase_rate: number
  platform_distribution: Record<string, number>
}

interface Review {
  review_id: string
  seller_id: string
  rating: number
  review_text: string
  sentiment_score: number
  verified_purchase: string
  platform: string
  fraud_label: string
  complaint_type: string
}

// Mock data for demo
const mockPlatformStats: PlatformStats = {
  total_reviews: 12000,
  total_sellers: 1500,
  avg_rating: 3.8,
  fraud_rate: 15.2,
  verified_purchase_rate: 45,
  platform_distribution: {
    'Instagram': 2500,
    'WhatsApp Business': 2200,
    'Facebook Marketplace': 2000,
    'Meesho': 1800,
    'Quikr': 1500,
    'OLX': 1200,
    'Telegram': 500,
    'YouTube Live': 300
  }
}

const mockTopSellers: Seller[] = [
  { seller_id: 'S210', trust_score: 92.5, avg_rating: 4.8, total_reviews: 45, verified_rate: 95, risk_level: 'Low Risk' },
  { seller_id: 'S327', trust_score: 89.2, avg_rating: 4.6, total_reviews: 38, verified_rate: 88, risk_level: 'Low Risk' },
  { seller_id: 'S547', trust_score: 87.8, avg_rating: 4.5, total_reviews: 52, verified_rate: 82, risk_level: 'Low Risk' },
  { seller_id: 'S1131', trust_score: 85.3, avg_rating: 4.4, total_reviews: 41, verified_rate: 78, risk_level: 'Low Risk' },
  { seller_id: 'S1400', trust_score: 83.7, avg_rating: 4.3, total_reviews: 67, verified_rate: 75, risk_level: 'Low Risk' },
]

const mockRecentReviews: Review[] = [
  { review_id: 'R1', seller_id: 'S210', rating: 5, review_text: 'Excellent quality and fast delivery', sentiment_score: 0.8, verified_purchase: 'Yes', platform: 'WhatsApp Business', fraud_label: 'Genuine', complaint_type: '' },
  { review_id: 'R2', seller_id: 'S327', rating: 4, review_text: 'Product matches description perfectly', sentiment_score: 0.5, verified_purchase: 'Yes', platform: 'Quikr', fraud_label: 'Genuine', complaint_type: '' },
  { review_id: 'R3', seller_id: 'S1131', rating: 3, review_text: 'Battery drains quickly', sentiment_score: -0.6, verified_purchase: 'Yes', platform: 'Instagram', fraud_label: 'Complaint', complaint_type: 'Poor Quality' },
  { review_id: 'R4', seller_id: 'S1400', rating: 1, review_text: 'Battery drains quickly', sentiment_score: 0.5, verified_purchase: 'Yes', platform: 'OLX', fraud_label: 'Complaint', complaint_type: 'Wrong Item' },
  { review_id: 'R5', seller_id: 'S1471', rating: 3, review_text: 'Received wrong item', sentiment_score: -0.2, verified_purchase: 'No', platform: 'Quikr', fraud_label: 'Complaint', complaint_type: 'Battery Issue' },
]

export default function Home() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('dashboard')
  const [selectedPlatform, setSelectedPlatform] = useState('all')

  useEffect(() => {
    setMounted(true)
    // Check if user is logged in
    const token = localStorage.getItem('access_token')
    const role = localStorage.getItem('user_role')
    if (!token || !role) {
      router.push('/login')
    }
  }, [router])

  if (!mounted) {
    return (
      <div className="min-h-screen gradient-primary flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white"></div>
      </div>
    )
  }

  const getRiskColor = (risk: string) => {
    switch(risk) {
      case 'Low Risk': return 'text-green-600 bg-green-100'
      case 'Medium Risk': return 'text-yellow-600 bg-yellow-100'
      case 'High Risk': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'score-excellent'
    if (score >= 60) return 'score-good'
    if (score >= 40) return 'score-medium'
    return 'score-poor'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="gradient-primary text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="h-10 w-10" />
              <div>
                <h1 className="text-2xl font-bold">ScoreShield</h1>
                <p className="text-sm text-blue-100">Digital Reputation Scoring System</p>
              </div>
            </div>
            
            {/* Search Bar */}
            <div className="relative w-96">
              <input
                type="text"
                placeholder="Search seller by ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pl-10 rounded-lg bg-white/20 backdrop-blur text-white placeholder-blue-100 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-blue-100" />
            </div>

            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-lg hover:bg-white/10 transition">
                <Eye className="h-5 w-5" />
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Users className="h-5 w-5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4">
          <div className="flex space-x-8">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
              { id: 'sellers', label: 'Top Sellers', icon: Star },
              { id: 'analytics', label: 'Analytics', icon: Activity },
              { id: 'reviews', label: 'Review Analysis', icon: Search },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 transition ${
                  activeTab === item.id
                    ? 'border-purple-600 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <item.icon className="h-4 w-4" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6 card-hover">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Total Reviews</p>
                    <p className="text-3xl font-bold text-gray-800">{mockPlatformStats.total_reviews.toLocaleString()}</p>
                  </div>
                  <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center">
                    <ShoppingBag className="h-7 w-7 text-blue-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-green-500 font-medium">12%</span>
                  <span className="text-gray-400 ml-2">vs last month</span>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 card-hover">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Total Sellers</p>
                    <p className="text-3xl font-bold text-gray-800">{mockPlatformStats.total_sellers.toLocaleString()}</p>
                  </div>
                  <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
                    <Users className="h-7 w-7 text-green-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-green-500 font-medium">8%</span>
                  <span className="text-gray-400 ml-2">vs last month</span>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 card-hover">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Avg Rating</p>
                    <p className="text-3xl font-bold text-gray-800">{mockPlatformStats.avg_rating}</p>
                  </div>
                  <div className="w-14 h-14 rounded-full bg-yellow-100 flex items-center justify-center">
                    <Star className="h-7 w-7 text-yellow-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-green-500 font-medium">0.3</span>
                  <span className="text-gray-400 ml-2">vs last month</span>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 card-hover">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Fraud Rate</p>
                    <p className="text-3xl font-bold text-gray-800">{mockPlatformStats.fraud_rate}%</p>
                  </div>
                  <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center">
                    <AlertTriangle className="h-7 w-7 text-red-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <ArrowDownRight className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-green-500 font-medium">3%</span>
                  <span className="text-gray-400 ml-2">vs last month</span>
                </div>
              </div>
            </div>

            {/* Platform Distribution & Top Sellers */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Platform Distribution */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Platform Distribution</h3>
                <div className="space-y-4">
                  {Object.entries(mockPlatformStats.platform_distribution).map(([platform, count], index) => (
                    <div key={platform} className="flex items-center">
                      <div className="w-32 text-sm text-gray-600">{platform}</div>
                      <div className="flex-1 mx-4">
                        <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full gradient-primary rounded-full"
                            style={{ width: `${(count / mockPlatformStats.total_reviews) * 100}%` }}
                          />
                        </div>
                      </div>
                      <div className="w-16 text-sm text-gray-600 text-right">{count}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Sellers */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Rated Sellers</h3>
                <div className="space-y-4">
                  {mockTopSellers.map((seller, index) => (
                    <div key={seller.seller_id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${getScoreColor(seller.trust_score)}`}>
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{seller.seller_id}</p>
                          <p className="text-sm text-gray-500">{seller.total_reviews} reviews</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-2">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span className="font-bold">{seller.avg_rating}</span>
                        </div>
                        <div className={`text-xs px-2 py-1 rounded-full ${getRiskColor(seller.risk_level)}`}>
                          {seller.trust_score}% Trust
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Reviews */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Recent Reviews</h3>
                <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
                  View All →
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Seller ID</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Rating</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Review</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Platform</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Verified</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockRecentReviews.map((review) => (
                      <tr key={review.review_id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <span className="font-medium text-gray-800">{review.seller_id}</span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-4 w-4 ${i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
                              />
                            ))}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-gray-600 text-sm">{review.review_text}</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-gray-600 text-sm">{review.platform}</span>
                        </td>
                        <td className="py-3 px-4">
                          {review.verified_purchase === 'Yes' ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          ) : (
                            <AlertTriangle className="h-5 w-5 text-yellow-500" />
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            review.fraud_label === 'Genuine' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-red-100 text-red-700'
                          }`}>
                            {review.fraud_label}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'sellers' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Top Sellers Leaderboard</h2>
              <div className="space-y-4">
                {mockTopSellers.map((seller, index) => (
                  <div key={seller.seller_id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl ${getScoreColor(seller.trust_score)}`}>
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">{seller.seller_id}</h3>
                        <p className="text-sm text-gray-500">{seller.total_reviews} reviews • {seller.verified_rate}% verified</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-gray-800">{seller.trust_score}%</p>
                        <p className="text-xs text-gray-500">Trust Score</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-gray-800">{seller.avg_rating}</p>
                        <p className="text-xs text-gray-500">Rating</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(seller.risk_level)}`}>
                        {seller.risk_level}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Trust Score Distribution</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Excellent (80-100)</span>
                    <div className="flex items-center">
                      <div className="w-32 h-2 bg-gray-100 rounded-full mr-3">
                        <div className="h-full bg-green-500 rounded-full" style={{ width: '45%' }} />
                      </div>
                      <span className="text-gray-800 font-medium">45%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Good (60-79)</span>
                    <div className="flex items-center">
                      <div className="w-32 h-2 bg-gray-100 rounded-full mr-3">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: '30%' }} />
                      </div>
                      <span className="text-gray-800 font-medium">30%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Medium (40-59)</span>
                    <div className="flex items-center">
                      <div className="w-32 h-2 bg-gray-100 rounded-full mr-3">
                        <div className="h-full bg-yellow-500 rounded-full" style={{ width: '15%' }} />
                      </div>
                      <span className="text-gray-800 font-medium">15%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Poor (0-39)</span>
                    <div className="flex items-center">
                      <div className="w-32 h-2 bg-gray-100 rounded-full mr-3">
                        <div className="h-full bg-red-500 rounded-full" style={{ width: '10%' }} />
                      </div>
                      <span className="text-gray-800 font-medium">10%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Fraud Detection</h3>
                <div className="space-y-4">
                  <div className="text-center">
                    <p className="text-4xl font-bold text-red-600">{mockPlatformStats.fraud_rate}%</p>
                    <p className="text-gray-500">Overall Fraud Rate</p>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Fake Reviews</span>
                      <span className="font-medium">8%</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Complaints</span>
                      <span className="font-medium">12%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Suspicious Activity</span>
                      <span className="font-medium">5%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Verification Status</h3>
                <div className="space-y-4">
                  <div className="text-center">
                    <p className="text-4xl font-bold text-green-600">{mockPlatformStats.verified_purchase_rate}%</p>
                    <p className="text-gray-500">Verified Purchases</p>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Verified</span>
                      <span className="font-medium text-green-600">5,400</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Unverified</span>
                      <span className="font-medium text-yellow-600">6,600</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Review Analysis</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-800">Search Filters</h3>
                  <select className="w-full px-4 py-2 border rounded-lg">
                    <option>All Platforms</option>
                    <option>Instagram</option>
                    <option>WhatsApp Business</option>
                    <option>Facebook Marketplace</option>
                    <option>Meesho</option>
                  </select>
                  <select className="w-full px-4 py-2 border rounded-lg">
                    <option>All Ratings</option>
                    <option>5 Stars</option>
                    <option>4 Stars</option>
                    <option>3 Stars</option>
                    <option>2 Stars</option>
                    <option>1 Star</option>
                  </select>
                  <select className="w-full px-4 py-2 border rounded-lg">
                    <option>All Status</option>
                    <option>Genuine</option>
                    <option>Fake</option>
                    <option>Complaint</option>
                  </select>
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-800">AI Analysis</h3>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <p className="text-sm text-purple-700">
                      Our AI models analyze reviews using multiple features including sentiment score, 
                      review length, verified purchase status, IP review frequency, and device reuse patterns 
                      to detect fraudulent reviews.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg text-center">
                      <p className="text-2xl font-bold text-gray-800">92%</p>
                      <p className="text-sm text-gray-500">Model Accuracy</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg text-center">
                      <p className="text-2xl font-bold text-gray-800">0.89</p>
                      <p className="text-sm text-gray-500">F1 Score</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">All Reviews</h3>
              <div className="space-y-4">
                {mockRecentReviews.map((review) => (
                  <div key={review.review_id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold text-gray-800">{review.seller_id}</span>
                          <span className="text-gray-400">•</span>
                          <span className="text-gray-500 text-sm">{review.platform}</span>
                        </div>
                        <div className="flex items-center mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-4 w-4 ${i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                        <p className="text-gray-600 mt-2">{review.review_text}</p>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          review.fraud_label === 'Genuine' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {review.fraud_label}
                        </span>
                        <span className="text-xs text-gray-500 mt-2">
                          Sentiment: {review.sentiment_score > 0 ? 'Positive' : review.sentiment_score < 0 ? 'Negative' : 'Neutral'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="h-8 w-8" />
              <div>
                <p className="font-bold">ScoreShield</p>
                <p className="text-sm text-gray-400">Digital Reputation Scoring System</p>
              </div>
            </div>
            <div className="text-sm text-gray-400">
              © 2026 ScoreShield. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
