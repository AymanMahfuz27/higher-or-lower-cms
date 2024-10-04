// const data = {
//   "Republicans who say they would be pleased if the supreme court reduced abortion rights": 43,
//   "Republicans who say that abortion should never be permitted": 19,
//   "Republicans who are willing to open up protected nature areas for economic development": 16,
//   "Republicans who say that the US spends too much on alternative energy sources": 23,
//   "Republicans who support laws that protect gays and lesbians against job discrimination": 81,
//   "Republicans who support requiring background checks for gun purchases at gun shows or private sales": 82,
//   "Republicans who say that the government should make it easier to buy a gun": 11,
//   "Republicans who say that the US spends too much on the nation's health": 16,
//   "Republicans who support making all unauthorized immigrants felons and sending them back": 24,
//   "Republicans who support sending back children who were brought to the US illegally and have lived here for 10+ years": 21,
//   "Republicans who say that the federal minimum wage should be decreased": 4,
//   "Republicans who oppose requiring employers to offer paid leave to parents of new children": 13,
//   "Republicans who say that the police officers never use more force than necessary": 3,
//   "Republicans who support requiring police officers to wear body cameras while on duty": 88,
//   "Republicans who say that blacks face no discrimination at all in the US": 5,
//   "Republicans who believe that the legacy of slavery affects the position of black people in society today": 68,
//   "Republicans who think that high-income individuals pay the right amount in taxes": 29,
//   "Republicans who say that eligible voters are never denied the right to vote": 23,
//   "Democrats who believe that climate change has been mostly due to human activity": 69,
//   "Democrats who are unwilling to pay much higher prices in order to protect the environment": 17,
//   "Democrats who support the death penalty for convicted murderers": 44,
//   "Democrats who oppose making free trade agreements with other countries": 7,
//   "Democrats who support lowering the eligibility age for Medicare from 65 to 50": 77,
//   "Democrats who feel that courts deal too harshly with criminals": 40,
//   "Democrats who say that the US spends too much on reducing crime rates": 8,
//   "Democrats who believe that the legacy of slavery affects the position of black people in society today": 97,
//   "Democrats who think that high-income individuals pay too little in taxes": 75,
//   "Democrats who say that transgender people face no discrimination at all in the US": 7,
//   "Democrats who support requiring showing a government photo ID when voting": 48,
//   "Democrats who say that eligible voters are never denied the right to vote": 7,
//   "Democrats who say that the US spends too little on assistance to the poor": 44,
//   "Adults who say they would like to bring back dinosaurs": 12,
//   "Adults who say that chocolate glazed donuts are their favorite donuts": 12,
//   "Adults who in a relationship met their partner online": 12,
//   "Adults who have at least one tattoo": 26,
//   "Adults who are single": 31,
//   "Adults who consider a hotdog to be a sandwich": 36,
//   "Adults who believe in ghosts": 36,
//   "Adults who like their eggs scrambled": 37,
//   "Adults who believe in UFOs": 39,
//   "Dog owners who got their dogs from a shelter": 40,
//   "Adults who set an alarm but do not snooze when waking up": 40,
//   "Pet owners who dress up their pets for Halloween": 45,
//   "Adults who say they drink coffee every day": 62,
//   "TV-owning adults who watched Neil Armstrong set foot on the moon": 94,
//   "Adults who say they have had a teacher who changed their life for the better": 94,
//   "Households who are dog owners": 54,
//   "Adults in a relationship who say they are satisfied with their relationship": 94,
// };

import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { ArrowUpIcon, ArrowDownIcon, HeartIcon } from "lucide-react";

const ashwinOrderData = {
  "Adults who believe in UFOs": 39,
  "Democrats who support the death penalty for convicted murderers": 44,
  "Adults who say they would like to bring back dinosaurs": 12,
  "Adults who say they drink coffee every day": 62,
  "Households are dog owners": 54,
  "Republicans who support requiring police officers to wear body cameras while on duty": 88,
  "Adults who are single": 31,
  "Adults who have at least one tattoo": 26,
  "Adults who are single": 31,
  "Democrats who support requiring showing a government photo ID when voting": 48,
  "Adults who wear jeans everyday": 39,
  "Adults who consume dairy everyday": 79,
  "Adults who say they drink coffee every day": 62,
  "Households with cars": 92,
  "Republicans who support requiring background checks for gun purchases at gun shows or private sales": 82,
  "Adults who say they would like to bring back dinosaurs": 12,
};

