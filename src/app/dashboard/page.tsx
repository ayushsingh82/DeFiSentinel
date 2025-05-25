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
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src="/placeholder-avatar.jpg" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">John Doe</p>
              <p className="text-sm text-gray-500">john.doe@example.com</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${userStats.balance.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Available balance</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Tokens</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userStats.totalTokens.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Token holdings</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Token Worth</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${userStats.tokenWorth.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Current value</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Share Percentage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userStats.percentageShare}%</div>
              <Progress value={userStats.percentageShare} className="mt-2" />
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {userStats.recentTransactions.map((transaction, index) => (
                <div key={index} className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="font-medium">{transaction.type}</p>
                    <p className="text-sm text-gray-500">{transaction.date}</p>
                  </div>
                  <div className={`font-semibold ${transaction.type === 'Received' ? 'text-green-600' : 'text-red-600'}`}>
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
