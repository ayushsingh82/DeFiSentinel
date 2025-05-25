import React from 'react'
import Navbar from '@/components/Navbar'

const MarketPage = () => {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="bg-black py-12">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <h1 className="text-4xl font-bold mb-4 text-white">
            Market <span className="text-green-500">Radar</span>
          </h1>
          <p className="text-lg text-gray-400 mb-8">
            Monitor market volatility, whale trades, and sentiment in real time.
          </p>
          <input
            type="text"
            placeholder="Search token..."
            className="w-full max-w-md mx-auto mb-8 px-4 py-2 rounded-xl border border-gray-700 bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <div className="bg-gray-900 rounded-2xl p-8 shadow-xl mb-8 border border-gray-800">
            <div className="grid grid-cols-2 gap-8">
              <div className="text-center">
                <p className="text-3xl font-bold text-green-500">+120%</p>
                <p className="text-sm text-gray-400 mt-2">Volume Spike</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-green-500">3</p>
                <p className="text-sm text-gray-400 mt-2">Whale Trades</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-green-500">High</p>
                <p className="text-sm text-gray-400 mt-2">Volatility</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-green-500">76/100</p>
                <p className="text-sm text-gray-400 mt-2">Sentiment Score</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-900 rounded-2xl p-8 shadow-lg text-left border border-gray-800">
            <h2 className="text-2xl font-bold mb-4 text-white">Token Health & Sentiment</h2>
            <ul className="divide-y divide-gray-800">
              <li className="py-4 flex justify-between">
                <span className="font-semibold text-gray-300">Ethereum (ETH)</span>
                <span className="text-green-500">82/100</span>
              </li>
              <li className="py-4 flex justify-between">
                <span className="font-semibold text-gray-300">Polkadot (DOT)</span>
                <span className="text-green-500">76/100</span>
              </li>
              <li className="py-4 flex justify-between">
                <span className="font-semibold text-gray-300">USD Coin (USDC)</span>
                <span className="text-green-500">90/100</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MarketPage 