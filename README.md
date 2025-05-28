# DeFiSentinel

A Next.js-based DeFi trading platform focused on Solana ecosystem, providing AI-powered market analysis, portfolio management, and real-time trading insights. The platform specializes in Solana-based tokens and DeFi protocols, offering advanced trading tools and market intelligence.

## Features

### 1. AI Market Radar
- Real-time market sentiment analysis for Solana ecosystem tokens (SOL, RAY, SRM, etc.)
- Advanced technical indicators including RSI, MACD, and volume analysis
- Support and resistance level identification for Solana tokens
- Whale activity monitoring on Solana blockchain
- Market trend predictions with AI confidence scoring
- Solana DEX liquidity analysis

### 2. Portfolio Management
- Real-time portfolio value tracking across Solana DeFi protocols
- Token allocation visualization with protocol exposure
- Performance metrics (daily, weekly, monthly)
- AI-powered portfolio rebalancing suggestions
- Risk level assessment for Solana DeFi positions
- Yield farming opportunity tracking

### 3. AI Analysis Dashboard
- Comprehensive Solana DeFi market overview
- Token-specific technical analysis
- Correlation analysis between Solana ecosystem assets
- Risk assessment and confidence scoring
- Trading opportunity identification
- Protocol health monitoring

### 4. DeFi Portfolio Rebalancer
- AI-driven portfolio optimization for Solana DeFi
- Risk-adjusted allocation suggestions
- Market correlation analysis
- Real-time rebalancing recommendations
- Historical performance tracking
- Yield optimization strategies

## Technical Stack

- **Frontend**: Next.js 14, React, TailwindCSS
- **UI Components**: Shadcn UI
- **State Management**: React Hooks
- **Styling**: TailwindCSS with custom dark theme
- **Icons**: Lucide Icons
- **Blockchain**: Solana Web3.js
- **DeFi Integration**: Serum DEX, Raydium, Orca

## API Integrations

### 1. Market Data APIs
- **OKX API**
  - Endpoint: `https://web3.okx.com/api/v5/dex/market/price`
  - Used for real-time price data
  - Solana token contract addresses

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
│   │   └── defi.ts       # DeFi protocol integration
│   └── styles/           # Global styles
└── public/               # Static assets
```

## AI Analysis Features

### Market Sentiment Analysis
- Real-time sentiment scoring for Solana tokens
- Technical indicator analysis
- Volume and price action analysis
- Support/resistance level identification
- DeFi protocol health monitoring

### Portfolio Analysis
- Risk level assessment for DeFi positions
- Correlation analysis between Solana assets
- Performance prediction
- Rebalancing recommendations
- Yield farming optimization

### Technical Indicators
- RSI (Relative Strength Index)
- MACD (Moving Average Convergence Divergence)
- Volume analysis
- Trend identification
- Support/Resistance levels
- Liquidity depth analysis

## DeFi Features

### Protocol Integration
- Serum DEX trading
- Raydium liquidity pools
- Orca swap integration
- Yield farming tracking
- Staking position management

### Risk Management
- Impermanent loss monitoring
- Protocol risk assessment
- Smart contract security scoring
- Liquidity pool health tracking
- APY/APR comparison

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Next.js team for the amazing framework
- Solana Foundation for blockchain infrastructure
- OKX for providing market data APIs
- Serum DEX for trading infrastructure
- Shadcn UI for the beautiful components
- Lucide for the icon set
