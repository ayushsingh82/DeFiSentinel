'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import axios from 'axios';

interface TokenBalance {
  chainIndex: string;
  tokenContractAddress: string;
  balance: string;
  symbol: string;
}

interface TotalBalance {
  address: string;
  totalBalance: string;
  tokenBalances: TokenBalance[];
}

const DashboardPage = () => {
  const [address, setAddress] = useState('');
  const [totalBalance, setTotalBalance] = useState<TotalBalance | null>(null);
  const [tokenBalances, setTokenBalances] = useState<TokenBalance[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Function to get total balance
  const getTotalBalance = async (address: string) => {
    try {
      const response = await axios.get(
        `https://web3.okx.com/api/v5/dex/balance/all-token-balances-by-address?address=${address}&chains=1`,
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
      console.error('Error fetching total balance:', error);
      throw error;
    }
  };

  // Function to get specific token balances
  const getTokenBalances = async (address: string, tokenAddresses: { chainIndex: string; tokenContractAddress: string }[]) => {
    try {
      const response = await axios.post(
        'https://web3.okx.com/api/v5/dex/balance/token-balances',
        {
          address,
          tokenContractAddresses: tokenAddresses,
        },
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
      console.error('Error fetching token balances:', error);
      throw error;
    }
  };

  const handleAddressSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Get total balance
      const totalBalanceData = await getTotalBalance(address);
      setTotalBalance(totalBalanceData);

      // Get specific token balances
      const tokenAddresses = [
        {
          chainIndex: "1",
          tokenContractAddress: ""
        }
      ];
      const tokenBalancesData = await getTokenBalances(address, tokenAddresses);
      setTokenBalances(tokenBalancesData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-8">Dashboard</h1>

        {/* Address Input Form */}
        <form onSubmit={handleAddressSubmit} className="mb-8">
          <div className="flex gap-4">
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter wallet address"
              className="flex-1 px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-green-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50"
            >
              {loading ? 'Loading...' : 'Fetch Balance'}
            </button>
          </div>
        </form>

        {error && (
          <div className="bg-red-500/10 border border-red-500 rounded-lg p-4 text-red-500 mb-8">
            {error}
          </div>
        )}

        {/* Total Balance Display */}
        {totalBalance && (
          <div className="bg-gray-800 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">Total Balance</h2>
            <div className="text-2xl font-bold text-green-500">
              {totalBalance.totalBalance}
            </div>
          </div>
        )}

        {/* Token Balances Display */}
        {tokenBalances.length > 0 && (
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Token Balances</h2>
            <div className="grid gap-4">
              {tokenBalances.map((token, index) => (
                <div key={index} className="bg-gray-700 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-white font-medium">{token.symbol}</div>
                      <div className="text-gray-400 text-sm">{token.tokenContractAddress}</div>
                    </div>
                    <div className="text-green-500 font-bold">{token.balance}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
