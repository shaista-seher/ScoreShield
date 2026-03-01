'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  Shield, 
  Star, 
  Search,
  Heart,
  Settings,
  LogOut,
  Bell,
  Filter,
  MapPin,
  ShoppingBag,
  CheckCircle,
  AlertTriangle,
  Home,
  User,
  MessageSquare,
  TrendingUp,
  Package,
  CreditCard,
  Eye,
  ThumbsUp,
  Clock,
  Calendar,
  DollarSign,
  Award,
  Zap,
  Sparkles,
  Target,
  Activity,
  FileText,
  ChevronRight,
  Plus,
  Edit,
  Download,
  BarChart3,
  Users,
  Globe,
  Phone,
  Mail
} from 'lucide-react'

interface Seller {
  seller_id: string
  trust_score: number
  avg_rating: number
  total_reviews: number
  verified_rate: number
  risk_level: string
  platform: string
}

export default function CustomerDashboard() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [sellers, setSellers] = useState<Seller[]>([])
  const [savedSellers, setSavedSellers] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('search')

  useEffect(() => {
    setMounted(true)
    checkAuth()
    fetchSellers()
    loadSavedSellers()
  }, [])

  const checkAuth = () => {
    const token = localStorage.getItem('access_token')
    const role = localStorage.getItem('user_role')
    
    if (!token || role !== 'customer') {
      router.push('/login')
      return
    }
  }

  const fetchSellers = async () => {
    try {
      const response = await fetch('http://localhost:8000/sellers/top-rated?limit=20')
      if (response.ok) {
        const data = await response.json()
        setSellers(data.sellers || [])
      }
    } catch (error) {
      // Use mock data if API is not available
      setSellers([
        { seller_id: 'S210', trust_score: 92.5, avg_rating: 4.8, total_reviews: 45, verified_rate: 95, risk_level: 'Low Risk', platform: 'Instagram' },
        { seller_id: 'S327', trust_score: 89.2, avg_rating: 4.6, total_reviews: 38, verified_rate: 88, risk_level: 'Low Risk', platform: 'WhatsApp Business' },
        { seller_id: 'S547', trust_score: 87.8, avg_rating: 4.5, total_reviews: 52, verified_rate: 82, risk_level: 'Low Risk', platform: 'Facebook' },
        { seller_id: 'S1131', trust_score: 85.3, avg_rating: 4.4, total_reviews: 41, verified_rate: 78, risk_level: 'Low Risk', platform: 'Meesho' },
        { seller_id: 'S1400', trust_score: 83.7, avg_rating: 4.3, total_reviews: 67, verified_rate: 75, risk_level: 'Low Risk', platform: 'OLX' },
      ])
    } finally {
      setLoading(false)
    }
  }

  const loadSavedSellers = () => {
    const saved = localStorage.getItem('saved_sellers')
    if (saved) {
      setSavedSellers(JSON.parse(saved))
    }
  }

  const toggleSaveSeller = (sellerId: string) => {
    let updated: string[]
    if (savedSellers.includes(sellerId)) {
      updated = savedSellers.filter(id => id !== sellerId)
    } else {
      updated = [...savedSellers, sellerId]
    }
    setSavedSellers(updated)
    localStorage.setItem('saved_sellers', JSON.stringify(updated))
  }

  const handleLogout = () => {
    localStorage.clear()
    router.push('/login')
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

  const filteredSellers = sellers.filter(seller => 
    seller.seller_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    seller.platform.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (!mounted || loading) {
    return (
      <div className="min-h-screen gradient-success flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-blue-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-green-600 to-teal-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Shield className="h-12 w-12" />
                <Sparkles className="absolute -top-1 -right-1 h-4 w-4 text-yellow-300" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Customer Portal</h1>
                <p className="text-green-100">Shop with confidence, {localStorage.getItem('user_name')}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="relative p-2 rounded-lg hover:bg-white/10 transition">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button 
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur rounded-lg hover:bg-white/20 transition"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex space-x-1 overflow-x-auto">
            {[
              { id: 'search', label: 'Find Sellers', icon: Search, color: 'green' },
              { id: 'saved', label: 'Saved Sellers', icon: Heart, color: 'pink' },
              { id: 'orders', label: 'My Orders', icon: Package, color: 'blue' },
              { id: 'reviews', label: 'My Reviews', icon: Star, color: 'yellow' },
              { id: 'analytics', label: 'Analytics', icon: BarChart3, color: 'purple' },
              { id: 'settings', label: 'Settings', icon: Settings, color: 'gray' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-2 py-4 px-4 border-b-2 transition-all duration-200 whitespace-nowrap ${
                  activeTab === item.id
                    ? `border-${item.color}-500 text-${item.color}-600 bg-${item.color}-50`
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Find Sellers Tab */}
        {activeTab === 'search' && (
          <div className="space-y-6 animate-fade-in">
            {/* Search Section */}
            <div className="bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl shadow-xl p-8 text-white">
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold mb-2">Find Trusted Sellers</h2>
                <p className="text-green-100">Search for verified sellers with high trust scores</p>
              </div>
              <div className="max-w-2xl mx-auto">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-green-200" />
                  <input
                    type="text"
                    placeholder="Search sellers by ID, platform, or name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-16 py-4 bg-white/20 backdrop-blur border border-white/30 rounded-xl text-white placeholder-green-200 focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                  <button className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-white text-green-600 rounded-lg hover:bg-green-50 transition font-medium">
                    Search
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100">Verified Sellers</p>
                    <p className="text-3xl font-bold">1,247</p>
                  </div>
                  <CheckCircle className="h-10 w-10 text-blue-200" />
                </div>
              </div>
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100">Avg Trust Score</p>
                    <p className="text-3xl font-bold">85.2%</p>
                  </div>
                  <Award className="h-10 w-10 text-purple-200" />
                </div>
              </div>
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-100">Active Today</p>
                    <p className="text-3xl font-bold">342</p>
                  </div>
                  <Activity className="h-10 w-10 text-orange-200" />
                </div>
              </div>
            </div>

            {/* Sellers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSellers.map((seller) => (
                <div key={seller.seller_id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 overflow-hidden group">
                  <div className="h-2 bg-gradient-to-r from-green-500 to-teal-500"></div>
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-gray-800 mb-1">{seller.seller_id}</h3>
                        <div className="flex items-center space-x-2">
                          <Globe className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-500">{seller.platform}</span>
                        </div>
                      </div>
                      <button 
                        onClick={() => toggleSaveSeller(seller.seller_id)}
                        className={`p-2 rounded-full transition-all duration-200 ${
                          savedSellers.includes(seller.seller_id) 
                            ? 'bg-red-100 text-red-500 hover:bg-red-200' 
                            : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                        }`}
                      >
                        <Heart className={`h-5 w-5 ${savedSellers.includes(seller.seller_id) ? 'fill-current' : ''}`} />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-20 h-20 rounded-full flex items-center justify-center text-white font-bold text-2xl ${getScoreColor(seller.trust_score)} shadow-lg`}>
                        {seller.trust_score}%
                      </div>
                      <div className="text-right">
                        <div className="flex items-center justify-end mb-1">
                          <Star className="h-5 w-5 text-yellow-500 fill-yellow-500 mr-1" />
                          <span className="font-bold text-lg text-gray-800">{seller.avg_rating}</span>
                        </div>
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getRiskColor(seller.risk_level)}`}>
                          {seller.risk_level}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                      <div className="text-center p-2 bg-gray-50 rounded-lg">
                        <p className="text-gray-500 text-xs">Reviews</p>
                        <p className="font-bold text-gray-800">{seller.total_reviews}</p>
                      </div>
                      <div className="text-center p-2 bg-gray-50 rounded-lg">
                        <p className="text-gray-500 text-xs">Verified</p>
                        <p className="font-bold text-gray-800">{seller.verified_rate}%</p>
                      </div>
                    </div>

                    <button className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold py-3 rounded-lg hover:from-green-600 hover:to-teal-600 transition-all duration-200 transform hover:scale-[1.02]">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Saved Sellers Tab */}
        {activeTab === 'saved' && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Saved Sellers</h2>
                <div className="flex items-center space-x-2 text-pink-600">
                  <Heart className="h-5 w-5 fill-pink-600" />
                  <span className="font-medium">{savedSellers.length} saved</span>
                </div>
              </div>
              
              {savedSellers.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-24 h-24 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="h-12 w-12 text-pink-300" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">No saved sellers yet</h3>
                  <p className="text-gray-500 mb-6">Start exploring and save your favorite sellers for quick access!</p>
                  <button 
                    onClick={() => setActiveTab('search')}
                    className="px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-lg hover:from-pink-600 hover:to-rose-600 transition"
                  >
                    Find Sellers
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sellers.filter(s => savedSellers.includes(s.seller_id)).map((seller) => (
                    <div key={seller.seller_id} className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl shadow-lg p-6 border border-pink-200">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-bold text-gray-800 mb-1">{seller.seller_id}</h3>
                          <span className="text-sm text-gray-500">{seller.platform}</span>
                        </div>
                        <button 
                          onClick={() => toggleSaveSeller(seller.seller_id)}
                          className="p-2 rounded-full bg-red-100 text-red-500 hover:bg-red-200 transition"
                        >
                          <Heart className="h-5 w-5 fill-current" />
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl ${getScoreColor(seller.trust_score)}`}>
                          {seller.trust_score}%
                        </div>
                        <div className="text-right">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                            <span className="font-semibold">{seller.avg_rating}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <button className="flex-1 bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition">
                          Contact
                        </button>
                        <button className="flex-1 bg-white border border-pink-200 text-pink-600 py-2 rounded-lg hover:bg-pink-50 transition">
                          View
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* My Orders Tab */}
        {activeTab === 'orders' && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">My Orders</h2>
                <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                  <Filter className="h-4 w-4" />
                  <span>Filter</span>
                </button>
              </div>

              {/* Order Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-blue-600 font-medium">Active Orders</p>
                      <p className="text-2xl font-bold text-blue-800">3</p>
                    </div>
                    <Package className="h-8 w-8 text-blue-400" />
                  </div>
                </div>
                <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-yellow-600 font-medium">Pending</p>
                      <p className="text-2xl font-bold text-yellow-800">2</p>
                    </div>
                    <Clock className="h-8 w-8 text-yellow-400" />
                  </div>
                </div>
                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-green-600 font-medium">Completed</p>
                      <p className="text-2xl font-bold text-green-800">28</p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-green-400" />
                  </div>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-purple-600 font-medium">Total Spent</p>
                      <p className="text-2xl font-bold text-purple-800">$1,847</p>
                    </div>
                    <DollarSign className="h-8 w-8 text-purple-400" />
                  </div>
                </div>
              </div>

              {/* Orders List */}
              <div className="space-y-4">
                {[
                  { id: '#ORD001', seller: 'S210', product: 'Wireless Headphones', amount: '$89.99', status: 'delivered', date: '2024-01-15' },
                  { id: '#ORD002', seller: 'S327', product: 'Smart Watch', amount: '$299.99', status: 'shipping', date: '2024-01-14' },
                  { id: '#ORD003', seller: 'S547', product: 'Laptop Stand', amount: '$45.99', status: 'processing', date: '2024-01-13' },
                ].map((order) => (
                  <div key={order.id} className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="font-semibold text-gray-800">{order.id}</h4>
                        <p className="text-sm text-gray-500">from {order.seller}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                        order.status === 'shipping' ? 'bg-blue-100 text-blue-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-800">{order.product}</p>
                        <p className="text-sm text-gray-500">{order.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg text-gray-800">{order.amount}</p>
                        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                          Track Order
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* My Reviews Tab */}
        {activeTab === 'reviews' && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">My Reviews</h2>
                <button className="flex items-center space-x-2 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition">
                  <Plus className="h-4 w-4" />
                  <span>Write Review</span>
                </button>
              </div>

              {/* Review Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-yellow-600 font-medium">Total Reviews</p>
                      <p className="text-2xl font-bold text-yellow-800">12</p>
                    </div>
                    <Star className="h-8 w-8 text-yellow-400 fill-yellow-400" />
                  </div>
                </div>
                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-green-600 font-medium">Avg Rating Given</p>
                      <p className="text-2xl font-bold text-green-800">4.5</p>
                    </div>
                    <ThumbsUp className="h-8 w-8 text-green-400" />
                  </div>
                </div>
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-blue-600 font-medium">Helpful Votes</p>
                      <p className="text-2xl font-bold text-blue-800">47</p>
                    </div>
                    <Users className="h-8 w-8 text-blue-400" />
                  </div>
                </div>
              </div>

              {/* Reviews List */}
              <div className="space-y-4">
                {[
                  { rating: 5, text: 'Excellent seller! Product quality was amazing and delivery was super fast. Highly recommend!', seller: 'S210', platform: 'Instagram', date: '2 days ago', helpful: 23 },
                  { rating: 4, text: 'Good experience overall. Product matches description and customer service was responsive.', seller: 'S327', platform: 'WhatsApp Business', date: '1 week ago', helpful: 15 },
                  { rating: 5, text: 'Outstanding service! Went above and beyond to ensure customer satisfaction.', seller: 'S547', platform: 'Facebook', date: '2 weeks ago', helpful: 31 },
                ].map((review, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="font-semibold text-gray-800">{review.seller}</span>
                          <span className="text-gray-400">•</span>
                          <span className="text-sm text-gray-500">{review.platform}</span>
                          <span className="text-gray-400">•</span>
                          <span className="text-sm text-gray-500">{review.date}</span>
                        </div>
                        <div className="flex items-center mb-3">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`h-5 w-5 ${i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} />
                          ))}
                        </div>
                        <p className="text-gray-700">{review.text}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className="flex items-center space-x-4">
                        <button className="flex items-center space-x-1 text-sm text-gray-600 hover:text-blue-600">
                          <ThumbsUp className="h-4 w-4" />
                          <span>Helpful ({review.helpful})</span>
                        </button>
                        <button className="flex items-center space-x-1 text-sm text-gray-600 hover:text-blue-600">
                          <Edit className="h-4 w-4" />
                          <span>Edit</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Shopping Analytics</h2>
              
              {/* Analytics Overview */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
                  <div className="flex items-center justify-between mb-2">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                    <span className="text-xs text-green-600 font-medium">+15%</span>
                  </div>
                  <p className="text-2xl font-bold text-green-800">31</p>
                  <p className="text-sm text-green-600">Total Orders</p>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
                  <div className="flex items-center justify-between mb-2">
                    <DollarSign className="h-6 w-6 text-blue-600" />
                    <span className="text-xs text-blue-600 font-medium">+8%</span>
                  </div>
                  <p className="text-2xl font-bold text-blue-800">$1,847</p>
                  <p className="text-sm text-blue-600">Total Spent</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
                  <div className="flex items-center justify-between mb-2">
                    <Star className="h-6 w-6 text-purple-600" />
                    <span className="text-xs text-purple-600 font-medium">4.5</span>
                  </div>
                  <p className="text-2xl font-bold text-purple-800">4.5</p>
                  <p className="text-sm text-purple-600">Avg Rating Given</p>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4 border border-orange-200">
                  <div className="flex items-center justify-between mb-2">
                    <Heart className="h-6 w-6 text-orange-600" />
                    <span className="text-xs text-orange-600 font-medium">12</span>
                  </div>
                  <p className="text-2xl font-bold text-orange-800">12</p>
                  <p className="text-sm text-orange-600">Saved Sellers</p>
                </div>
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-800 mb-4">Monthly Spending</h3>
                  <div className="h-48 flex items-end justify-around">
                    {[120, 180, 150, 220, 280, 320, 290, 350, 380, 340, 390, 420].map((value, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <div className="w-8 bg-gradient-to-t from-green-500 to-green-400 rounded-t" style={{ height: `${value / 4.2}%` }}></div>
                        <span className="text-xs text-gray-500 mt-2">{index + 1}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-800 mb-4">Category Distribution</h3>
                  <div className="space-y-3">
                    {[
                      { category: 'Electronics', percentage: 45, color: 'blue' },
                      { category: 'Fashion', percentage: 25, color: 'pink' },
                      { category: 'Home & Garden', percentage: 20, color: 'green' },
                      { category: 'Others', percentage: 10, color: 'orange' },
                    ].map((item) => (
                      <div key={item.category} className="flex items-center">
                        <span className="w-24 text-sm text-gray-600">{item.category}</span>
                        <div className="flex-1 mx-3 h-6 bg-gray-200 rounded-full overflow-hidden">
                          <div className={`h-full bg-${item.color}-500 rounded-full`} style={{ width: `${item.percentage}%` }}></div>
                        </div>
                        <span className="w-12 text-sm text-gray-600 text-right">{item.percentage}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Account Settings</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Profile Settings */}
                <div className="lg:col-span-2 space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Profile Information</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                          <input
                            type="text"
                            defaultValue="John"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                          <input
                            type="text"
                            defaultValue="Doe"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                        <input
                          type="email"
                          defaultValue="john.doe@example.com"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                        <input
                          type="tel"
                          defaultValue="+1 234 567 8900"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Shipping Address</label>
                        <textarea
                          rows={3}
                          defaultValue="123 Main St, City, State 12345"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Preferences</h3>
                    <div className="space-y-3">
                      {[
                        { label: 'Email notifications for order updates', enabled: true },
                        { label: 'SMS notifications for delivery alerts', enabled: false },
                        { label: 'Newsletter and promotional emails', enabled: true },
                        { label: 'Save payment methods for faster checkout', enabled: true },
                      ].map((setting, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-gray-700">{setting.label}</span>
                          <button
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              setting.enabled ? 'bg-green-600' : 'bg-gray-200'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                setting.enabled ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-lg p-6 border border-green-200">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-16 h-16 bg-green-200 rounded-full flex items-center justify-center">
                        <User className="h-8 w-8 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">John Doe</h4>
                        <p className="text-sm text-green-600">Premium Member</p>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Member Since</span>
                        <span className="font-medium">Jan 2023</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Orders</span>
                        <span className="font-medium">31</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Saved</span>
                        <span className="font-medium">$1,847</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="font-semibold text-gray-800 mb-4">Quick Actions</h4>
                    <div className="space-y-2">
                      <button className="w-full flex items-center space-x-2 px-4 py-2 bg-white border rounded-lg hover:bg-gray-50 transition">
                        <Download className="h-4 w-4" />
                        <span>Download Order History</span>
                      </button>
                      <button className="w-full flex items-center space-x-2 px-4 py-2 bg-white border rounded-lg hover:bg-gray-50 transition">
                        <Shield className="h-4 w-4" />
                        <span>Privacy Settings</span>
                      </button>
                      <button className="w-full flex items-center space-x-2 px-4 py-2 bg-red-50 text-red-600 border border-red-200 rounded-lg hover:bg-red-100 transition">
                        <LogOut className="h-4 w-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-6 border-t">
                <button className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                  Cancel
                </button>
                <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
