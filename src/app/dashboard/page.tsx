'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Navbar from '@/components/Navbar';
import { TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, Activity, Wallet, Coins, Percent } from 'lucide-react';

interface UserStats {
  balance: number;
  totalTokens: number;
  tokenWorth: number;
  percentageShare: number;
  recentTransactions: {
    type: string;
    amount: number;
    date: string;
    token: string;
    status: string;
  }[];
  portfolioPerformance: {
    daily: number;
    weekly: number;
    monthly: number;
  };
  topHoldings: {
    name: string;
    symbol: string;
    amount: number;
    value: number;
    change24h: number;
  }[];
}

export default function DashboardPage() {
  const [userStats, setUserStats] = useState<UserStats>({
    balance: 0,
    totalTokens: 0,
    tokenWorth: 0,
    percentageShare: 0,
    recentTransactions: [],
    portfolioPerformance: {
      daily: 0,
      weekly: 0,
      monthly: 0
    },
    topHoldings: []
  });

  useEffect(() => {
    // Demo data
    const mockData: UserStats = {
      balance: 1500.50,
      totalTokens: 78,
      tokenWorth: 3750.75,
      percentageShare: 65,
      portfolioPerformance: {
        daily: 2.5,
        weekly: 8.3,
        monthly: 15.7
      },
      recentTransactions: [
        { type: 'Received', amount: 500, date: '2024-03-20', token: 'DOT', status: 'Completed' },
        { type: 'Sent', amount: 200, date: '2024-03-19', token: 'ETH', status: 'Completed' },
        { type: 'Received', amount: 1000, date: '2024-03-18', token: 'USDC', status: 'Completed' },
      ],
      topHoldings: [
        { name: 'Polkadot', symbol: 'DOT', amount: 1000, value: 7240, change24h: 5.2 },
        { name: 'Ethereum', symbol: 'ETH', amount: 2.5, value: 8114.17, change24h: 2.8 },
        { name: 'USDC', symbol: 'USDC', amount: 1500, value: 1500, change24h: 0 }
      ]
    };
    setUserStats(mockData);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="container mx-auto p-6 space-y-6">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Dashboard</h1>
            <p className="text-gray-400">Welcome back to your portfolio overview</p>
          </div>
          <div className="flex items-center space-x-4">
            <Avatar>
   
            </Avatar>
            <div>
             
            </div>
          </div>
        </div>

        {/* Portfolio Performance */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Daily Performance</CardTitle>
              <Activity className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">+{userStats.portfolioPerformance.daily}%</div>
              <p className="text-xs text-gray-400">Last 24 hours</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Weekly Performance</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">+{userStats.portfolioPerformance.weekly}%</div>
              <p className="text-xs text-gray-400">Last 7 days</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Monthly Performance</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">+{userStats.portfolioPerformance.monthly}%</div>
              <p className="text-xs text-gray-400">Last 30 days</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Total Balance</CardTitle>
              <Wallet className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">${userStats.balance.toLocaleString()}</div>
              <p className="text-xs text-gray-400">Available balance</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Total Tokens</CardTitle>
              <Coins className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">{userStats.totalTokens.toLocaleString()}</div>
              <p className="text-xs text-gray-400">Token holdings</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Token Worth</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">${userStats.tokenWorth.toLocaleString()}</div>
              <p className="text-xs text-gray-400">Current value</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Share Percentage</CardTitle>
              <Percent className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">{userStats.percentageShare}%</div>
              <Progress value={userStats.percentageShare} className="mt-2 bg-gray-800" />
            </CardContent>
          </Card>
        </div>

        {/* Top Holdings */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Top Holdings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {userStats.topHoldings.map((holding, index) => (
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
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {userStats.recentTransactions.map((transaction, index) => (
                <div key={index} className="flex items-center justify-between border-b border-gray-800 pb-4">
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-full ${transaction.type === 'Received' ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                      {transaction.type === 'Received' ? (
                        <ArrowDownRight className="h-4 w-4 text-green-500" />
                      ) : (
                        <ArrowUpRight className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-white">{transaction.type}</p>
                      <p className="text-sm text-gray-400">{transaction.date} • {transaction.token}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`font-semibold ${transaction.type === 'Received' ? 'text-green-500' : 'text-red-500'}`}>
                      {transaction.type === 'Received' ? '+' : '-'}${transaction.amount}
                    </div>
                    <p className="text-sm text-gray-400">{transaction.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* API Reference Section */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">API Reference</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Get All Token Balances</h3>
                <div className="bg-gray-800 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-sm text-gray-300">
{`curl --location --request GET 'https://web3.okx.com/api/v5/dex/balance/all-token-balances-by-address?address=0xEd0C6079229E2d407672a117c22b62064f4a4312&chains=1' \\
--header 'Content-Type: application/json' \\
--header 'OK-ACCESS-KEY: 37c541a1-****-****-****-10fe7a038418' \\
--header 'OK-ACCESS-SIGN: leaV********3uw=' \\
--header 'OK-ACCESS-PASSPHRASE: 1****6' \\
--header 'OK-ACCESS-TIMESTAMP: 2023-10-18T12:21:41.274Z'`}
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Get Specific Token Balances</h3>
                <div className="bg-gray-800 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-sm text-gray-300">
{`curl --location --request POST 'https://web3.okx.com/api/v5/dex/balance/token-balances' \\
--header 'Content-Type: application/json' \\
--header 'OK-ACCESS-KEY: 37c541a1-****-****-****-10fe7a038418' \\
--header 'OK-ACCESS-SIGN: leaV********3uw=' \\
--header 'OK-ACCESS-PASSPHRASE: 1****6' \\
--header 'OK-ACCESS-TIMESTAMP: 2023-10-18T12:21:41.274Z' \\
--data-raw '{
    "address": "0x50c476a139aab23fdaf9bca12614cdd54a4244e3",
    "tokenContractAddresses": [
        {
            "chainIndex": "1",
            "tokenContractAddress": ""
        }
    ]
}'`}
                  </pre>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
