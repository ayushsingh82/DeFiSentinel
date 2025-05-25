import React from 'react'

const RebalancerPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-pink-50 py-12">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">
            AI <span className="text-pink-500">Rebalancer</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Get AI-powered recommendations and execute cross-chain rebalancing for optimal risk and yield.
          </p>
          <div className="bg-gray-800/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl mb-8">
            <div className="grid grid-cols-2 gap-8">
              <div className="text-center">
                <p className="text-3xl font-bold text-pink-600">ETH 40%<br/>DOT 30%<br/>USDC 30%</p>
                <p className="text-sm text-gray-300 mt-2">Current Allocation</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-pink-600">ETH 35%<br/>DOT 35%<br/>USDC 30%</p>
                <p className="text-sm text-gray-300 mt-2">Suggested Allocation</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-pink-600">Low Risk</p>
                <p className="text-sm text-gray-300 mt-2">Risk Profile</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-pink-600">Ready</p>
                <p className="text-sm text-gray-300 mt-2">Rebalance Action</p>
              </div>
            </div>
          </div>
          <button className="bg-pink-600 text-white px-8 py-3 rounded-xl font-semibold ">
            Rebalance Now
          </button>
        </div>
      </div>
    </div>
  )
}

export default RebalancerPage 