'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { Search, ArrowRight, Brain, TrendingUp, TrendingDown, Users } from 'lucide-react';

interface Transaction {
  chainIndex: string;
  txHash: string;
  txTime: string;
  from: { address: string; amount: string }[];
  to: { address: string; amount: string }[];
  tokenContractAddress: string;
  amount: string;
  symbol: string;
  txStatus: string;
}

interface AIAnalysis {
  topTraders: {
    address: string;
    action: 'long' | 'short';
    token: string;
    confidence: number;
  }[];
  marketTrends: {
    token: string;
    trend: 'bullish' | 'bearish';
    reason: string;
  }[];
}

const PortfolioPage = () => {
  const [address, setAddress] = useState('');
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState<AIAnalysis | null>(null);
  const [showAiAnalysis, setShowAiAnalysis] = useState(false);

  const fetchTransactions = async () => {
    if (!address) return;
    
    setLoading(true);
    setError(null);
    try {
      const timestamp = new Date().toISOString();
      const response = await fetch(
        `https://web3.okx.com/api/v5/dex/post-transaction/transactions-by-address?addresses=${address}&chains=1`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'OK-ACCESS-KEY': process.env.NEXT_PUBLIC_OKX_ACCESS_KEY || '',
            'OK-ACCESS-SIGN': process.env.NEXT_PUBLIC_OKX_ACCESS_SIGN || '',
            'OK-ACCESS-PASSPHRASE': process.env.NEXT_PUBLIC_OKX_PASSPHRASE || '',
            'OK-ACCESS-TIMESTAMP': timestamp,
          }
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch transactions');
      }

      const data = await response.json();
      if (data.data && data.data[0]?.transactionList) {
        setTransactions(data.data[0].transactionList);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const getAiAnalysis = async () => {
    setShowAiAnalysis(true);
    // Simulated AI analysis - In production, this would call your AI service
    setAiAnalysis({
      topTraders: [
        { address: '0x123...', action: 'long', token: 'ETH', confidence: 0.95 },
        { address: '0x456...', action: 'short', token: 'DOT', confidence: 0.88 },
        { address: '0x789...', action: 'long', token: 'USDC', confidence: 0.92 },
      ],
      marketTrends: [
        { token: 'ETH', trend: 'bullish', reason: 'Strong institutional buying pressure' },
        { token: 'DOT', trend: 'bearish', reason: 'Technical resistance at current levels' },
        { token: 'USDC', trend: 'bullish', reason: 'Stable demand in DeFi protocols' },
      ]
    });
  };

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white mb-8">Portfolio Analysis</h1>

        {/* Address Input Section */}
        <div className="bg-gray-900 rounded-2xl p-8 mb-8 border border-gray-800">
          <div className="flex gap-4 items-center">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Enter wallet address..."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <button
              onClick={fetchTransactions}
              className="px-6 py-3 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-600 transition flex items-center gap-2"
            >
              <Search className="w-5 h-5" />
              Analyze
            </button>
            <button
              onClick={getAiAnalysis}
              className="px-6 py-3 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition flex items-center gap-2"
            >
              <Brain className="w-5 h-5" />
              AI Insights
            </button>
          </div>
        </div>

        {/* AI Analysis Section */}
        {showAiAnalysis && aiAnalysis && (
          <div className="bg-gray-900 rounded-2xl p-8 mb-8 border border-gray-800">
            <h2 className="text-2xl font-bold text-white mb-6">AI Market Analysis</h2>
            
            {/* Top Traders */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Users className="w-5 h-5" />
                Top Traders Activity
              </h3>
              <div className="grid gap-4">
                {aiAnalysis.topTraders.map((trader, index) => (
                  <div key={index} className="bg-gray-800 rounded-xl p-4 flex justify-between items-center">
                    <div>
                      <p className="text-gray-300">{trader.address}</p>
                      <p className="text-sm text-gray-400">{trader.token}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        trader.action === 'long' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'
                      }`}>
                        {trader.action.toUpperCase()}
                      </span>
                      <span className="text-gray-400">{trader.confidence * 100}% confidence</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Market Trends */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Market Trends
              </h3>
              <div className="grid gap-4">
                {aiAnalysis.marketTrends.map((trend, index) => (
                  <div key={index} className="bg-gray-800 rounded-xl p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white font-medium">{trend.token}</span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        trend.trend === 'bullish' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'
                      }`}>
                        {trend.trend.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm">{trend.reason}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Transactions Section */}
        <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
          <h2 className="text-2xl font-bold text-white mb-6">Transaction History</h2>
          {loading ? (
            <div className="text-gray-400">Loading transactions...</div>
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : transactions.length === 0 ? (
            <div className="text-gray-400">No transactions found</div>
          ) : (
            <div className="space-y-4">
              {transactions.map((tx, index) => (
                <div key={index} className="bg-gray-800 rounded-xl p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-gray-300">Transaction Hash: {tx.txHash.slice(0, 20)}...</p>
                      <p className="text-sm text-gray-400">
                        {new Date(parseInt(tx.txTime)).toLocaleString()}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      tx.txStatus === 'success' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'
                    }`}>
                      {tx.txStatus}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <p className="text-sm text-gray-400">From</p>
                      <p className="text-gray-300">{tx.from[0]?.address.slice(0, 20)}...</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">To</p>
                      <p className="text-gray-300">{tx.to[0]?.address.slice(0, 20)}...</p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-700">
                    <p className="text-gray-300">
                      Amount: {tx.amount} {tx.symbol}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PortfolioPage; 