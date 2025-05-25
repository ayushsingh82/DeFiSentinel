import React from 'react'
import Navbar from '@/components/Navbar'

const MarketPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="bg-pink-50 py-12">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">
            Market <span className="text-pink-500">Radar</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Monitor market volatility, whale trades, and sentiment in real time.
          </p>
          <input
            type="text"
            placeholder="Search token..."
            className="w-full max-w-md mx-auto mb-8 px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-200"
          />
          <div className="bg-gray-800/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl mb-8">
            <div className="grid grid-cols-2 gap-8">
              <div className="text-center">
                <p className="text-3xl font-bold text-pink-600">+120%</p>
                <p className="text-sm text-gray-300 mt-2">Volume Spike</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-pink-600">3</p>
                <p className="text-sm text-gray-300 mt-2">Whale Trades</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-pink-600">High</p>
                <p className="text-sm text-gray-300 mt-2">Volatility</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-pink-600">76/100</p>
                <p className="text-sm text-gray-300 mt-2">Sentiment Score</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-lg text-left">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Token Health & Sentiment</h2>
            <ul className="divide-y divide-gray-200">
              <li className="py-4 flex justify-between">
                <span className="font-semibold text-gray-700">Ethereum (ETH)</span>
                <span className="text-pink-600">82/100</span>
              </li>
              <li className="py-4 flex justify-between">
                <span className="font-semibold text-gray-700">Polkadot (DOT)</span>
                <span className="text-pink-600">76/100</span>
              </li>
              <li className="py-4 flex justify-between">
                <span className="font-semibold text-gray-700">USD Coin (USDC)</span>
                <span className="text-pink-600">90/100</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MarketPage 