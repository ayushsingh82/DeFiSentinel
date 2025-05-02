import React from 'react'
import Link from 'next/link'

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="bg-pink-50 py-16">
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4 text-gray-900">
              Welcome to <span className="text-pink-500">Polkadot</span> Learning
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Embark on an interactive journey to master Polkadot. Play games, take quizzes, and earn rewards while learning.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-8">
          <div className="bg-gray-800/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
            <h2 className="text-2xl font-semibold mb-6 text-white text-center">Your Progress</h2>
            <div className="grid grid-cols-3 gap-8">
              <div className="text-center">
                <p className="text-4xl font-bold text-pink-600">0</p>
                <p className="text-sm text-gray-300 mt-2">Total Points</p>
              </div>
              <div className="text-center border-x border-gray-600">
                <p className="text-4xl font-bold text-pink-600">0</p>
                <p className="text-sm text-gray-300 mt-2">Quizzes Completed</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-pink-600">0</p>
                <p className="text-sm text-gray-300 mt-2">Games Played</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Activities Section */}
      <div className="py-12 bg-pink-50">
        <div className="max-w-6xl mx-auto px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Quiz Card */}
            <Link href="/quiz" className="group">
              <div className="bg-white rounded-2xl p-8 shadow-lg transition-all duration-300 hover:shadow-2xl">
                <div className="mb-6">
                  <span className="inline-block p-3 rounded-full bg-pink-100 text-pink-500 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </span>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Take a Quiz</h3>
                  <p className="text-gray-600">
                    Test your knowledge about Polkadot and earn points. Complete quizzes to unlock new levels!
                  </p>
                </div>
                <button className="w-full bg-black text-white py-3 rounded-xl font-semibold 
                                 transition-transform duration-300 group-hover:transform group-hover:translate-y-[-4px]">
                  Start Quiz
                </button>
              </div>
            </Link>

            {/* Game Card */}
            <Link href="/game" className="group">
              <div className="bg-white rounded-2xl p-8 shadow-lg transition-all duration-300 hover:shadow-2xl">
                <div className="mb-6">
                  <span className="inline-block p-3 rounded-full bg-pink-100 text-pink-500 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Play Game</h3>
                  <p className="text-gray-600">
                    Learn while having fun! Play interactive games and earn points for each achievement.
                  </p>
                </div>
                <button className="w-full bg-black text-white py-3 rounded-xl font-semibold 
                                 transition-transform duration-300 group-hover:transform group-hover:translate-y-[-4px]">
                  Play Now
                </button>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage