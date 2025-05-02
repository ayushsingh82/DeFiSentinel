'use client'
import React, { useState, useEffect } from 'react'
import quizData from './quiz.json' assert { type: 'json' }

interface Question {
  question: string
  options: string[]
  correctAnswer: string
}

const QuizPage = () => {
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [isAnswered, setIsAnswered] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)

  // Initialize quiz with 5 random questions
  useEffect(() => {
    const shuffledQuestions = [...quizData.questions]
      .sort(() => Math.random() - 0.5)
      .slice(0, 5)
    setQuestions(shuffledQuestions)
  }, [])

  const handleAnswerClick = (answer: string) => {
    if (isAnswered) return
    
    setSelectedAnswer(answer)
    setIsAnswered(true)
    
    if (answer === questions[currentQuestionIndex].correctAnswer) {
      setScore(prev => prev + 10)
    }

    // Move to next question after 1.5 seconds
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1)
        setIsAnswered(false)
        setSelectedAnswer(null)
      } else {
        setShowResult(true)
      }
    }, 1500)
  }

  const restartQuiz = () => {
    const shuffledQuestions = [...quizData.questions]
      .sort(() => Math.random() - 0.5)
      .slice(0, 5)
    setQuestions(shuffledQuestions)
    setCurrentQuestionIndex(0)
    setScore(0)
    setShowResult(false)
    setIsAnswered(false)
    setSelectedAnswer(null)
  }

  if (questions.length === 0) {
    return <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-2xl">Loading...</div>
    </div>
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="bg-pink-50 py-4">
        <div className="max-w-4xl mx-auto px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-3 text-gray-900">
              Polkadot <span className="text-pink-500">Quiz</span>
            </h1>
            
            {/* Quiz Stats */}
            <div className="bg-gray-800/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-pink-600">{score}</p>
                  <p className="text-xs text-gray-300 mt-1">Current Score</p>
                </div>
                <div className="text-center border-x border-gray-600">
                  <p className="text-2xl font-bold text-pink-600">{currentQuestionIndex + 1}/5</p>
                  <p className="text-xs text-gray-300 mt-1">Question</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-pink-600">50</p>
                  <p className="text-xs text-gray-300 mt-1">Max Score</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quiz Area */}
      <div className="max-w-3xl mx-auto px-4 py-8">
        {!showResult ? (
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-6 text-gray-800">
              {questions[currentQuestionIndex].question}
            </h2>
            
            <div className="space-y-3">
              {questions[currentQuestionIndex].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerClick(option)}
                  disabled={isAnswered}
                  className={`w-full text-left p-4 rounded-xl transition-all duration-200 font-medium text-lg
                    ${isAnswered 
                      ? option === questions[currentQuestionIndex].correctAnswer
                        ? 'bg-green-100 border-2 border-green-500 text-green-700'
                        : option === selectedAnswer
                          ? 'bg-red-100 border-2 border-red-500 text-red-700'
                          : 'bg-gray-100 border-2 border-gray-200 text-gray-700'
                      : 'bg-gray-100 border-2 border-gray-200 text-gray-700 hover:bg-gray-200 hover:border-gray-300'
                    }`}
                >
                  <span className="inline-block w-8 h-8 bg-white rounded-full mr-3 text-center leading-8 border border-current">
                    {String.fromCharCode(65 + index)}
                  </span>
                  {option}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-gray-800/90 backdrop-blur-sm rounded-2xl p-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Quiz Complete!</h2>
            <p className="text-xl text-pink-400 mb-2">Your Score: {score}</p>
            <p className="text-gray-300 mb-6">You got {score/10} questions correct out of 5</p>
            <button
              onClick={restartQuiz}
              className="bg-pink-500 text-white px-8 py-3 rounded-xl font-semibold 
                       transition-transform duration-300 hover:transform hover:translate-y-[-4px]"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default QuizPage