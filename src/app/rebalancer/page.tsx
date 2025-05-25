import React from 'react'
import Navbar from '@/components/Navbar'

const RebalancerPage = () => {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="bg-black py-12">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <h1 className="text-4xl font-bold mb-4 text-white">
            AI <span className="text-green-500">Rebalancer</span>
          </h1>
          <p className="text-lg text-gray-400 mb-8">
            Get AI-powered recommendations and execute cross-chain rebalancing for optimal risk and yield.
          </p>
          <div className="bg-gray-900 rounded-2xl p-8 shadow-xl mb-8 border border-gray-800">
            <div className="grid grid-cols-2 gap-8">
              <div className="text-center">
                <p className="text-3xl font-bold text-green-500">ETH 40%<br/>DOT 30%<br/>USDC 30%</p>
                <p className="text-sm text-gray-400 mt-2">Current Allocation</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-green-500">ETH 35%<br/>DOT 35%<br/>USDC 30%</p>
                <p className="text-sm text-gray-400 mt-2">Suggested Allocation</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-green-500">Low Risk</p>
                <p className="text-sm text-gray-400 mt-2">Risk Profile</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-green-500">Ready</p>
                <p className="text-sm text-gray-400 mt-2">Rebalance Action</p>
              </div>
            </div>
          </div>
          <button className="bg-green-500 text-white px-8 py-3 rounded-xl font-semibold hover:bg-green-600 transition">
            Rebalance Now
          </button>
        </div>
      </div>
    </div>
  )
}

export default RebalancerPage 