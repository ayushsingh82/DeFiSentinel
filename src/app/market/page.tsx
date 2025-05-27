'use client';

import React, { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'

interface PriceData {
  chainIndex: string;
  tokenContractAddress: string;
  price?: string;
  timestamp?: string;
}

const MarketPage = () => {
  const [priceData, setPriceData] = useState<PriceData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
          }
        ])
      });

      if (!response.ok) {
        throw new Error('Failed to fetch price data');
      }

      const data = await response.json();
      setPriceData(data.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
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
            <h2 className="text-2xl font-bold mb-6 text-white">OKX Price Data</h2>
            {loading ? (
              <div className="text-gray-400">Loading price data...</div>
            ) : error ? (
              <div className="text-red-500">{error}</div>
            ) : (
              <div className="space-y-4">
                {priceData.map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-4 bg-gray-800 rounded-xl">
                    <div>
                      <p className="text-gray-300">Chain Index: {item.chainIndex}</p>
                      <p className="text-sm text-gray-400">Contract: {item.tokenContractAddress}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-green-500 font-bold">{item.price || 'N/A'}</p>
                      <p className="text-sm text-gray-400">{item.timestamp || 'N/A'}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

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

         
           
        </div>
      </div>
    </div>
  )
}

export default MarketPage 