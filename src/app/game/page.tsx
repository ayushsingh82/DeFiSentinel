'use client'
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const CARD_SUITS = ['♠', '♣', '♥', '♦']
const CARD_VALUES = ['A', 'K', 'Q', 'J']

interface Card {
  id: string
  value: string
  suit: string
  matched: boolean
  isRed: boolean
}

const GamePage = () => {
  const [cards, setCards] = useState<Card[]>([])
  const [choiceOne, setChoiceOne] = useState<Card | null>(null)
  const [choiceTwo, setChoiceTwo] = useState<Card | null>(null)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(20)
  const [gameActive, setGameActive] = useState(false)
  const [bestScore, setBestScore] = useState(0)

  const createDeck = () => {
    const deck = []
    CARD_SUITS.forEach(suit => {
      CARD_VALUES.forEach(value => {
        deck.push({
          id: `${value}-${suit}`,
          value: value,
          suit: suit,
          matched: false,
          isRed: suit === '♥' || suit === '♦'
        })
      })
    })
    
    const selectedCards = deck
      .sort(() => Math.random() - 0.5)
      .slice(0, 6)
    
    const cardPairs = [...selectedCards, ...selectedCards]
      .sort(() => Math.random() - 0.5)
      .map((card, index) => ({
        ...card,
        id: `${card.id}-${index}`
      }))
    
    return cardPairs
  }

  const startGame = () => {
    const shuffledCards = createDeck()
    setCards(shuffledCards)
    setScore(0)
    setTimeLeft(20)
    setGameActive(true)
    setChoiceOne(null)
    setChoiceTwo(null)
  }

  const handleChoice = (card) => {
    if (!gameActive) return
    if (choiceOne && choiceTwo) return
    if (choiceOne?.id === card.id) return
    if (card.matched) return

    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      if (choiceOne.value === choiceTwo.value) {
        setScore(prev => prev + 10)
        
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.id === choiceOne.id || card.id === choiceTwo.id) {
              return { ...card, matched: true }
            }
            return card
          })
        })
      }
      setTimeout(() => {
        setChoiceOne(null)
        setChoiceTwo(null)
      }, 800)
    }
  }, [choiceOne, choiceTwo])

  useEffect(() => {
    let timer
    if (gameActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1)
      }, 1000)
    } else if (timeLeft === 0 && gameActive) {
      setGameActive(false)
      setBestScore(prev => Math.max(prev, score))
    }
    return () => clearInterval(timer)
  }, [gameActive, timeLeft])

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section - Made more compact */}
      <div className="bg-pink-50 py-4">
        <div className="max-w-4xl mx-auto px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-3 text-gray-900">
              Memory <span className="text-pink-500">Match</span>
            </h1>
            
            {/* Game Stats - Made more compact */}
            <div className="bg-gray-800/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-pink-600">{score}</p>
                  <p className="text-xs text-gray-300 mt-1">Current Score</p>
                </div>
                <div className="text-center border-x border-gray-600">
                  <p className="text-2xl font-bold text-pink-600">{timeLeft}</p>
                  <p className="text-xs text-gray-300 mt-1">Time Left</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-pink-600">{bestScore}</p>
                  <p className="text-xs text-gray-300 mt-1">Best Score</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Game Area - Adjusted spacing */}
      <div className="max-w-3xl mx-auto px-4 py-4">
        {!gameActive && (
          <button
            onClick={startGame}
            className="w-full bg-black text-white py-2 rounded-xl font-semibold 
                     transition-transform duration-300 hover:transform hover:translate-y-[-4px] mb-4"
          >
            Start Game
          </button>
        )}

        {/* Made grid more compact */}
        <div className="grid grid-cols-4 gap-2 max-w-2xl mx-auto">
          <AnimatePresence>
            {cards.map(card => (
              <motion.div
                key={card.id}
                className="aspect-[3/4] cursor-pointer"
                onClick={() => handleChoice(card)}
                initial={{ rotateY: 0 }}
                animate={{ 
                  rotateY: (choiceOne?.id === card.id || choiceTwo?.id === card.id || card.matched) ? -180 : 0
                }}
                transition={{ duration: 0.6 }}
              >
                <div className={`relative w-full h-full transition-transform duration-500 transform-gpu 
                                ${card.isRed ? 'text-pink-500' : 'text-gray-900'}`}>
                  {/* Front of card */}
                  <div className={`absolute inset-0 bg-white rounded-lg border-2 
                                 ${card.matched ? 'border-pink-500' : 'border-gray-200'} 
                                 shadow-lg flex items-center justify-center text-2xl
                                 ${(choiceOne?.id === card.id || choiceTwo?.id === card.id || card.matched) ? 'opacity-0' : 'opacity-100'}`}>
                    🎴
                  </div>
                  {/* Back of card */}
                  <div className={`absolute inset-0 rounded-lg border-2 border-gray-200 
                                 shadow-lg flex flex-col items-center justify-center p-2
                                 ${card.matched ? 'bg-pink-200' : 'bg-white'}
                                 ${(choiceOne?.id === card.id || choiceTwo?.id === card.id || card.matched) ? 'opacity-100' : 'opacity-0'}`}
                       style={{ transform: 'rotateY(180deg)' }}>
                    <div className="text-4xl font-bold">{card.value}</div>
                    <div className="text-4xl">{card.suit}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Game Over State */}
        {!gameActive && timeLeft === 0 && (
          <div className="mt-4 bg-gray-800/90 backdrop-blur-sm rounded-2xl p-6 text-center">
            <h2 className="text-2xl font-bold text-white mb-3">Game Over!</h2>
            <p className="text-lg text-pink-600 mb-4">Final Score: {score}</p>
            <button
              onClick={startGame}
              className="bg-pink-500 text-white px-6 py-2 rounded-xl font-semibold 
                       transition-transform duration-300 hover:transform hover:translate-y-[-4px]"
            >
              Play Again
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default GamePage