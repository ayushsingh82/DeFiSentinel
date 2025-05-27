'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Brain, TrendingUp, TrendingDown, MessageSquare, ArrowRight } from 'lucide-react';

interface Token {
  name: string;
  symbol: string;
  logo: string;
  price: string;
  change24h: string;
  change7d: string;
  change30d: string;
  marketCap: string;
  volume24h: string;
  totalSupply: string;
  circulatingSupply: string;
}

const RebalancerPage = () => {
  const [currentAllocation, setCurrentAllocation] = useState({
    ETH: 35,
    DOT: 35,
    USDC: 30
  });

  const [suggestedAllocation, setSuggestedAllocation] = useState({
    ETH: 40,
    DOT: 30,
    USDC: 30
  });

  const [riskProfile, setRiskProfile] = useState('Low Risk');
  const [showChatbot, setShowChatbot] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'assistant', message: string }[]>([]);

  const gainers: Token[] = [
    {
      name: 'Snow Leopard',
      symbol: 'SNL',
      logo: '/snl-logo.png',
      price: '$0.065925',
      change24h: '0.01%',
      change7d: '4644.67%',
      change30d: '299.50%',
      marketCap: '$14,219,869',
      volume24h: '$912,483',
      totalSupply: '24T SNL',
      circulatingSupply: '1.54T SNL'
    },
    {
      name: 'TURBO BOME',
      symbol: 'TURBO',
      logo: '/turbo-logo.png',
      price: '$0.0002057',
      change24h: '30.70%',
      change7d: '2844.25%',
      change30d: '3170.54%',
      marketCap: '$14,232,895',
      volume24h: '$74,892',
      totalSupply: '69B TURBO',
      circulatingSupply: '363.07M TURBO'
    },
    // Add more gainers as needed
  ];

  const losers: Token[] = [
    {
      name: 'GameStop Coin',
      symbol: 'GME',
      logo: '/gme-logo.png',
      price: '$0.00002744',
      change24h: '8.39%',
      change7d: '480.26%',
      change30d: '13.79%',
      marketCap: '$11,525,781',
      volume24h: '$439,017',
      totalSupply: '--',
      circulatingSupply: '--'
    },
    // Add more losers as needed
  ];

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    // Add user message to chat
    setChatHistory(prev => [...prev, { role: 'user', message: chatMessage }]);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = `Based on current market conditions, I recommend ${riskProfile} strategy with the suggested allocation. The market shows strong momentum in ${gainers[0].symbol} and potential reversal in ${losers[0].symbol}.`;
      setChatHistory(prev => [...prev, { role: 'assistant', message: aiResponse }]);
    }, 1000);

    setChatMessage('');
  };

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white mb-8">AI Portfolio Rebalancer</h1>

        {/* Allocation Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Current Allocation */}
          <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
            <h2 className="text-2xl font-bold text-white mb-6">Current Allocation</h2>
            <div className="space-y-4">
              {Object.entries(currentAllocation).map(([token, percentage]) => (
                <div key={token} className="flex items-center justify-between">
                  <span className="text-gray-300">{token}</span>
                  <div className="flex items-center gap-4">
                    <div className="w-32 h-2 bg-gray-800 rounded-full">
                      <div 
                        className="h-full bg-green-500 rounded-full"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-white font-medium">{percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Suggested Allocation */}
          <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
            <h2 className="text-2xl font-bold text-white mb-6">Suggested Allocation</h2>
            <div className="space-y-4">
              {Object.entries(suggestedAllocation).map(([token, percentage]) => (
                <div key={token} className="flex items-center justify-between">
                  <span className="text-gray-300">{token}</span>
                  <div className="flex items-center gap-4">
                    <div className="w-32 h-2 bg-gray-800 rounded-full">
                      <div 
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-white font-medium">{percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Risk Profile and Action */}
        <div className="bg-gray-900 rounded-2xl p-8 mb-8 border border-gray-800">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Risk Profile</h2>
              <p className="text-green-500 font-medium">{riskProfile}</p>
            </div>
            <button className="px-6 py-3 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-600 transition flex items-center gap-2">
              Ready to Rebalance <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Gainers Section */}
        <div className="bg-gray-900 rounded-2xl p-8 mb-8 border border-gray-800">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-green-500" />
            Top Gainers
          </h2>
          <div className="grid gap-4">
            {gainers.map((token, index) => (
              <div key={index} className="bg-gray-800 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <img src={token.logo} alt={token.name} className="w-12 h-12 rounded-full" />
                    <div>
                      <h3 className="text-white font-bold">{token.name}</h3>
                      <p className="text-gray-400">{token.symbol}</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition">
                    Buy
                  </button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-gray-400 text-sm">Price</p>
                    <p className="text-white font-medium">{token.price}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">24h Change</p>
                    <p className="text-green-500 font-medium">{token.change24h}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">7d Change</p>
                    <p className="text-green-500 font-medium">{token.change7d}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">30d Change</p>
                    <p className="text-green-500 font-medium">{token.change30d}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Losers Section */}
        <div className="bg-gray-900 rounded-2xl p-8 mb-8 border border-gray-800">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <TrendingDown className="w-6 h-6 text-red-500" />
            Top Losers
          </h2>
          <div className="grid gap-4">
            {losers.map((token, index) => (
              <div key={index} className="bg-gray-800 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <img src={token.logo} alt={token.name} className="w-12 h-12 rounded-full" />
                    <div>
                      <h3 className="text-white font-bold">{token.name}</h3>
                      <p className="text-gray-400">{token.symbol}</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition">
                    Sell
                  </button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-gray-400 text-sm">Price</p>
                    <p className="text-white font-medium">{token.price}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">24h Change</p>
                    <p className="text-red-500 font-medium">{token.change24h}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">7d Change</p>
                    <p className="text-red-500 font-medium">{token.change7d}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">30d Change</p>
                    <p className="text-red-500 font-medium">{token.change30d}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Chatbot */}
        <div className="fixed bottom-8 right-8">
          <button
            onClick={() => setShowChatbot(!showChatbot)}
            className="bg-blue-500 text-white p-4 rounded-full hover:bg-blue-600 transition shadow-lg"
          >
            <MessageSquare className="w-6 h-6" />
          </button>

          {showChatbot && (
            <div className="absolute bottom-20 right-0 w-96 bg-gray-900 rounded-2xl border border-gray-800 shadow-xl">
              <div className="p-4 border-b border-gray-800">
                <h3 className="text-white font-bold flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  AI Assistant
                </h3>
              </div>
              <div className="h-96 overflow-y-auto p-4 space-y-4">
                {chatHistory.map((chat, index) => (
                  <div
                    key={index}
                    className={`flex ${chat.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-xl p-3 ${
                        chat.role === 'user'
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-800 text-gray-300'
                      }`}
                    >
                      {chat.message}
                    </div>
                  </div>
                ))}
              </div>
              <form onSubmit={handleChatSubmit} className="p-4 border-t border-gray-800">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    placeholder="Ask about market trends..."
                    className="flex-1 px-4 py-2 rounded-xl bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition"
                  >
                    Send
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RebalancerPage; 