import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Button } from './components/ui/button';
import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react';

const data = {
  "Republicans say they would be pleased if the supreme court reduced abortion rights?": 43,
  "Republicans say that abortion should never be permitted?": 19,
  "Republicans are willing to open up protected nature areas for economic development?": 16,
  "Republicans say that the US spends too much on alternative energy sources?": 23,
  "Republicans support laws that protect gays and lesbians against job discrimination?": 81,
  "Republicans support requiring background checks for gun purchases at gun shows or private sales?": 82,
  "Republicans say that the government should make it easier to buy a gun?": 11,
  "Republicans say that the US spends too much on the nation's health?": 16,
  "Republicans support making all unauthorized immigrants felons and sending them back?": 24,
  "Republicans support sending back children who were brought to the US illegally and have lived here for 10+ years?": 21,
  "Republicans say that the federal minimum wage should be decreased?": 4,
  "Republicans oppose requiring employers to offer paid leave to parents of new children?": 13,
  "Republicans say that the police officers never use more force than necessary?": 3,
  "Republicans support requiring police officers to wear body cameras while on duty?": 88,
  "Republicans say that blacks face no discrimination at all in the US?": 5,
  "Republicans believe that the legacy of slavery affects the position of black people in society today?": 68,
  "Republicans think that high-income individuals pay the right amount in taxes?": 29,
  "Republicans say that eligible voters are never denied the right to vote?": 23,
  "Democrats believe that climate change has been mostly due to human activity?": 69,
  "Democrats are unwilling to pay much higher prices in order to protect the environment?": 17,
  "Democrats support the death penalty for convicted murderers?": 44,
  "Democrats oppose making free trade agreements with other countries?": 7,
  "Democrats support lowering the eligibility age for Medicare from 65 to 50?": 77,
  "Democrats feel that courts deal too harshly with criminals?": 40,
  "Democrats say that the US spends too much on reducing crime rates?": 8,
  "Democrats believe that the legacy of slavery affects the position of black people in society today?": 97,
  "Democrats think that high-income individuals pay too little in taxes?": 75,
  "Democrats say that transgender people face no discrimination at all in the US?": 7,
  "Democrats support requiring showing a government photo ID when voting?": 48,
  "Democrats say that eligible voters are never denied the right to vote?": 7,
  "Democrats say that the US spends too little on assistance to the poor?": 44,
  "Adults say they would like to bring back dinosaurs?": 12,
  "Adults say that chocolate glazed donuts are their favorite donuts?": 12,
  "Adults in a relationship met their partner online?": 12,
  "Adults have at least one tattoo?": 26,
  "Adults are single?": 31,
  "Adults consider a hotdog to be a sandwich?": 36,
  "Adults believe in ghosts?": 36,
  "Adults like their eggs scrambled?": 37,
  "Adults believe in UFOs?": 39,
  "Dog owners got their dogs from a shelter?": 40,
  "Adults set an alarm but do not snooze when waking up?": 40,
  "Pet owners dress up their pets for Halloween?": 45,
  "Adults say they drink coffee every day?": 62,
  "TV-owning adults watched Neil Armstrong set foot on the moon?": 94,
  "Adults say they have had a teacher who changed their life for the better?": 94,
  "Households are dog owners?": 54,
  "Adults in a relationship say they are satisfied with their relationship?": 94
};

const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};



