import React from 'react'
import Link from 'next/link'

const Navbar = () => (
  <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
    <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
      <Link href="/" className="text-2xl font-bold text-pink-600">DeFiSentinel</Link>
      <div className="flex gap-6">
        <Link href="/portfolio" className="text-gray-700 hover:text-pink-600 font-medium transition">Portfolio</Link>
        <Link href="/market" className="text-gray-700 hover:text-pink-600 font-medium transition">Market Radar</Link>
        <Link href="/rebalancer" className="text-gray-700 hover:text-pink-600 font-medium transition">AI Rebalancer</Link>
      </div>
    </div>
  </nav>
)

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      {/* Header Section */}
      <div className="bg-pink-50 py-16">
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4 text-gray-900">
              Welcome to <span className="text-pink-500">DeFiSentinel</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              AI-powered portfolio manager with market radar intelligence. Track, analyze, and optimize your DeFi investments across multiple chains.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-8">
          <div className="bg-gray-800/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
            <h2 className="text-2xl font-semibold mb-6 text-white text-center">Portfolio Overview</h2>
            <div className="grid grid-cols-4 gap-8">
              <div className="text-center">
                <p className="text-4xl font-bold text-pink-600">$0.00</p>
                <p className="text-sm text-gray-300 mt-2">Total Value</p>
              </div>
              <div className="text-center border-x border-gray-600">
                <p className="text-4xl font-bold text-pink-600">0%</p>
                <p className="text-sm text-gray-300 mt-2">24h Change</p>
              </div>
              <div className="text-center border-r border-gray-600">
                <p className="text-4xl font-bold text-pink-600">0</p>
                <p className="text-sm text-gray-300 mt-2">Active Chains</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-pink-600">0</p>
                <p className="text-sm text-gray-300 mt-2">Alerts</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-pink-50">
        <div className="max-w-6xl mx-auto px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Portfolio Analytics Card */}
            <div className="bg-white rounded-2xl p-8 shadow-lg transition-all duration-300 hover:shadow-2xl">
              <div className="mb-6">
                <span className="inline-block p-3 rounded-full bg-pink-200 text-pink-600 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3v18h18" />
                  </svg>
                </span>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Portfolio Analytics</h3>
                <p className="text-gray-600">
                  Track assets, PnL, allocation, and historical performance across all your DeFi wallets and chains.
                </p>
              </div>
              <Link href="/portfolio" className="w-full block bg-black text-white py-3 rounded-xl font-semibold text-center">
                View Portfolio
              </Link>
            </div>

            {/* Market Radar Card */}
            <div className="bg-white rounded-2xl p-8 shadow-lg transition-all duration-300 hover:shadow-2xl">
              <div className="mb-6">
                <span className="inline-block p-3 rounded-full bg-pink-200 text-pink-600 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z" />
                  </svg>
                </span>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Market Radar</h3>
                <p className="text-gray-600">
                  Detect volume spikes, whale trades, volatility, and get real-time sentiment from Twitter/X and Reddit.
                </p>
              </div>
              <Link href="/market" className="w-full block bg-black text-white py-3 rounded-xl font-semibold text-center">
                Explore Market
              </Link>
            </div>

            {/* AI Rebalancer Card */}
            <div className="bg-white rounded-2xl p-8 shadow-lg transition-all duration-300 hover:shadow-2xl">
              <div className="mb-6">
                <span className="inline-block p-3 rounded-full bg-pink-200 text-pink-600 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582M20 20v-5h-.581M5 9a7 7 0 0114 0c0 3.866-3.134 7-7 7a7 7 0 01-7-7z" />
                  </svg>
                </span>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">AI Rebalancer</h3>
                <p className="text-gray-600">
                  Get AI-powered recommendations and execute cross-chain rebalancing for optimal risk and yield.
                </p>
              </div>
              <Link href="/rebalancer" className="w-full block bg-black text-white py-3 rounded-xl font-semibold text-center">
                Try Rebalancer
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage