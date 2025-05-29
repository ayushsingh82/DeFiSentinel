'use client';

import React, { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import { TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, Activity, Search, BarChart2, LineChart, AlertTriangle } from 'lucide-react';
import axios from 'axios';

interface TokenAnalysis {
  name: string;
  contractAddress: string;
  currentPrice: string;
  supportLevels: string[];
  resistanceLevels: string[];
  technicalIndicators: {
    rsi?: string;
    macd?: string;
    stochastic?: string;
    adx?: string;
    atr?: string;
  };
  marketSentiment: string;
  volatility: string;
  volume24h: string;
  whaleActivity: string;
}

interface MarketData {
  chainIndex: string;
  tokenContractAddress: string;
}

interface CandleData {
  timestamp: string;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
}

const MarketPage = () => {
  const [searchAddress, setSearchAddress] = useState('');
  const [tokenAnalysis, setTokenAnalysis] = useState<TokenAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [priceData, setPriceData] = useState<any>(null);
  const [candleData, setCandleData] = useState<CandleData[]>([]);
  const [loading, setLoading] = useState(false);

  // Demo data for token analysis
  const tokenAnalysisData: { [key: string]: TokenAnalysis } = {
    '0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0': {
      name: 'Solana',
      contractAddress: '0x7D1Afa7B718fb893dB30A3abc0Cfc608AaCfebb0',
      currentPrice: '$174.90',
      supportLevels: [
        '$145.00: Key support level',
        '$144.50: Secondary support',
        '$143.90: Tertiary support'
      ],
      resistanceLevels: [
        '$147.60: Immediate resistance',
        '$148.00: Secondary resistance',
        '$149.00: Strong resistance'
      ],
      technicalIndicators: {
        rsi: '54.57 (bullish momentum)',
        adx: '33.19 (strong trend)',
        atr: '1.24 (stable volatility)'
      },
      marketSentiment: 'Bullish',
      volatility: 'Medium',
      volume24h: '$2.4B',
      whaleActivity: 'High'
    },
    '0x2170ed0880ac9a755fd29b2688956bd959f933f8': {
      name: 'Ethereum',
      contractAddress: '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
      currentPrice: '$2,641.29',
      supportLevels: [
        '$2,400–$2,450: Historical support and 50-day moving average',
        '$2,200–$2,300: Previous consolidation zone',
        '$2,000–$2,150: Psychological level and lower trendline'
      ],
      resistanceLevels: [
        '$2,800–$2,900: Historical resistance and 200-day moving average',
        '$2,650–$2,750: Previous consolidation zone',
        '$3,000–$3,100: Upper trendline and psychological level'
      ],
      technicalIndicators: {
        rsi: '55.12 (neutral)',
        macd: 'Bullish crossover',
        stochastic: 'Oversold region'
      },
      marketSentiment: 'Neutral',
      volatility: 'Low',
      volume24h: '$12.4B',
      whaleActivity: 'Medium'
    },
    '0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7': {
      name: 'Avalanche',
      contractAddress: '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7',
      currentPrice: '$23.44',
      supportLevels: [
        '$16.50: Primary support',
        '$15.00: Secondary support'
      ],
      resistanceLevels: [
        '$19.00: Immediate resistance',
        '$20.50: Secondary resistance',
        '$22.00: Strong resistance'
      ],
      technicalIndicators: {
        rsi: 'Rising (bullish momentum)',
        macd: 'Bullish crossover',
        atr: 'Volume surging, suggesting breakout potential'
      },
      marketSentiment: 'Very Bullish',
      volatility: 'High',
      volume24h: '$845M',
      whaleActivity: 'Very High'
    }
  };

  // Function to get market price
  const getMarketPrice = async (marketData: MarketData) => {
    try {
      const response = await axios.post(
        'https://web3.okx.com/api/v5/dex/market/price',
        [marketData],
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
      console.error('Error fetching market price:', error);
      throw error;
    }
  };

  // Function to get candle data
  const getCandleData = async (chainIndex: string, tokenContractAddress: string) => {
    try {
      const response = await axios.get(
        `https://web3.okx.com/api/v5/dex/market/candles?chainIndex=${chainIndex}&tokenContractAddress=${tokenContractAddress}`,
        {
          headers: {
            'OK-ACCESS-KEY': process.env.NEXT_PUBLIC_OKX_API_KEY,
            'OK-ACCESS-SIGN': process.env.NEXT_PUBLIC_OKX_API_SIGN,
            'OK-ACCESS-PASSPHRASE': process.env.NEXT_PUBLIC_OKX_API_PASSPHRASE,
            'OK-ACCESS-TIMESTAMP': new Date().toISOString(),
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching candle data:', error);
      throw error;
    }
  };

  const handleAddressSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const analysis = tokenAnalysisData[searchAddress.toLowerCase()];
    if (analysis) {
      setTokenAnalysis(analysis);
      setError(null);
    } else {
      setTokenAnalysis(null);
      setError('Token analysis not available for this address');
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment.toLowerCase()) {
      case 'very bullish':
        return 'text-green-500';
      case 'bullish':
        return 'text-green-400';
      case 'neutral':
        return 'text-yellow-500';
      case 'bearish':
        return 'text-red-400';
      case 'very bearish':
        return 'text-red-500';
      default:
        return 'text-gray-400';
    }
  };

  // Example usage
  const fetchMarketData = async () => {
    setLoading(true);
    setError(null);
    try {
      const marketData = {
        chainIndex: "66",
        tokenContractAddress: "0x382bb369d343125bfb2117af9c149795c6c65c50"
      };

      const [priceResponse, candleResponse] = await Promise.all([
        getMarketPrice(marketData),
        getCandleData(marketData.chainIndex, marketData.tokenContractAddress)
      ]);

      setPriceData(priceResponse);
      setCandleData(candleResponse.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

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

          {/* Address Search Form */}
          <form onSubmit={handleAddressSearch} className="mb-8">
            <div className="flex gap-2 max-w-md mx-auto">
              <input
                type="text"
                value={searchAddress}
                onChange={(e) => setSearchAddress(e.target.value)}
                placeholder="Enter token contract address..."
                className="flex-1 px-4 py-2 rounded-xl border border-gray-700 bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition flex items-center gap-2"
              >
                <Search className="w-4 h-4" />
                Analyze
              </button>
            </div>
          </form>

          {/* Token Analysis */}
          {tokenAnalysis && (
            <div className="bg-gray-900 rounded-2xl p-8 shadow-xl mb-8 border border-gray-800">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-white">{tokenAnalysis.name} Analysis</h2>
                <div className={`px-4 py-2 rounded-full ${getSentimentColor(tokenAnalysis.marketSentiment)} bg-opacity-10 ${tokenAnalysis.marketSentiment.toLowerCase().includes('bullish') ? 'bg-green-500' : 'bg-yellow-500'}`}>
                  {tokenAnalysis.marketSentiment}
                </div>
              </div>

              {/* Market Overview */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-gray-800 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <LineChart className="w-4 h-4 text-green-500" />
                    <span className="text-gray-400">Price</span>
                  </div>
                  <p className="text-2xl font-bold text-green-500">{tokenAnalysis.currentPrice}</p>
                </div>
                <div className="bg-gray-800 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="w-4 h-4 text-yellow-500" />
                    <span className="text-gray-400">Volatility</span>
                  </div>
                  <p className="text-2xl font-bold text-yellow-500">{tokenAnalysis.volatility}</p>
                </div>
                <div className="bg-gray-800 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <BarChart2 className="w-4 h-4 text-blue-500" />
                    <span className="text-gray-400">24h Volume</span>
                  </div>
                  <p className="text-2xl font-bold text-blue-500">{tokenAnalysis.volume24h}</p>
                </div>
                <div className="bg-gray-800 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-4 h-4 text-purple-500" />
                    <span className="text-gray-400">Whale Activity</span>
                  </div>
                  <p className="text-2xl font-bold text-purple-500">{tokenAnalysis.whaleActivity}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="bg-gray-800 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Support Levels</h3>
                  <ul className="space-y-2">
                    {tokenAnalysis.supportLevels.map((level, index) => (
                      <li key={index} className="text-gray-300 flex items-center gap-2">
                        <ArrowDownRight className="w-4 h-4 text-red-500" />
                        {level}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-gray-800 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Resistance Levels</h3>
                  <ul className="space-y-2">
                    {tokenAnalysis.resistanceLevels.map((level, index) => (
                      <li key={index} className="text-gray-300 flex items-center gap-2">
                        <ArrowUpRight className="w-4 h-4 text-green-500" />
                        {level}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-gray-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Technical Indicators</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {Object.entries(tokenAnalysis.technicalIndicators).map(([indicator, value]) => (
                    <div key={indicator} className="bg-gray-900 rounded-lg p-4">
                      <p className="text-gray-400 text-sm uppercase">{indicator}</p>
                      <p className="text-white font-medium">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="bg-red-500/10 border border-red-500 rounded-xl p-4 text-red-500 mb-8">
              {error}
            </div>
          )}

          <button
            onClick={fetchMarketData}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Fetch Market Data'}
          </button>

          {priceData && (
            <div className="mt-4">
              <h2 className="text-xl font-semibold mb-2">Price Data</h2>
              <pre className="bg-gray-100 p-4 rounded overflow-auto">
                {JSON.stringify(priceData, null, 2)}
              </pre>
            </div>
          )}

          {candleData.length > 0 && (
            <div className="mt-4">
              <h2 className="text-xl font-semibold mb-2">Candle Data</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 border">Timestamp</th>
                      <th className="px-4 py-2 border">Open</th>
                      <th className="px-4 py-2 border">High</th>
                      <th className="px-4 py-2 border">Low</th>
                      <th className="px-4 py-2 border">Close</th>
                      <th className="px-4 py-2 border">Volume</th>
                    </tr>
                  </thead>
                  <tbody>
                    {candleData.map((candle, index) => (
                      <tr key={index}>
                        <td className="px-4 py-2 border">{new Date(parseInt(candle.timestamp)).toLocaleString()}</td>
                        <td className="px-4 py-2 border">{candle.open}</td>
                        <td className="px-4 py-2 border">{candle.high}</td>
                        <td className="px-4 py-2 border">{candle.low}</td>
                        <td className="px-4 py-2 border">{candle.close}</td>
                        <td className="px-4 py-2 border">{candle.volume}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MarketPage 