const HigherLowerGame = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [answerStatus, setAnswerStatus] = useState(null);
  const [showPastQuestions, setShowPastQuestions] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const shuffledQuestions = shuffleArray(Object.entries(data));
    setQuestions(shuffledQuestions);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowPastQuestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleGuess = (guess) => {
    if (currentIndex >= questions.length - 1) return;

    const currentPercentage = questions[currentIndex][1];
    const nextPercentage = questions[currentIndex + 1][1];

    const isCorrect = (guess === 'higher' && nextPercentage > currentPercentage) ||
                      (guess === 'lower' && nextPercentage < currentPercentage);

    setAnswerStatus(isCorrect ? 'correct' : 'incorrect');
    if (isCorrect) {
      setScore(score + 1);
    }

    setShowAnswer(true);
    setTimeout(() => {
      setShowAnswer(false);
      setAnswerStatus(null);
      setCurrentIndex(currentIndex + 1);
      if (currentIndex === questions.length - 2) {
        setGameOver(true);
      }
    }, 2000);
  };

  const restartGame = () => {
    const shuffledQuestions = shuffleArray(Object.entries(data));
    setQuestions(shuffledQuestions);
    setCurrentIndex(0);
    setScore(0);
    setShowAnswer(false);
    setGameOver(false);
    setAnswerStatus(null);
  };

  if (questions.length === 0) return <div>Loading...</div>;

  if (gameOver) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
        <Card className="w-full max-w-md p-6">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Game Over!</h2>
          <p className="text-2xl sm:text-3xl mb-4">Your final score: {score}</p>
          <Button onClick={restartGame} className="w-full text-lg sm:text-xl py-3 sm:py-4">Play Again</Button>
        </Card>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const nextQuestion = questions[currentIndex + 1];

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4 relative">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
          <div className="mb-4 sm:mb-0 text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl font-bold">Higher or Lower?</h1>
            <p className="text-sm sm:text-lg">Guess if the next percentage is higher or lower!</p>
          </div>
          <div className="flex items-center">
            <div className="text-xl sm:text-2xl font-bold mr-4">Score: {score}</div>
            <Button 
              onClick={() => setShowPastQuestions(!showPastQuestions)}
              className="bg-white text-blue-600 text-sm sm:text-base"
            >
              Past Questions
            </Button>
          </div>
        </div>
        {showPastQuestions && (
          <div ref={menuRef} className="absolute right-4 top-full mt-2 bg-white text-black p-4 rounded-md shadow-lg max-h-60 sm:max-h-96 overflow-y-auto w-64 sm:w-80">
            <h3 className="font-bold mb-2">Past Questions:</h3>
            {questions.slice(0, currentIndex).map((question, index) => (
              <div key={index} className="mb-2 text-sm">
                <p>{question[0]}</p>
                <p className="font-bold">{question[1]}%</p>
              </div>
            ))}
          </div>
        )}
      </header>
      
      <div className="flex-1 flex flex-col sm:flex-row">
        <Card className="flex-1 flex items-center justify-center m-2">
          <CardContent className="text-center p-4 sm:p-6">
            <h3 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-4">Percentage of</h3>
            <p className="text-lg sm:text-3xl mb-4 sm:mb-6">{currentQuestion[0]}</p>
            <p className="text-4xl sm:text-6xl font-bold">{currentQuestion[1]}%</p>
          </CardContent>
        </Card>
        
        <Card className={`flex-1 flex items-center justify-center m-2 ${answerStatus ? (answerStatus === 'correct' ? 'bg-green-100' : 'bg-red-100') : ''}`}>
          <CardContent className="text-center p-4 sm:p-6">
            <h3 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-4">Is the percentage of</h3>
            <p className="text-lg sm:text-3xl mb-4 sm:mb-6">{nextQuestion[0]}</p>
            {showAnswer ? (
              <p className="text-4xl sm:text-6xl font-bold">{nextQuestion[1]}%</p>
            ) : (
              <div className="flex justify-center space-x-2 sm:space-x-4">
                <Button
                  onClick={() => handleGuess('higher')}
                  disabled={showAnswer}
                  className="text-lg sm:text-2xl py-2 px-4 sm:py-4 sm:px-8"
                >
                  <ArrowUpIcon className="mr-1 sm:mr-2 h-6 w-6 sm:h-8 sm:w-8" />
                  Higher
                </Button>
                <Button
                  onClick={() => handleGuess('lower')}
                  disabled={showAnswer}
                  className="text-lg sm:text-2xl py-2 px-4 sm:py-4 sm:px-8"
                >
                  <ArrowDownIcon className="mr-1 sm:mr-2 h-6 w-6 sm:h-8 sm:w-8" />
                  Lower
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HigherLowerGame;