'use client';

import React, { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'

interface PriceData {
  chainIndex: string;
  tokenContractAddress: string;
  price?: string;
  timestamp?: string;
  tokenName?: string;
  symbol?: string;
  volume24h?: string;
  change24h?: string;
}

const MarketPage = () => {
  const [priceData, setPriceData] = useState<PriceData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Demo data for tokens
  const demoTokens = [
    {
      chainIndex: "66",
      tokenContractAddress: "0x382bb369d343125bfb2117af9c149795c6c65c50",
      tokenName: "Polkadot",
      symbol: "DOT",
      price: "7.24",
      volume24h: "$245.6M",
      change24h: "+5.2%",
      timestamp: new Date().toISOString()
    },
    {
      chainIndex: "1",
      tokenContractAddress: "0x2170ed0880ac9a755fd29b2688956bd959f933f8",
      tokenName: "Ethereum",
      symbol: "ETH",
      price: "3,245.67",
      volume24h: "$12.4B",
      change24h: "+2.8%",
      timestamp: new Date().toISOString()
    },
    {
      chainIndex: "56",
      tokenContractAddress: "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d",
      tokenName: "USDC",
      symbol: "USDC",
      price: "1.00",
      volume24h: "$8.2B",
      change24h: "0.0%",
      timestamp: new Date().toISOString()
    }
  ];

  const fetchPriceData = async () => {
    setLoading(true);
    setError(null);
    try {
      const timestamp = new Date().toISOString();
      const response = await fetch('https://web3.okx.com/api/v5/dex/market/price', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'OK-ACCESS-KEY': process.env.NEXT_PUBLIC_OKX_ACCESS_KEY || '',
          'OK-ACCESS-SIGN': process.env.NEXT_PUBLIC_OKX_ACCESS_SIGN || '',
          'OK-ACCESS-PASSPHRASE': process.env.NEXT_PUBLIC_OKX_PASSPHRASE || '',
          'OK-ACCESS-TIMESTAMP': timestamp,
        },
        body: JSON.stringify([
          {
            chainIndex: "66",
            tokenContractAddress: "0x382bb369d343125bfb2117af9c149795c6c65c50"
          },
          {
            chainIndex: "1",
            tokenContractAddress: "0x2170ed0880ac9a755fd29b2688956bd959f933f8"
          },
          {
            chainIndex: "56",
            tokenContractAddress: "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d"
          }
        ])
      });

      if (!response.ok) {
        throw new Error('Failed to fetch price data');
      }

      const data = await response.json();
      
      // Transform API data to match our interface
      const transformedData = data.data?.map((item: any, index: number) => ({
        ...item,
        tokenName: demoTokens[index].tokenName,
        symbol: demoTokens[index].symbol,
        volume24h: demoTokens[index].volume24h,
        change24h: demoTokens[index].change24h
      })) || [];

      setPriceData(transformedData);
    } catch (err) {
      console.error('API Error:', err);
      // Fallback to demo data if API fails
      setPriceData(demoTokens);
      setError('Using demo data - API temporarily unavailable');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPriceData();
    // Set up polling every 30 seconds
    const interval = setInterval(fetchPriceData, 30000);
    return () => clearInterval(interval);
  }, []);

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
          
          {/* Price Data Section */}
          <div className="bg-gray-900 rounded-2xl p-8 shadow-xl mb-8 border border-gray-800">
            <h2 className="text-2xl font-bold mb-6 text-white">Market Overview</h2>
            {loading ? (
              <div className="text-gray-400">Loading price data...</div>
            ) : error ? (
              <div className="text-red-500">{error}</div>
            ) : (
              <div className="space-y-4">
                {priceData.map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-4 bg-gray-800 rounded-xl">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">{item.symbol?.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="text-white font-medium">{item.tokenName}</p>
                        <p className="text-sm text-gray-400">{item.symbol}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-green-500 font-bold">${item.price}</p>
                      <p className="text-sm text-gray-400">Vol: {item.volume24h}</p>
                      <p className={`text-sm ${item.change24h?.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                        {item.change24h}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-gray-900 rounded-2xl p-8 shadow-xl mb-8 border border-gray-800">
            <div className="grid grid-cols-2 gap-8">
              <div className="text-center">
                <p className="text-3xl font-bold text-green-500">$245.6M</p>
                <p className="text-sm text-gray-400 mt-2">24h Volume</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-green-500">3</p>
                <p className="text-sm text-gray-400 mt-2">Active Markets</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-green-500">High</p>
                <p className="text-sm text-gray-400 mt-2">Market Activity</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-green-500">76/100</p>
                <p className="text-sm text-gray-400 mt-2">Market Health</p>
              </div>
            </div>
          </div>

          {/* Market Trends Section */}
          <div className="bg-gray-900 rounded-2xl p-8 shadow-xl mb-8 border border-gray-800">
            <h2 className="text-2xl font-bold mb-6 text-white">Market Trends</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Top Gainers</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">DOT/USDT</span>
                    <span className="text-green-500">+5.2%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">ETH/USDT</span>
                    <span className="text-green-500">+2.8%</span>
                  </div>
                </div>
              </div>
              <div className="bg-gray-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Top Volume</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">ETH/USDT</span>
                    <span className="text-gray-300">$12.4B</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">USDC/USDT</span>
                    <span className="text-gray-300">$8.2B</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MarketPage 