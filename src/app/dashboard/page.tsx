'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Navbar from '@/components/Navbar';

interface UserStats {
  balance: number;
  totalTokens: number;
  tokenWorth: number;
  percentageShare: number;
  recentTransactions: {
    type: string;
    amount: number;
    date: string;
  }[];
}

export default function DashboardPage() {
  const [userStats, setUserStats] = useState<UserStats>({
    balance: 0,
    totalTokens: 0,
    tokenWorth: 0,
    percentageShare: 0,
    recentTransactions: []
  });

  useEffect(() => {
    // TODO: Replace with actual API call to fetch user data
    const mockData: UserStats = {
      balance: 1500.50,
      totalTokens: 2500,
      tokenWorth: 3750.75,
      percentageShare: 65,
      recentTransactions: [
        { type: 'Received', amount: 500, date: '2024-03-20' },
        { type: 'Sent', amount: 200, date: '2024-03-19' },
        { type: 'Received', amount: 1000, date: '2024-03-18' },
      ]
    };
    setUserStats(mockData);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src="/placeholder-avatar.jpg" />
              <AvatarFallback className="bg-gray-800 text-green-500">JD</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-white">John Doe</p>
              <p className="text-sm text-gray-400">john.doe@example.com</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Total Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">${userStats.balance.toLocaleString()}</div>
              <p className="text-xs text-gray-400">Available balance</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Total Tokens</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">{userStats.totalTokens.toLocaleString()}</div>
              <p className="text-xs text-gray-400">Token holdings</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Token Worth</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">${userStats.tokenWorth.toLocaleString()}</div>
              <p className="text-xs text-gray-400">Current value</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Share Percentage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">{userStats.percentageShare}%</div>
              <Progress value={userStats.percentageShare} className="mt-2 bg-gray-800" />
            </CardContent>
          </Card>
        </div>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {userStats.recentTransactions.map((transaction, index) => (
                <div key={index} className="flex items-center justify-between border-b border-gray-800 pb-4">
                  <div>
                    <p className="font-medium text-white">{transaction.type}</p>
                    <p className="text-sm text-gray-400">{transaction.date}</p>
                  </div>
                  <div className={`font-semibold ${transaction.type === 'Received' ? 'text-green-500' : 'text-red-500'}`}>
                    {transaction.type === 'Received' ? '+' : '-'}${transaction.amount}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
