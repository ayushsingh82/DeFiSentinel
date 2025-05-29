'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, Activity, Wallet, Coins, Percent, Brain, AlertTriangle, BarChart2, Search, Loader2 } from 'lucide-react';
import { getMarketAnalysis } from '@/lib/aianalysis';
import axios from 'axios';

interface PortfolioData {
  totalValue: number;
  totalTokens: number;
  portfolioPerformance: {
    daily: number;
    weekly: number;
    monthly: number;
  };
  holdings: {
    name: string;
    symbol: string;
    amount: number;
    value: number;
    change24h: number;
    allocation: number;
  }[];
  aiSuggestions: {
    riskLevel: string;
    recommendations: string[];
    opportunities: string[];
    warnings: string[];
  };
}

interface Transaction {
  hash: string;
  from: string;
  to: string;
  value: string;
  timestamp: string;
  status: string;
  type: string;
}

export default function PortfolioPage() {
  const [address, setAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPortfolio, setShowPortfolio] = useState(false);
  const [marketAnalysis, setMarketAnalysis] = useState<any>(null);
  const [portfolioData, setPortfolioData] = useState<PortfolioData>({
    totalValue: 16854.67,
    totalTokens: 78,
    portfolioPerformance: {
      daily: 2.5,
      weekly: 8.3,
      monthly: 15.7
    },
    holdings: [
      {
        name: 'Polkadot',
        symbol: 'DOT',
        amount: 1000,
        value: 7240,
        change24h: 5.2,
        allocation: 35
      },
      {
        name: 'Ethereum',
        symbol: 'ETH',
        amount: 2.5,
        value: 6614.17,
        change24h: 2.8,
        allocation: 35
      },
      {
        name: 'USDC',
        symbol: 'USDC',
        amount: 3000,
        value: 3000,
        change24h: 0,
        allocation: 30
      }
    ],
    aiSuggestions: {
      riskLevel: 'Moderate',
      recommendations: [
        'Consider increasing ETH allocation to 40% for better growth potential',
        'Diversify into AVAX and SOL for better risk management',
        'Maintain USDC position for market opportunities'
      ],
      opportunities: [
        'AVAX showing strong momentum, consider 15% allocation',
        'SOL has strong technical indicators, potential for 15% allocation',
        'DOT/ETH pair showing favorable correlation for hedging'
      ],
      warnings: [
        'High concentration in DOT (35%) increases portfolio risk',
        'Consider reducing USDC allocation to 20% for better returns',
        'Monitor ETH volatility for potential rebalancing'
      ]
    }
  });

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Function to get transaction history
  const getTransactionHistory = async (address: string) => {
    try {
      const response = await axios.get(
        `https://web3.okx.com/api/v5/dex/post-transaction/transactions-by-address?addresses=${address}&chains=1`,
        {
          headers: {
            'Content-Type': 'application/json',
            'OK-ACCESS-KEY': process.env.NEXT_PUBLIC_OKX_API_KEY,
            'OK-ACCESS-SIGN': process.env.NEXT_PUBLIC_OKX_API_SIGN,
            'OK-ACCESS-PASSPHRASE': process.env.NEXT_PUBLIC_OKX_API_PASSPHRASE,
            'OK-ACCESS-TIMESTAMP': new Date().toISOString(),
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching transaction history:', error);
      throw error;
    }
  };

  const handleAddressSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address) return;
    
    setIsLoading(true);
    setError(null);

    try {
      // Get market analysis
      const analysis = getMarketAnalysis();
      setMarketAnalysis(analysis);

      // Update portfolio data with market insights
      const updatedPortfolioData = {
        ...portfolioData,
        aiSuggestions: {
          riskLevel: analysis.overallMarketSentiment,
          recommendations: generateRecommendations(analysis),
          opportunities: generateOpportunities(analysis),
          warnings: generateWarnings(analysis)
        }
      };
      setPortfolioData(updatedPortfolioData);
      setShowPortfolio(true);

      const transactionData = await getTransactionHistory(address);
      setTransactions(transactionData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const generateRecommendations = (analysis: any): string[] => {
    const recommendations: string[] = [];
    Object.entries(analysis.tokens).forEach(([symbol, tokenData]: [string, any]) => {
      if (tokenData.sentiment === 'Very Bullish' || tokenData.sentiment === 'Bullish') {
        recommendations.push(`Consider increasing ${symbol} allocation due to strong bullish signals`);
      }
      if (tokenData.riskLevel === 'High') {
        recommendations.push(`Monitor ${symbol} closely due to high volatility`);
      }
    });
    return recommendations;
  };

  const generateOpportunities = (analysis: any): string[] => {
    const opportunities: string[] = [];
    Object.entries(analysis.tokens).forEach(([symbol, tokenData]: [string, any]) => {
      if (tokenData.technicalIndicators.trend.includes('Uptrend')) {
        opportunities.push(`${symbol} showing strong momentum with ${tokenData.technicalIndicators.volume} volume`);
      }
    });
    return opportunities;
  };

  const generateWarnings = (analysis: any): string[] => {
    const warnings: string[] = [];
    Object.entries(analysis.tokens).forEach(([symbol, tokenData]: [string, any]) => {
      if (tokenData.sentiment === 'Very Bearish' || tokenData.sentiment === 'Bearish') {
        warnings.push(`Exercise caution with ${symbol} due to bearish signals`);
      }
      if (tokenData.technicalIndicators.rsi > 70) {
        warnings.push(`${symbol} showing overbought conditions`);
      }
    });
    return warnings;
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="container mx-auto p-6 space-y-6">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">Portfolio Analysis</h1>
          <p className="text-gray-400">Track your assets and get AI-powered insights</p>
        </div>

        {/* Address Input Section */}
        <Card className="bg-gray-900 border-gray-800 max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-white">Enter Wallet Address</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddressSubmit} className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter your wallet address..."
                  className="flex-1 px-4 py-2 rounded-xl border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition flex items-center gap-2 disabled:opacity-50"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Search className="w-4 h-4" />
                  )}
                  {isLoading ? 'Analyzing...' : 'Analyze'}
                </button>
              </div>
            </form>
          </CardContent>
        </Card>

        {error && (
          <div className="bg-red-500/10 border border-red-500 rounded-lg p-4 text-red-500 mb-8">
            {error}
          </div>
        )}

        {showPortfolio && marketAnalysis && (
          <>
            {/* AI Analysis */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Brain className="w-5 h-5 text-green-500" />
                  AI Portfolio Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Market Sentiment */}
                  <div className="bg-gray-800 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      Market Sentiment
                    </h3>
                    <div className="space-y-4">
                      <div className="text-2xl font-bold text-green-500">
                        {marketAnalysis.overallMarketSentiment}
                      </div>
                      {Object.entries(marketAnalysis.tokens).map(([symbol, data]: [string, any]) => (
                        <div key={symbol} className="flex justify-between items-center">
                          <span className="text-gray-300">{symbol}</span>
                          <span className={`px-2 py-1 rounded-full text-sm ${
                            data.sentiment.includes('Bullish') ? 'bg-green-500/20 text-green-500' :
                            data.sentiment.includes('Bearish') ? 'bg-red-500/20 text-red-500' :
                            'bg-yellow-500/20 text-yellow-500'
                          }`}>
                            {data.sentiment}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Technical Analysis */}
                  <div className="bg-gray-800 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <BarChart2 className="w-4 h-4 text-blue-500" />
                      Technical Analysis
                    </h3>
                    <div className="space-y-4">
                      {Object.entries(marketAnalysis.tokens).map(([symbol, data]: [string, any]) => (
                        <div key={symbol} className="space-y-2">
                          <div className="font-medium text-white">{symbol}</div>
                          <div className="text-sm text-gray-300">
                            <div>RSI: {data.technicalIndicators.rsi}</div>
                            <div>Trend: {data.technicalIndicators.trend}</div>
                            <div>Volume: {data.technicalIndicators.volume}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Risk Analysis */}
                  <div className="bg-gray-800 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-yellow-500" />
                      Risk Analysis
                    </h3>
                    <div className="space-y-4">
                      {Object.entries(marketAnalysis.tokens).map(([symbol, data]: [string, any]) => (
                        <div key={symbol} className="space-y-2">
                          <div className="font-medium text-white">{symbol}</div>
                          <div className="text-sm text-gray-300">
                            <div>Risk Level: {data.riskLevel}</div>
                            <div>Confidence: {data.confidence}%</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Portfolio Performance */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">Daily Performance</CardTitle>
                  <Activity className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-500">+{portfolioData.portfolioPerformance.daily}%</div>
                  <p className="text-xs text-gray-400">Last 24 hours</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">Weekly Performance</CardTitle>
                  <TrendingUp className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-500">+{portfolioData.portfolioPerformance.weekly}%</div>
                  <p className="text-xs text-gray-400">Last 7 days</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">Monthly Performance</CardTitle>
                  <TrendingUp className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-500">+{portfolioData.portfolioPerformance.monthly}%</div>
                  <p className="text-xs text-gray-400">Last 30 days</p>
                </CardContent>
              </Card>
            </div>

            {/* Main Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Total Portfolio Value</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-500">${portfolioData.totalValue.toLocaleString()}</div>
                  <p className="text-sm text-gray-400">Across {portfolioData.totalTokens} tokens</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Risk Level</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-yellow-500">{portfolioData.aiSuggestions.riskLevel}</div>
                  <Progress value={65} className="mt-2 bg-gray-800" />
                </CardContent>
              </Card>
            </div>

            {/* Holdings */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Current Holdings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {portfolioData.holdings.map((holding, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-800 rounded-xl">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold">{holding.symbol.charAt(0)}</span>
                        </div>
                        <div>
                          <p className="font-medium text-white">{holding.name}</p>
                          <p className="text-sm text-gray-400">{holding.amount} {holding.symbol}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-medium">${holding.value.toLocaleString()}</p>
                        <p className={`text-sm ${holding.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                          {holding.change24h >= 0 ? '+' : ''}{holding.change24h}%
                        </p>
                        <p className="text-sm text-gray-400">{holding.allocation}% of portfolio</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {/* Transaction History Display */}
        {transactions.length > 0 && (
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Transaction History</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="text-left text-gray-400 border-b border-gray-700">
                    <th className="pb-4">Hash</th>
                    <th className="pb-4">From</th>
                    <th className="pb-4">To</th>
                    <th className="pb-4">Value</th>
                    <th className="pb-4">Timestamp</th>
                    <th className="pb-4">Status</th>
                    <th className="pb-4">Type</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  {transactions.map((tx, index) => (
                    <tr key={index} className="border-b border-gray-700">
                      <td className="py-4 text-sm">{tx.hash.slice(0, 8)}...{tx.hash.slice(-6)}</td>
                      <td className="py-4 text-sm">{tx.from.slice(0, 8)}...{tx.from.slice(-6)}</td>
                      <td className="py-4 text-sm">{tx.to.slice(0, 8)}...{tx.to.slice(-6)}</td>
                      <td className="py-4 text-sm">{tx.value}</td>
                      <td className="py-4 text-sm">{new Date(tx.timestamp).toLocaleString()}</td>
                      <td className="py-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          tx.status === 'success' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'
                        }`}>
                          {tx.status}
                        </span>
                      </td>
                      <td className="py-4 text-sm">{tx.type}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 