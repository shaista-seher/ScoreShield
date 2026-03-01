'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Shield, Store, User, ArrowRight, CheckCircle } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Check if user is already logged in
    const token = localStorage.getItem('access_token')
    const role = localStorage.getItem('user_role')
    if (token && role) {
      if (role === 'seller') {
        router.push('/seller/dashboard')
      } else {
        router.push('/customer/dashboard')
      }
    }
  }, [router])

  if (!mounted) {
    return (
      <div className="min-h-screen gradient-primary flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen gradient-primary flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Logo & Title */}
        <div className="text-center mb-12">
          <Shield className="h-20 w-20 mx-auto mb-4 text-white" />
          <h1 className="text-4xl font-bold text-white mb-2">ScoreShield</h1>
          <p className="text-xl text-blue-100">Digital Reputation Scoring System</p>
        </div>

        {/* Role Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Seller Card */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden hover:transform hover:scale-105 transition duration-300">
            <div className="gradient-primary p-8 text-center">
              <Store className="h-16 w-16 mx-auto mb-4 text-white" />
              <h2 className="text-2xl font-bold text-white">Seller Login</h2>
              <p className="text-blue-100 mt-2">For business owners</p>
            </div>
            <div className="p-8">
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-gray-600">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  View your trust score
                </li>
                <li className="flex items-center text-gray-600">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  Monitor customer reviews
                </li>
                <li className="flex items-center text-gray-600">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  Track performance analytics
                </li>
                <li className="flex items-center text-gray-600">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  Manage your profile
                </li>
              </ul>
              <div className="flex flex-col space-y-3">
                <Link
                  href="/seller/login"
                  className="w-full gradient-primary text-white font-semibold py-3 rounded-lg hover:opacity-90 transition flex items-center justify-center"
                >
                  Seller Login
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  href="/seller/register"
                  className="w-full border-2 border-purple-600 text-purple-600 font-semibold py-3 rounded-lg hover:bg-purple-50 transition text-center"
                >
                  Register as Seller
                </Link>
              </div>
            </div>
          </div>

          {/* Customer Card */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden hover:transform hover:scale-105 transition duration-300">
            <div className="gradient-success p-8 text-center">
              <User className="h-16 w-16 mx-auto mb-4 text-white" />
              <h2 className="text-2xl font-bold text-white">Customer Login</h2>
              <p className="text-green-100 mt-2">For buyers</p>
            </div>
            <div className="p-8">
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-gray-600">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  Search verified sellers
                </li>
                <li className="flex items-center text-gray-600">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  View seller trust scores
                </li>
                <li className="flex items-center text-gray-600">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  Write reviews
                </li>
                <li className="flex items-center text-gray-600">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  Save favorite sellers
                </li>
              </ul>
              <div className="flex flex-col space-y-3">
                <Link
                  href="/customer/login"
                  className="w-full gradient-success text-white font-semibold py-3 rounded-lg hover:opacity-90 transition flex items-center justify-center"
                >
                  Customer Login
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  href="/customer/register"
                  className="w-full border-2 border-green-600 text-green-600 font-semibold py-3 rounded-lg hover:bg-green-50 transition text-center"
                >
                  Register as Customer
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-8">
          <Link href="/" className="text-white hover:text-blue-200 text-sm">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