const HigherLowerGame = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [showAnswer, setShowAnswer] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [answerStatus, setAnswerStatus] = useState(null);
  const [showPastQuestions, setShowPastQuestions] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [userActions, setUserActions] = useState([]);
  const [gameStartTime, setGameStartTime] = useState(new Date().toISOString());
  const [currentQuestionAction, setCurrentQuestionAction] = useState(null);
  const [turn, setTurn] = useState(1);

  useEffect(() => {
    resetGame();
  }, []);

  const menuRef = useRef(null);

  useEffect(() => {
    if (questions.length > 0 && currentIndex < questions.length) {
      const actionData = {
        turn: turn,
        currentQuestionDisplayed: questions[currentIndex][0],
        currentQuestionDisplayTime: new Date().toISOString(),
        currentPercentage: questions[currentIndex][1],
        nextQuestion: questions[currentIndex + 1]?.[0],
        nextPercentage: questions[currentIndex + 1]?.[1],
      };
      setCurrentQuestionAction(actionData);
    }
  }, [currentIndex, questions]);

  const resetGame = () => {
    let newQuestions = Object.entries(ashwinOrderData);
    setQuestions(newQuestions);
    setCurrentIndex(0);
    setScore(0);
    setLives(3);
    setShowAnswer(false);
    setGameOver(false);
    setAnswerStatus(null);
    setUserActions([]);
    setGameStartTime(new Date().toISOString());
    setCurrentQuestionAction(null);
    setTurn(1);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowPastQuestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleGuess = (guess) => {
    if (currentIndex >= questions.length - 1 || gameOver) return;

    const currentPercentage = questions[currentIndex][1];
    const nextPercentage = questions[currentIndex + 1][1];

    // Determine the correct answer
    const correctAnswer =
      nextPercentage > currentPercentage ? "higher" : "lower";

    // Determine if the user's guess is correct
    const isCorrect = guess === correctAnswer;

    // Calculate current lives left after this turn
    const currentLivesLeft = isCorrect ? lives : lives - 1;

    // Create the updated action object
    const updatedAction = {
      ...currentQuestionAction,
      userGuess: guess,
      correctAnswer: correctAnswer,
      guessTime: new Date().toISOString(),
      currentLivesLeft: currentLivesLeft,
    };

    // Add the completed action to userActions
    setUserActions((prevActions) => [...prevActions, updatedAction]);

    // Reset currentQuestionAction for the next question
    setCurrentQuestionAction(null);

    // Increment turn counter
    setTurn((prevTurn) => prevTurn + 1);

    // Proceed with existing game logic
    setAnswerStatus(isCorrect ? "correct" : "incorrect");

    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    } else {
      setLives((prevLives) => {
        const newLives = prevLives - 1;
        if (newLives <= 0) {
          setGameOver(true);
        }
        return newLives;
      });
    }

    setShowAnswer(true);
    setTimeout(() => {
      setShowAnswer(false);
      setAnswerStatus(null);
      if (!gameOver && currentIndex < questions.length - 2) {
        setCurrentIndex((prevIndex) => prevIndex + 1);
      } else {
        setGameOver(true);
      }
    }, 2000);
  };

  const restartGame = async () => {
    if (!username || !email) {
      alert('Please enter your username and email.');
      return;
    }
  
    const data = {
      gameType: 'slider_guess',  
      username,
      email,
      finalScore: score,
      actions: userActions,
      gameStartTime: gameStartTime,
      gameEndTime: new Date().toISOString(),
    };
  
    try {
      await fetch('http://localhost:5000/log_game/higher_or_lower', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.error('Error logging game data:', error);
    }
  
    resetGame();
  };
  

  if (questions.length === 0) return <div>Loading...</div>;

  if (gameOver) {
    let message;
    if (score < 5) {
      message = "Better luck next time!";
    } else if (score < 10) {
      message = "Good job!";
    } else {
      message = "Excellent work!";
    }

    return (
      <div className="flex items-center justify-center min-h-screen bg-blue-100 p-4">
        <Card className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-blue-600">
            Game Over!
          </h2>
          <p className="text-2xl sm:text-3xl mb-4 text-gray-700">{message}</p>
          <p className="text-2xl sm:text-3xl mb-4 text-blue-600 font-bold">
            Your final score: {score}
          </p>
          <div className="mb-4">
            <h3 className="font-bold mb-2 text-gray-700">Cards Played:</h3>
            <div className="flex flex-col space-y-4 overflow-y-auto pb-4 max-h-80">
              {questions.slice(0, currentIndex + 1).map((question, index) => (
                <Card key={index} className="w-full bg-blue-50 shadow">
                  <CardContent className="p-4">
                    <p className="text-sm text-gray-600">{question[0]}</p>
                    <p className="font-bold text-blue-600">{question[1]}%</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          {/* Username and Email Fields */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <Button
            onClick={restartGame}
            className="w-full text-lg sm:text-xl py-3 sm:py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition duration-200"
            disabled={!username || !email} // Disable button if username or email is empty
          >
            Submit and Play Again
          </Button>
        </Card>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const nextQuestion = questions[currentIndex + 1];

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
          <div className="mb-4 sm:mb-0 text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl font-bold">Higher or Lower?</h1>
            <p className="text-sm sm:text-base">
              Guess if the next percentage is higher or lower!
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              onClick={() => setShowPastQuestions(!showPastQuestions)}
              className="bg-white text-blue-600 text-xs sm:text-sm"
            >
              Past Cards
            </Button>
          </div>
        </div>

        {showPastQuestions && (
          <div
            ref={menuRef}
            className="absolute right-4 top-full mt-2 bg-white text-black p-4 rounded-md shadow-lg max-h-60 sm:max-h-96 overflow-y-auto w-64 sm:w-80 z-10"
          >
            <h3 className="font-bold mb-2">Past Cards:</h3>
            {questions.slice(0, currentIndex).map((question, index) => (
              <div key={index} className="mb-2 text-sm">
                <p>{question[0]}</p>
                <p className="font-bold">{question[1]}%</p>
              </div>
            ))}
          </div>
        )}
      </header>

      <div className="flex-1 flex flex-col sm:flex-row relative p-2 sm:p-4">
        {/* Score and Lives */}
        <div className="absolute top-0 left-0 right-0 flex justify-between items-center p-2 sm:p-4 z-10">
          <div className="bg-blue-500 text-white rounded-md px-2 py-1 text-sm sm:text-xl font-bold">
            Correct Streak: {score}
          </div>
          <div className="flex space-x-1 bg-blue-500 text-white rounded-md px-2 py-1 text-sm sm:text-xl font-bold">
            {[...Array(3)].map((_, i) => (
              <HeartIcon
                key={i}
                className="h-5 w-5 sm:h-6 sm:w-6"
                stroke={i < lives ? "red" : "gray"}
                fill={i < lives ? "red" : "none"}
              />
            ))}
          </div>
        </div>

        {/* Cards and VS icon */}
        <div className="flex-1 flex flex-col sm:flex-row items-stretch justify-center mt-4 relative">
          <Card className="flex-1 flex items-center justify-center rounded-r-none">
            <CardContent className="text-center p-2 sm:p-4 w-full min-w-[300px] max-w-sm mx-auto">
              {" "}
              <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-1 sm:mb-2">
                Percentage of
              </h3>
              <p className="text-sm sm:text-base lg:text-lg mb-1 sm:mb-2 h-16 sm:h-20">
                {currentQuestion[0]}
              </p>
              <p className="text-3xl sm:text-4xl lg:text-5xl font-bold">
                {currentQuestion[1]}%
              </p>
            </CardContent>
          </Card>

          <Card
            className={`flex-1 flex items-center justify-center rounded-l-none ${
              answerStatus
                ? answerStatus === "correct"
                  ? "bg-green-100"
                  : "bg-red-100"
                : ""
            }`}
          >
            <CardContent className="text-center p-2 sm:p-4 w-full min-w-[300px] max-w-sm mx-auto">
              {" "}
              <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-1 sm:mb-2">
                Percentage of
              </h3>
              <p className="text-sm sm:text-base lg:text-lg mb-1 sm:mb-2 h-16 sm:h-20">
                {nextQuestion[0]}
              </p>
              {showAnswer ? (
                <p className="text-3xl sm:text-4xl lg:text-5xl font-bold">
                  {nextQuestion[1]}%
                </p>
              ) : (
                <div className="flex justify-center space-x-4">
                  <Button
                    onClick={() => handleGuess("higher")}
                    disabled={showAnswer}
                    className="text-sm sm:text-base lg:text-lg py-2 px-4 border-2 border-green-500 bg-green-100 hover:bg-green-200 text-green-700"
                  >
                    <ArrowUpIcon className="mr-1 h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
                    Higher
                  </Button>
                  <Button
                    onClick={() => handleGuess("lower")}
                    disabled={showAnswer}
                    className="text-sm sm:text-base lg:text-lg py-2 px-4 border-2 border-red-500 bg-red-100 hover:bg-red-200 text-red-700"
                  >
                    <ArrowDownIcon className="mr-1 h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
                    Lower
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* VS icon overlay */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="flex items-center justify-center rounded-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white h-16 w-16 sm:h-20 sm:w-20 lg:h-24 lg:w-24">
              <span className="text-xl sm:text-2xl lg:text-3xl font-bold">
                VS
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HigherLowerGame;
