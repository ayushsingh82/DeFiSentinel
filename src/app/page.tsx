import React from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import { ArrowRight, Shield, Brain, LineChart, Bell, Zap } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-black to-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-6xl font-bold mb-6 text-white">
              Your AI Co-Pilot for <span className="text-green-500">better Trade</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
              Transform from a passive holder to a data-driven strategist with DeFiSentinel's intelligent portfolio management and market insights.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/dashboard" className="px-8 py-4 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-600 transition flex items-center gap-2">
                Launch Dashboard <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/market" className="px-8 py-4 bg-gray-800 text-white rounded-xl font-semibold hover:bg-gray-700 transition">
                Explore Features
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Key Features Section */}
      <div className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white text-center mb-16">Powerful Features for Smart Investing</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Real-time Analytics */}
            <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800 hover:border-green-500 transition-all duration-300">
              <div className="bg-gray-800 rounded-xl p-4 w-16 h-16 flex items-center justify-center mb-6">
                <LineChart className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Real-time Analytics</h3>
              <p className="text-gray-400 mb-6">
                Track your portfolio across chains with OKX Balance and Price APIs, providing instant insights into your holdings.
              </p>
              <Link href="/portfolio" className="text-green-500 hover:text-green-400 flex items-center gap-2">
                Learn More <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Market Intelligence */}
            <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800 hover:border-green-500 transition-all duration-300">
              <div className="bg-gray-800 rounded-xl p-4 w-16 h-16 flex items-center justify-center mb-6">
                <Brain className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Market Intelligence</h3>
              <p className="text-gray-400 mb-6">
                Detect volatility patterns, whale trades, and volume anomalies with advanced candlestick analysis.
              </p>
              <Link href="/market" className="text-green-500 hover:text-green-400 flex items-center gap-2">
                Learn More <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* AI Sentiment Analysis */}
            <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800 hover:border-green-500 transition-all duration-300">
              <div className="bg-gray-800 rounded-xl p-4 w-16 h-16 flex items-center justify-center mb-6">
                <Zap className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">AI Sentiment Analysis</h3>
              <p className="text-gray-400 mb-6">
                Get real-time sentiment scores from Twitter and Reddit to understand market psychology.
              </p>
              <Link href="/sentiment" className="text-green-500 hover:text-green-400 flex items-center gap-2">
                Learn More <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Smart Rebalancing */}
            <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800 hover:border-green-500 transition-all duration-300">
              <div className="bg-gray-800 rounded-xl p-4 w-16 h-16 flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Smart Rebalancing</h3>
              <p className="text-gray-400 mb-6">
                AI-powered portfolio rebalancing with OKX Swap and Cross-Chain APIs for optimal risk management.
              </p>
              <Link href="/rebalancer" className="text-green-500 hover:text-green-400 flex items-center gap-2">
                Learn More <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Real-time Alerts */}
            <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800 hover:border-green-500 transition-all duration-300">
              <div className="bg-gray-800 rounded-xl p-4 w-16 h-16 flex items-center justify-center mb-6">
                <Bell className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Real-time Alerts</h3>
              <p className="text-gray-400 mb-6">
                Stay informed with instant notifications via Telegram, email, or dashboard alerts.
              </p>
              <Link href="/alerts" className="text-green-500 hover:text-green-400 flex items-center gap-2">
                Learn More <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-900 rounded-3xl p-12 border border-gray-800">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-white mb-6">Ready to Transform Your DeFi Experience?</h2>
              <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                Join the future of intelligent crypto investing with DeFiSentinel's comprehensive suite of tools and insights.
              </p>
              <Link href="/dashboard" className="inline-flex items-center px-8 py-4 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-600 transition">
                Get Started <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
