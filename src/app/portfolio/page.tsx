import React from 'react'
import Navbar from '@/components/Navbar'

const PortfolioPage = () => {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="bg-black py-12">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <h1 className="text-4xl font-bold mb-4 text-white">
            Portfolio <span className="text-green-500">Analytics</span>
          </h1>
          <p className="text-lg text-gray-400 mb-8">
            Track your DeFi assets, PnL, allocation, and performance across chains.
          </p>
          <button className="bg-green-500 text-white px-6 py-2 rounded-xl font-semibold mb-8 hover:bg-green-600 transition">
            Connect Wallet
          </button>
          <div className="bg-gray-900 rounded-2xl p-8 shadow-xl mb-8 border border-gray-800">
            <div className="grid grid-cols-2 gap-8">
              <div className="text-center">
                <p className="text-3xl font-bold text-green-500">$12,345</p>
                <p className="text-sm text-gray-400 mt-2">Total Value</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-green-500">+8.2%</p>
                <p className="text-sm text-gray-400 mt-2">PnL (30d)</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-green-500">ETH 40%<br/>DOT 30%<br/>USDC 30%</p>
                <p className="text-sm text-gray-400 mt-2">Allocation</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-green-500">View Chart</p>
                <p className="text-sm text-gray-400 mt-2">Historical Performance</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-900 rounded-2xl p-8 shadow-lg text-left border border-gray-800">
            <h2 className="text-2xl font-bold mb-4 text-white">Asset Breakdown</h2>
            <ul className="divide-y divide-gray-800">
              <li className="py-4 flex justify-between">
                <span className="font-semibold text-gray-300">Ethereum (ETH)</span>
                <span className="text-green-500">$5,000</span>
              </li>
              <li className="py-4 flex justify-between">
                <span className="font-semibold text-gray-300">Polkadot (DOT)</span>
                <span className="text-green-500">$4,000</span>
              </li>
              <li className="py-4 flex justify-between">
                <span className="font-semibold text-gray-300">USD Coin (USDC)</span>
                <span className="text-green-500">$3,345</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PortfolioPage 