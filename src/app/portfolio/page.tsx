import React from 'react'
import Navbar from '@/components/Navbar'

const PortfolioPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="bg-pink-50 py-12">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">
            Portfolio <span className="text-pink-500">Analytics</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Track your DeFi assets, PnL, allocation, and performance across chains.
          </p>
          <button className="bg-black text-white px-6 py-2 rounded-xl font-semibold mb-8">
            Connect Wallet
          </button>
          <div className="bg-gray-800/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl mb-8">
            <div className="grid grid-cols-2 gap-8">
              <div className="text-center">
                <p className="text-3xl font-bold text-pink-600">$12,345</p>
                <p className="text-sm text-gray-300 mt-2">Total Value</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-pink-600">+8.2%</p>
                <p className="text-sm text-gray-300 mt-2">PnL (30d)</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-pink-600">ETH 40%<br/>DOT 30%<br/>USDC 30%</p>
                <p className="text-sm text-gray-300 mt-2">Allocation</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-pink-600">View Chart</p>
                <p className="text-sm text-gray-300 mt-2">Historical Performance</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-lg text-left">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Asset Breakdown</h2>
            <ul className="divide-y divide-gray-200">
              <li className="py-4 flex justify-between">
                <span className="font-semibold text-gray-700">Ethereum (ETH)</span>
                <span className="text-pink-600">$5,000</span>
              </li>
              <li className="py-4 flex justify-between">
                <span className="font-semibold text-gray-700">Polkadot (DOT)</span>
                <span className="text-pink-600">$4,000</span>
              </li>
              <li className="py-4 flex justify-between">
                <span className="font-semibold text-gray-700">USD Coin (USDC)</span>
                <span className="text-pink-600">$3,345</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PortfolioPage 