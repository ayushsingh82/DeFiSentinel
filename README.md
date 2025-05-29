# DeFiSentinel

A Next.js-based trading analysis platform focused on Solana ecosystem, providing AI-powered market analysis, portfolio insights, and real-time trading intelligence. The platform specializes in analyzing Solana-based tokens and DeFi protocols, offering advanced market analysis tools and trading insights to help traders make informed decisions.

## Features

### 1. AI Market Radar
- Real-time market sentiment analysis for Solana ecosystem tokens (SOL, RAY, SRM, etc.)
- Advanced technical indicators including RSI, MACD, and volume analysis
- Support and resistance level identification for Solana tokens
- Whale activity monitoring on Solana blockchain
- Market trend predictions with AI confidence scoring
- Solana DEX liquidity analysis
- Historical candle data analysis for price levels
- Real-time price monitoring with OKX DEX API

### 2. Portfolio Analysis
- Real-time portfolio value tracking across Solana DeFi protocols
- Token allocation visualization with protocol exposure
- Performance metrics (daily, weekly, monthly)
- AI-powered portfolio analysis and insights
- Risk level assessment for Solana DeFi positions
- Yield farming opportunity analysis
- Total balance tracking with OKX DEX API
- Specific token balance monitoring
- Multi-chain portfolio analysis

### 3. AI Analysis Dashboard
- Comprehensive Solana DeFi market overview
- Token-specific technical analysis
- Correlation analysis between Solana ecosystem assets
- Risk assessment and confidence scoring
- Trading opportunity identification
- Protocol health monitoring
- Real-time price data integration
- Historical performance analysis
- Market depth visualization

### 4. Portfolio Analysis Tools
- AI-driven portfolio insights for Solana DeFi
- Risk-adjusted allocation analysis
- Market correlation analysis
- Real-time market insights
- Historical performance tracking
- Yield optimization analysis
- Index price monitoring
- Multi-token analysis
- Chain-specific market insights

## Technical Stack

- **Frontend**: Next.js 14, React, TailwindCSS
- **UI Components**: Shadcn UI
- **State Management**: React Hooks
- **Styling**: TailwindCSS with custom dark theme
- **Icons**: Lucide Icons
- **Blockchain**: Solana Web3.js
- **DeFi Integration**: Serum DEX, Raydium, Orca
- **Data Visualization**: TradingView Charts
- **API Integration**: OKX DEX API

## API Integrations

### 1. OKX DEX APIs

#### Portfolio Management
```bash
# Total Balance API
GET https://web3.okx.com/api/v5/dex/balance/all-token-balances-by-address
Parameters:
- address: Wallet address
- chains: Chain index

# Specific Token Balance API
POST https://web3.okx.com/api/v5/dex/balance/token-balances
Body:
{
    "address": "wallet_address",
    "tokenContractAddresses": [
        {
            "chainIndex": "chain_id",
            "tokenContractAddress": "token_address"
        }
    ]
}
```

#### Market Radar
```bash
# Market Price API
POST https://web3.okx.com/api/v5/dex/market/price
Body:
{
    "tokenContractAddresses": [
        {
            "chainIndex": "chain_id",
            "tokenContractAddress": "token_address"
        }
    ]
}

# Historical Candles API
GET https://web3.okx.com/api/v5/dex/market/historical-candles
Parameters:
- chainIndex: Chain ID
- tokenContractAddress: Token address
```

#### Portfolio Rebalancer
```bash
# Index Price API
POST https://web3.okx.com/api/v5/dex/index/current-price
Body:
[
    {
        "chainIndex": "chain_id",
        "tokenContractAddress": "token_address"
    }
]
```

### 2. Solana Blockchain APIs
- **Solana RPC**
  - Real-time blockchain data
  - Transaction monitoring
  - Account balance tracking

### 3. DeFi Protocol APIs
- **Serum DEX API**
  - Order book data
  - Trading pair information
  - Liquidity pool data

### 4. AI Analysis
- Custom AI analysis module for market sentiment
- Technical indicator calculations
- Risk assessment algorithms
- Portfolio correlation analysis
- DeFi protocol health scoring

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/defi-sentinel.git
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```
Add your API keys to `.env.local`:
```
SOLANA_RPC_URL=your_rpc_url
OKX_API_KEY=your_api_key
OKX_API_SECRET=your_api_secret
OKX_API_PASSPHRASE=your_passphrase
SERUM_DEX_API_KEY=your_api_key
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
defi-sentinel/
├── src/
│   ├── app/
│   │   ├── dashboard/     # Main dashboard
│   │   ├── market/        # Market radar
│   │   ├── portfolio/     # Portfolio management
│   │   └── rebalancer/    # Portfolio rebalancer
│   ├── components/        # Reusable components
│   ├── lib/              # Utility functions
│   │   ├── aianalysis.ts # AI analysis module
│   │   ├── solana.ts     # Solana integration
│   │   ├── defi.ts       # DeFi protocol integration
│   │   └── api/          # API integration
│   │       ├── okx.ts    # OKX DEX API
│   │       └── serum.ts  # Serum DEX API
│   └── styles/           # Global styles
└── public/               # Static assets
```