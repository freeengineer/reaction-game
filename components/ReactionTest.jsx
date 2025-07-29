import React, { useState } from "react";
import "./ReactionTest.css";

function ReactionTest() {
  const [gameStarted, setGameStarted] = useState(false);
  const [boxColor, setBoxColor] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [alert, setAlert] = useState("");
  const [bestScore, setBestScore] = useState(null);

  function startGame() {
    setGameStarted(true);
    setBoxColor("red");

    const delay = Math.floor(Math.random() * 5000) + 1000;

    setTimeout(() => {
      setBoxColor("green");
      setStartTime(Date.now());
    }, delay);
  }

  function handleBoxClick() {
    if (boxColor === "red") {
      setGameStarted(false);
      setBoxColor(null);
      setAlert("You clicked too early !");
    } else {
      const reactionTime = Date.now() - startTime;
      setGameStarted(false);
      setBoxColor(null);
      if (reactionTime <= 333)
        setAlert(`You took ${reactionTime}ms! Wow! You clicked quickly!`);
      //Show this if click is very quickly
      else {
        setAlert(`You took ${reactionTime}ms!`);
      }
      if (!bestScore || reactionTime < bestScore) {
        setBestScore(reactionTime);
      }
    }
  }

  return (
    <div className="box">
      {!gameStarted && (
        <button
          style={{
            borderRadius: "25px",
            padding: "2rem",
            fontSize: "2rem",
          }}
          onClick={startGame}
        >
          Start Game
        </button>
      )}
      {gameStarted && (
        <div
          className="container"
          style={{ width: "250px", height: "250px", backgroundColor: boxColor }}
          onClick={handleBoxClick}
        ></div>
      )}
      {alert && <p style={{ marginTop: "10px", fontSize: "3rem" }}>{alert}</p>}
      {bestScore && (
        <p style={{ fontSize: "1.5rem" }}>🔥 Best Score: {bestScore}ms 🔥</p>
      )}
    </div>
  );
}

export default ReactionTest;
