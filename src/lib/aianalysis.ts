interface TokenAnalysis {
  name: string;
  symbol: string;
  sentiment: 'Very Bullish' | 'Bullish' | 'Neutral' | 'Bearish' | 'Very Bearish';
  confidence: number;
  technicalIndicators: {
    rsi: number;
    macd: string;
    volume: string;
    trend: string;
  };
  keyLevels: {
    support: string[];
    resistance: string[];
  };
  marketInsights: string[];
  riskLevel: 'Low' | 'Moderate' | 'High';
}

interface MarketAnalysis {
  timestamp: number;
  tokens: {
    [key: string]: TokenAnalysis;
  };
  overallMarketSentiment: string;
  correlationAnalysis: {
    [key: string]: {
      correlation: number;
      description: string;
    };
  };
}

// Demo market data for analysis
const marketData = {
  'SOL': {
    currentPrice: 174.90,
    volume24h: 2400000000,
    priceChange24h: 5.2,
    rsi: 65,
    macd: 'bullish',
    supportLevels: [145.00, 144.50, 143.90],
    resistanceLevels: [147.60, 148.00, 149.00]
  },
  'AVAX': {
    currentPrice: 23.44,
    volume24h: 845000000,
    priceChange24h: 8.5,
    rsi: 72,
    macd: 'bullish',
    supportLevels: [16.50, 15.00],
    resistanceLevels: [19.00, 20.50, 22.00]
  },
  'ETH': {
    currentPrice: 2641.29,
    volume24h: 12400000000,
    priceChange24h: 2.8,
    rsi: 55,
    macd: 'neutral',
    supportLevels: [2400, 2200, 2000],
    resistanceLevels: [2800, 2650, 3000]
  }
};

export function analyzeMarketSentiment(): MarketAnalysis {
  const tokenAnalysis: { [key: string]: TokenAnalysis } = {};
  let overallSentiment = 'Neutral';
  let bullishCount = 0;
  let bearishCount = 0;

  // Analyze each token
  Object.entries(marketData).forEach(([symbol, data]) => {
    const analysis = analyzeToken(symbol, data);
    tokenAnalysis[symbol] = analysis;

    // Count sentiments for overall market
    if (analysis.sentiment.includes('Bullish')) bullishCount++;
    if (analysis.sentiment.includes('Bearish')) bearishCount++;
  });

  // Determine overall market sentiment
  if (bullishCount > bearishCount) {
    overallSentiment = 'Bullish';
  } else if (bearishCount > bullishCount) {
    overallSentiment = 'Bearish';
  }

  return {
    timestamp: Date.now(),
    tokens: tokenAnalysis,
    overallMarketSentiment: overallSentiment,
    correlationAnalysis: analyzeCorrelations(tokenAnalysis)
  };
}

function analyzeToken(symbol: string, data: any): TokenAnalysis {
  const sentiment = determineSentiment(data);
  const confidence = calculateConfidence(data);
  const riskLevel = determineRiskLevel(data);

  return {
    name: getTokenName(symbol),
    symbol,
    sentiment,
    confidence,
    technicalIndicators: {
      rsi: data.rsi,
      macd: data.macd,
      volume: formatVolume(data.volume24h),
      trend: determineTrend(data)
    },
    keyLevels: {
      support: data.supportLevels.map((level: number) => `$${level.toFixed(2)}`),
      resistance: data.resistanceLevels.map((level: number) => `$${level.toFixed(2)}`)
    },
    marketInsights: generateInsights(symbol, data),
    riskLevel
  };
}

function determineSentiment(data: any): TokenAnalysis['sentiment'] {
  const { rsi, priceChange24h, macd } = data;
  
  if (rsi > 70 && priceChange24h > 5 && macd === 'bullish') {
    return 'Very Bullish';
  } else if (rsi > 60 && priceChange24h > 0 && macd === 'bullish') {
    return 'Bullish';
  } else if (rsi < 30 && priceChange24h < -5 && macd === 'bearish') {
    return 'Very Bearish';
  } else if (rsi < 40 && priceChange24h < 0 && macd === 'bearish') {
    return 'Bearish';
  }
  return 'Neutral';
}

function calculateConfidence(data: any): number {
  const { rsi, volume24h, priceChange24h } = data;
  let confidence = 50;

  // RSI confidence
  if (rsi > 70 || rsi < 30) confidence += 20;
  else if (rsi > 60 || rsi < 40) confidence += 10;

  // Volume confidence
  if (volume24h > 1000000000) confidence += 15;
  else if (volume24h > 500000000) confidence += 10;

  // Price change confidence
  if (Math.abs(priceChange24h) > 5) confidence += 15;
  else if (Math.abs(priceChange24h) > 2) confidence += 10;

  return Math.min(confidence, 100);
}

