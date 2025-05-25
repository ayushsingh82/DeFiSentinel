import Link from 'next/link'

const Navbar = () => (
  <nav className="bg-black border-b border-gray-800 sticky top-0 z-50">
    <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
      <Link href="/" className="text-2xl font-bold text-green-500">DeFiSentinel</Link>
      <div className="flex gap-6">
        <Link href="/dashboard" className="text-gray-300 hover:text-green-500 font-medium transition">Dashboard</Link>
        <Link href="/portfolio" className="text-gray-300 hover:text-green-500 font-medium transition">Portfolio</Link>
        <Link href="/market" className="text-gray-300 hover:text-green-500 font-medium transition">Market Radar</Link>
        <Link href="/rebalancer" className="text-gray-300 hover:text-green-500 font-medium transition">AI Rebalancer</Link>
      </div>
    </div>
  </nav>
)

export default Navbar 