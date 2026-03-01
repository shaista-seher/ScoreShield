'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  Shield, 
  Star, 
  TrendingUp, 
  TrendingDown,
  Users,
  ShoppingBag,
  BarChart3,
  Settings,
  LogOut,
  AlertTriangle,
  CheckCircle,
  Search,
  Bell,
  Package,
  CreditCard,
  MessageSquare,
  Home,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  Truck,
  Eye,
  Filter,
  Download,
  Upload,
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  MapPin,
  Edit,
  Save,
  X,
  Plus,
  ChevronRight,
  Zap,
  Sparkles,
  Target,
  Award,
  PieChart,
  Activity,
  FileText,
  TrendingUp as Trend,
  ShoppingCart,
  Box,
  Receipt,
  ThumbsUp
} from 'lucide-react'

interface SellerData {
  seller_id: string
  trust_score: number
  avg_rating: number
  total_reviews: number
  verified_rate: number
  risk_level: string
  factors: {
    total_reviews: number
    average_rating: number
    verified_purchase_rate: number
    complaint_rate: number
  }
}

export default function SellerDashboard() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [sellerData, setSellerData] = useState<SellerData | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    setMounted(true)
    checkAuth()
    fetchSellerData()
  }, [])

  const checkAuth = () => {
    const token = localStorage.getItem('access_token')
    const role = localStorage.getItem('user_role')
    
    if (!token || role !== 'seller') {
      router.push('/login')
      return
    }
  }

  const fetchSellerData = async () => {
    const sellerId = localStorage.getItem('seller_id') || 'S210'
    
    try {
      const response = await fetch(`http://localhost:8000/seller/${sellerId}/trust-score`)
      if (response.ok) {
        const data = await response.json()
        setSellerData(data)
      }
    } catch (error) {
      // Use mock data if API is not available
      setSellerData({
        seller_id: sellerId,
        trust_score: 85.5,
        avg_rating: 4.3,
        total_reviews: 45,
        verified_rate: 88,
        risk_level: 'Low Risk',
        factors: {
          total_reviews: 45,
          average_rating: 4.3,
          verified_purchase_rate: 88,
          complaint_rate: 5
        }
      })
    } finally {
      setLoading(false)
    }
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

  if (!mounted || loading) {
    return (
      <div className="min-h-screen gradient-primary flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white"></div>
      </div>
    )
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
                <h1 className="text-2xl font-bold">Seller Dashboard</h1>
                <p className="text-sm text-blue-100">Welcome back, {localStorage.getItem('user_name')}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-lg hover:bg-white/10 transition">
                <Bell className="h-5 w-5" />
              </button>
              <button 
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition"
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
              { id: 'overview', label: 'Overview', icon: Home, color: 'purple' },
              { id: 'orders', label: 'Orders', icon: ShoppingCart, color: 'blue' },
              { id: 'products', label: 'Products', icon: Package, color: 'green' },
              { id: 'analytics', label: 'Analytics', icon: BarChart3, color: 'orange' },
              { id: 'reviews', label: 'Reviews', icon: MessageSquare, color: 'pink' },
              { id: 'payments', label: 'Payments', icon: CreditCard, color: 'indigo' },
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
        {/* Overview Tab */}
        {activeTab === 'overview' && sellerData && (
          <div className="space-y-6 animate-fade-in">
            {/* Trust Score Card */}
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl shadow-xl p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Your Trust Score</h2>
                    <p className="text-purple-100">Based on customer reviews and performance</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur px-4 py-2 rounded-full">
                    <span className="text-sm font-medium">{sellerData.risk_level}</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-32 h-32 rounded-full bg-white/20 backdrop-blur flex items-center justify-center border-4 border-white/30">
                    <span className="text-5xl font-bold">{sellerData.trust_score}%</span>
                  </div>
                  <div className="ml-8 space-y-3">
                    <div className="flex items-center text-white">
                      <ArrowUpRight className="h-5 w-5 mr-2" />
                      <span>+5% from last month</span>
                    </div>
                    <div className="text-purple-100">
                      Based on {sellerData.factors.total_reviews} reviews
                    </div>
                    <div className="flex items-center space-x-2">
                      <Award className="h-5 w-5 text-yellow-300" />
                      <span>Top Performer</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white transform hover:scale-105 transition-all duration-200">
                <div className="flex items-center justify-between mb-4">
                  <Star className="h-8 w-8 text-blue-200" />
                  <span className="text-xs bg-white/20 px-2 py-1 rounded-full">Reviews</span>
                </div>
                <p className="text-3xl font-bold mb-2">{sellerData.factors.total_reviews}</p>
                <p className="text-blue-100 text-sm">Total Reviews</p>
                <div className="mt-4 flex items-center text-blue-200">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  <span className="text-xs">12% increase</span>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white transform hover:scale-105 transition-all duration-200">
                <div className="flex items-center justify-between mb-4">
                  <Target className="h-8 w-8 text-green-200" />
                  <span className="text-xs bg-white/20 px-2 py-1 rounded-full">Rating</span>
                </div>
                <p className="text-3xl font-bold mb-2">{sellerData.factors.average_rating}</p>
                <p className="text-green-100 text-sm">Average Rating</p>
                <div className="mt-4 flex items-center text-green-200">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  <span className="text-xs">0.3 increase</span>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white transform hover:scale-105 transition-all duration-200">
                <div className="flex items-center justify-between mb-4">
                  <CheckCircle className="h-8 w-8 text-purple-200" />
                  <span className="text-xs bg-white/20 px-2 py-1 rounded-full">Verified</span>
                </div>
                <p className="text-3xl font-bold mb-2">{sellerData.factors.verified_purchase_rate}%</p>
                <p className="text-purple-100 text-sm">Verified Rate</p>
                <div className="mt-4 flex items-center text-purple-200">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  <span className="text-xs">5% increase</span>
                </div>
              </div>

              <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg p-6 text-white transform hover:scale-105 transition-all duration-200">
                <div className="flex items-center justify-between mb-4">
                  <DollarSign className="h-8 w-8 text-orange-200" />
                  <span className="text-xs bg-white/20 px-2 py-1 rounded-full">Revenue</span>
                </div>
                <p className="text-3xl font-bold mb-2">$12.5k</p>
                <p className="text-orange-100 text-sm">Monthly Revenue</p>
                <div className="mt-4 flex items-center text-orange-200">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  <span className="text-xs">18% increase</span>
                </div>
              </div>
            </div>

            {/* Platform Distribution */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800">Performance by Platform</h3>
                <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
                  View All <ChevronRight className="inline h-4 w-4" />
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { name: 'Instagram', reviews: 45, color: 'pink', icon: '@' },
                  { name: 'WhatsApp', reviews: 38, color: 'green', icon: '💬' },
                  { name: 'Facebook', reviews: 52, color: 'blue', icon: '📘' },
                  { name: 'Meesho', reviews: 41, color: 'purple', icon: '🛍️' }
                ].map((platform) => (
                  <div key={platform.name} className={`p-6 bg-gradient-to-br from-${platform.color}-50 to-${platform.color}-100 rounded-xl border border-${platform.color}-200 transform hover:scale-105 transition-all duration-200`}>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl">{platform.icon}</span>
                      <TrendingUp className={`h-5 w-5 text-${platform.color}-600`} />
                    </div>
                    <p className="font-bold text-gray-800 mb-1">{platform.name}</p>
                    <p className={`text-2xl font-bold text-${platform.color}-600`}>{platform.reviews}</p>
                    <p className="text-xs text-gray-500">reviews</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Orders Management</h2>
                <div className="flex space-x-3">
                  <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                    <Filter className="h-4 w-4" />
                    <span>Filter</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                    <Download className="h-4 w-4" />
                    <span>Export</span>
                  </button>
                </div>
              </div>

              {/* Order Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-blue-600 font-medium">Pending</p>
                      <p className="text-2xl font-bold text-blue-800">12</p>
                    </div>
                    <Clock className="h-8 w-8 text-blue-400" />
                  </div>
                </div>
                <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-yellow-600 font-medium">Processing</p>
                      <p className="text-2xl font-bold text-yellow-800">8</p>
                    </div>
                    <Package className="h-8 w-8 text-yellow-400" />
                  </div>
                </div>
                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-green-600 font-medium">Completed</p>
                      <p className="text-2xl font-bold text-green-800">156</p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-green-400" />
                  </div>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-purple-600 font-medium">Total Revenue</p>
                      <p className="text-2xl font-bold text-purple-800">$45.2k</p>
                    </div>
                    <DollarSign className="h-8 w-8 text-purple-400" />
                  </div>
                </div>
              </div>

              {/* Orders Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-gray-50">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Order ID</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Customer</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Product</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Amount</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Date</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { id: '#ORD001', customer: 'John Doe', product: 'Wireless Headphones', amount: '$89.99', status: 'pending', date: '2024-01-15' },
                      { id: '#ORD002', customer: 'Jane Smith', product: 'Smart Watch', amount: '$299.99', status: 'processing', date: '2024-01-14' },
                      { id: '#ORD003', customer: 'Bob Johnson', product: 'Laptop Stand', amount: '$45.99', status: 'completed', date: '2024-01-13' },
                      { id: '#ORD004', customer: 'Alice Brown', product: 'USB-C Hub', amount: '$79.99', status: 'completed', date: '2024-01-12' },
                    ].map((order) => (
                      <tr key={order.id} className="border-b hover:bg-gray-50 transition">
                        <td className="py-3 px-4">
                          <span className="font-medium text-gray-800">{order.id}</span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                              <User className="h-4 w-4 text-gray-600" />
                            </div>
                            <span className="text-gray-700">{order.customer}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-gray-700">{order.product}</td>
                        <td className="py-3 px-4 font-semibold text-gray-800">{order.amount}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            order.status === 'completed' ? 'bg-green-100 text-green-700' :
                            order.status === 'processing' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-blue-100 text-blue-700'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-gray-600">{order.date}</td>
                        <td className="py-3 px-4">
                          <button className="text-blue-600 hover:text-blue-700 font-medium">
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Products Management</h2>
                <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                  <Plus className="h-4 w-4" />
                  <span>Add Product</span>
                </button>
              </div>

              {/* Product Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-4 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100">Total Products</p>
                      <p className="text-3xl font-bold">48</p>
                    </div>
                    <Box className="h-10 w-10 text-purple-200" />
                  </div>
                </div>
                <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-4 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100">In Stock</p>
                      <p className="text-3xl font-bold">42</p>
                    </div>
                    <Package className="h-10 w-10 text-green-200" />
                  </div>
                </div>
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-4 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-100">Out of Stock</p>
                      <p className="text-3xl font-bold">6</p>
                    </div>
                    <X className="h-10 w-10 text-orange-200" />
                  </div>
                </div>
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { name: 'Wireless Headphones', price: '$89.99', stock: 15, status: 'in-stock', image: '🎧' },
                  { name: 'Smart Watch', price: '$299.99', stock: 8, status: 'in-stock', image: '⌚' },
                  { name: 'Laptop Stand', price: '$45.99', stock: 0, status: 'out-of-stock', image: '💻' },
                  { name: 'USB-C Hub', price: '$79.99', stock: 23, status: 'in-stock', image: '🔌' },
                  { name: 'Phone Case', price: '$19.99', stock: 45, status: 'in-stock', image: '📱' },
                  { name: 'Bluetooth Speaker', price: '$129.99', stock: 0, status: 'out-of-stock', image: '🔊' },
                ].map((product) => (
                  <div key={product.name} className="bg-white border rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden">
                    <div className="h-32 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                      <span className="text-4xl">{product.image}</span>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-800 mb-2">{product.name}</h3>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xl font-bold text-gray-900">{product.price}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          product.status === 'in-stock' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        <button className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                          <Edit className="h-4 w-4" />
                          <span>Edit</span>
                        </button>
                        <button className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition">
                          <Eye className="h-4 w-4" />
                          <span>View</span>
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
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Performance Analytics</h2>
              
              {/* Analytics Overview */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
                  <div className="flex items-center justify-between mb-2">
                    <TrendingUp className="h-6 w-6 text-blue-600" />
                    <span className="text-xs text-blue-600 font-medium">+23%</span>
                  </div>
                  <p className="text-2xl font-bold text-blue-800">1,245</p>
                  <p className="text-sm text-blue-600">Total Sales</p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
                  <div className="flex items-center justify-between mb-2">
                    <Users className="h-6 w-6 text-green-600" />
                    <span className="text-xs text-green-600 font-medium">+18%</span>
                  </div>
                  <p className="text-2xl font-bold text-green-800">892</p>
                  <p className="text-sm text-green-600">New Customers</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
                  <div className="flex items-center justify-between mb-2">
                    <Activity className="h-6 w-6 text-purple-600" />
                    <span className="text-xs text-purple-600 font-medium">+12%</span>
                  </div>
                  <p className="text-2xl font-bold text-purple-800">4.8</p>
                  <p className="text-sm text-purple-600">Avg Rating</p>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4 border border-orange-200">
                  <div className="flex items-center justify-between mb-2">
                    <Target className="h-6 w-6 text-orange-600" />
                    <span className="text-xs text-orange-600 font-medium">+8%</span>
                  </div>
                  <p className="text-2xl font-bold text-orange-800">92%</p>
                  <p className="text-sm text-orange-600">Success Rate</p>
                </div>
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-800 mb-4">Revenue Trend</h3>
                  <div className="h-48 flex items-end justify-around">
                    {[30, 45, 35, 50, 65, 75, 85, 90, 78, 88, 92, 95].map((value, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <div className="w-8 bg-gradient-to-t from-blue-500 to-blue-400 rounded-t" style={{ height: `${value}%` }}></div>
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
                      { category: 'Accessories', percentage: 25, color: 'green' },
                      { category: 'Clothing', percentage: 20, color: 'purple' },
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

        {/* Reviews Tab */}
        {activeTab === 'reviews' && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Customer Reviews</h2>
                <div className="flex space-x-3">
                  <select className="px-4 py-2 border rounded-lg">
                    <option>All Platforms</option>
                    <option>Instagram</option>
                    <option>WhatsApp</option>
                    <option>Facebook</option>
                  </select>
                  <select className="px-4 py-2 border rounded-lg">
                    <option>All Ratings</option>
                    <option>5 Stars</option>
                    <option>4 Stars</option>
                    <option>3 Stars</option>
                    <option>2 Stars</option>
                    <option>1 Star</option>
                  </select>
                </div>
              </div>

              {/* Review Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-yellow-600 font-medium">Average Rating</p>
                      <p className="text-2xl font-bold text-yellow-800">4.8</p>
                    </div>
                    <Star className="h-8 w-8 text-yellow-400 fill-yellow-400" />
                  </div>
                </div>
                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-green-600 font-medium">Positive Reviews</p>
                      <p className="text-2xl font-bold text-green-800">156</p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-green-400" />
                  </div>
                </div>
                <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-red-600 font-medium">Negative Reviews</p>
                      <p className="text-2xl font-bold text-red-800">8</p>
                    </div>
                    <AlertTriangle className="h-8 w-8 text-red-400" />
                  </div>
                </div>
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-blue-600 font-medium">Response Rate</p>
                      <p className="text-2xl font-bold text-blue-800">94%</p>
                    </div>
                    <MessageSquare className="h-8 w-8 text-blue-400" />
                  </div>
                </div>
              </div>

              {/* Reviews List */}
              <div className="space-y-4">
                {[
                  { rating: 5, text: 'Excellent product! Highly recommended. Fast delivery and great quality.', customer: 'John Doe', platform: 'Instagram', date: '2 days ago', helpful: 23 },
                  { rating: 4, text: 'Good quality, fast delivery. Would buy again.', customer: 'Jane Smith', platform: 'WhatsApp', date: '5 days ago', helpful: 15 },
                  { rating: 5, text: 'Amazing seller, will buy again! Very responsive and helpful.', customer: 'Bob Johnson', platform: 'Facebook', date: '1 week ago', helpful: 31 },
                  { rating: 3, text: 'Product was okay, could be better. Delivery took longer than expected.', customer: 'Alice Brown', platform: 'Meesho', date: '2 weeks ago', helpful: 8 },
                  { rating: 5, text: 'Outstanding quality and customer service! Highly recommend this seller.', customer: 'Charlie Wilson', platform: 'Instagram', date: '3 weeks ago', helpful: 42 },
                ].map((review, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start space-x-4">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-gray-600" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className="font-semibold text-gray-800">{review.customer}</h4>
                            <span className="text-sm text-gray-500">{review.platform}</span>
                            <span className="text-sm text-gray-400">{review.date}</span>
                          </div>
                          <div className="flex items-center space-x-1 mb-2">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} />
                            ))}
                          </div>
                          <p className="text-gray-700">{review.text}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <button className="flex items-center space-x-1 text-sm text-gray-600 hover:text-blue-600">
                          <ThumbsUp className="h-4 w-4" />
                          <span>Helpful ({review.helpful})</span>
                        </button>
                        <button className="flex items-center space-x-1 text-sm text-gray-600 hover:text-blue-600">
                          <MessageSquare className="h-4 w-4" />
                          <span>Reply</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Payments Tab */}
        {activeTab === 'payments' && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Payment History</h2>
                <div className="flex space-x-3">
                  <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                    <Download className="h-4 w-4" />
                    <span>Download Statement</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                    <CreditCard className="h-4 w-4" />
                    <span>Request Payout</span>
                  </button>
                </div>
              </div>

              {/* Payment Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-green-600 font-medium">Total Earnings</p>
                      <p className="text-2xl font-bold text-green-800">$45,280</p>
                    </div>
                    <DollarSign className="h-8 w-8 text-green-400" />
                  </div>
                </div>
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-blue-600 font-medium">Pending</p>
                      <p className="text-2xl font-bold text-blue-800">$3,450</p>
                    </div>
                    <Clock className="h-8 w-8 text-blue-400" />
                  </div>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-purple-600 font-medium">This Month</p>
                      <p className="text-2xl font-bold text-purple-800">$12,650</p>
                    </div>
                    <Calendar className="h-8 w-8 text-purple-400" />
                  </div>
                </div>
                <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-orange-600 font-medium">Last Payout</p>
                      <p className="text-2xl font-bold text-orange-800">$8,920</p>
                    </div>
                    <Receipt className="h-8 w-8 text-orange-400" />
                  </div>
                </div>
              </div>

              {/* Payment History Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-gray-50">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Transaction ID</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Date</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Type</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Amount</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Method</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { id: '#TXN001', date: '2024-01-15', type: 'Sale', amount: '$89.99', status: 'completed', method: 'Credit Card' },
                      { id: '#TXN002', date: '2024-01-14', type: 'Sale', amount: '$299.99', status: 'completed', method: 'PayPal' },
                      { id: '#TXN003', date: '2024-01-13', type: 'Payout', amount: '$8,920.00', status: 'completed', method: 'Bank Transfer' },
                      { id: '#TXN004', date: '2024-01-12', type: 'Sale', amount: '$45.99', status: 'pending', method: 'UPI' },
                      { id: '#TXN005', date: '2024-01-11', type: 'Sale', amount: '$79.99', status: 'completed', method: 'Credit Card' },
                    ].map((transaction) => (
                      <tr key={transaction.id} className="border-b hover:bg-gray-50 transition">
                        <td className="py-3 px-4">
                          <span className="font-medium text-gray-800">{transaction.id}</span>
                        </td>
                        <td className="py-3 px-4 text-gray-700">{transaction.date}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            transaction.type === 'Sale' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                          }`}>
                            {transaction.type}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-semibold text-gray-800">{transaction.amount}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            transaction.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {transaction.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-gray-700">{transaction.method}</td>
                        <td className="py-3 px-4">
                          <button className="text-blue-600 hover:text-blue-700 font-medium">
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                          <input
                            type="text"
                            defaultValue="Doe"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                        <input
                          type="email"
                          defaultValue="john.doe@example.com"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                        <input
                          type="tel"
                          defaultValue="+1 234 567 8900"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Business Address</label>
                        <textarea
                          rows={3}
                          defaultValue="123 Business St, City, State 12345"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Business Information</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Business Name</label>
                        <input
                          type="text"
                          defaultValue="John's Electronics Store"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Seller ID</label>
                        <input
                          type="text"
                          defaultValue="S210"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                          readOnly
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Business Description</label>
                        <textarea
                          rows={4}
                          defaultValue="We specialize in high-quality electronics and accessories with excellent customer service."
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Notification Preferences</h3>
                    <div className="space-y-3">
                      {[
                        { label: 'Email notifications for new orders', enabled: true },
                        { label: 'SMS notifications for order updates', enabled: false },
                        { label: 'Email notifications for new reviews', enabled: true },
                        { label: 'Monthly performance reports', enabled: true },
                      ].map((setting, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-gray-700">{setting.label}</span>
                          <button
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              setting.enabled ? 'bg-purple-600' : 'bg-gray-200'
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
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 border border-purple-200">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-16 h-16 bg-purple-200 rounded-full flex items-center justify-center">
                        <User className="h-8 w-8 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">John Doe</h4>
                        <p className="text-sm text-purple-600">Premium Seller</p>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Member Since</span>
                        <span className="font-medium">Jan 2023</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Sales</span>
                        <span className="font-medium">$45,280</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Rating</span>
                        <span className="font-medium">4.8 ⭐</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="font-semibold text-gray-800 mb-4">Quick Actions</h4>
                    <div className="space-y-2">
                      <button className="w-full flex items-center space-x-2 px-4 py-2 bg-white border rounded-lg hover:bg-gray-50 transition">
                        <Download className="h-4 w-4" />
                        <span>Download Data</span>
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
                <button className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
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