function determineRiskLevel(data: any): TokenAnalysis['riskLevel'] {
  const { rsi, priceChange24h, volume24h } = data;
  
  if (Math.abs(priceChange24h) > 10 || rsi > 75 || rsi < 25) {
    return 'High';
  } else if (Math.abs(priceChange24h) > 5 || rsi > 65 || rsi < 35) {
    return 'Moderate';
  }
  return 'Low';
}

function determineTrend(data: any): string {
  const { priceChange24h, rsi, macd } = data;
  
  if (priceChange24h > 5 && rsi > 60 && macd === 'bullish') {
    return 'Strong Uptrend';
  } else if (priceChange24h > 0 && rsi > 50 && macd === 'bullish') {
    return 'Uptrend';
  } else if (priceChange24h < -5 && rsi < 40 && macd === 'bearish') {
    return 'Strong Downtrend';
  } else if (priceChange24h < 0 && rsi < 50 && macd === 'bearish') {
    return 'Downtrend';
  }
  return 'Sideways';
}

function generateInsights(symbol: string, data: any): string[] {
  const insights: string[] = [];
  const { rsi, priceChange24h, volume24h, macd } = data;

  // RSI insights
  if (rsi > 70) {
    insights.push(`${symbol} is showing overbought conditions`);
  } else if (rsi < 30) {
    insights.push(`${symbol} is showing oversold conditions`);
  }

  // Volume insights
  if (volume24h > 1000000000) {
    insights.push(`High trading volume indicates strong market interest`);
  }

  // Price change insights
  if (priceChange24h > 5) {
    insights.push(`Strong upward momentum with ${priceChange24h}% gain`);
  } else if (priceChange24h < -5) {
    insights.push(`Significant downward pressure with ${priceChange24h}% loss`);
  }

  // MACD insights
  if (macd === 'bullish') {
    insights.push(`MACD indicates bullish momentum`);
  } else if (macd === 'bearish') {
    insights.push(`MACD indicates bearish momentum`);
  }

  return insights;
}

function analyzeCorrelations(analysis: { [key: string]: TokenAnalysis }) {
  const correlations: { [key: string]: { correlation: number; description: string } } = {};
  const tokens = Object.keys(analysis);

  for (let i = 0; i < tokens.length; i++) {
    for (let j = i + 1; j < tokens.length; j++) {
      const token1 = tokens[i];
      const token2 = tokens[j];
      const correlation = calculateCorrelation(analysis[token1], analysis[token2]);
      
      correlations[`${token1}-${token2}`] = {
        correlation,
        description: getCorrelationDescription(correlation)
      };
    }
  }

  return correlations;
}

function calculateCorrelation(token1: TokenAnalysis, token2: TokenAnalysis): number {
  // Simplified correlation calculation based on sentiment and technical indicators
  const sentimentScore1 = getSentimentScore(token1.sentiment);
  const sentimentScore2 = getSentimentScore(token2.sentiment);
  const rsiDiff = Math.abs(token1.technicalIndicators.rsi - token2.technicalIndicators.rsi);
  
  return (sentimentScore1 * sentimentScore2) / (1 + rsiDiff / 100);
}

function getSentimentScore(sentiment: TokenAnalysis['sentiment']): number {
  switch (sentiment) {
    case 'Very Bullish': return 1;
    case 'Bullish': return 0.5;
    case 'Neutral': return 0;
    case 'Bearish': return -0.5;
    case 'Very Bearish': return -1;
  }
}

function getCorrelationDescription(correlation: number): string {
  if (correlation > 0.7) return 'Strong positive correlation';
  if (correlation > 0.3) return 'Moderate positive correlation';
  if (correlation > -0.3) return 'Low correlation';
  if (correlation > -0.7) return 'Moderate negative correlation';
  return 'Strong negative correlation';
}

function getTokenName(symbol: string): string {
  switch (symbol) {
    case 'SOL': return 'Solana';
    case 'AVAX': return 'Avalanche';
    case 'ETH': return 'Ethereum';
    default: return symbol;
  }
}

function formatVolume(volume: number): string {
  if (volume >= 1000000000) {
    return `$${(volume / 1000000000).toFixed(2)}B`;
  }
  return `$${(volume / 1000000).toFixed(2)}M`;
}

// Export the analysis function
export const getMarketAnalysis = analyzeMarketSentiment;
