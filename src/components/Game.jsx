import React, { useState } from "react";
import axios from "axios";
import "../css/game.css";
import Scoreboard from "./Scoreboard";

function CoinFlip() {
  const [side, setSide] = useState(null);
  const [flipCount, setFlipCount] = useState(0);
  const [score, setScore] = useState(0);
  const [playerName, setPlayerName] = useState("");
  const [message, setMessage] = useState("");

  const resetGame = () => {
    setSide(null);
    setFlipCount(0);
    setScore(0);
  };

  const flipCoin = () => {
    const result = Math.random() < 0.99 ? "Heads" : "Tails";
    setSide(result);
    setFlipCount(flipCount + 1);

    if (result === "Heads") {
      setScore(score + 1);
    } else {
      resetGame();
    }
  };

  const saveScore = async () => {
    if (!playerName) {
      setMessage("Please enter your name.");
      return;
    }

    try {
      const response = await axios.post(`/addUser`, {
        username: playerName,
        score: score,
      });

      if (response.status === 200) {
        setMessage("Score saved successfully!");
        resetGame(); 
        window.location.reload();
      } else {
        setMessage("Failed to save score.");
      }
    } catch (error) {
      console.error("Error saving score:", error);
      setMessage("Error saving score.");
    }
  };

  return (
    <div className="coin-flip-game">
      <h1>Coin Flip Game</h1>

      <input
        type="text"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
        placeholder="Enter your name"
      />

      {playerName && <h2>Player: {playerName}</h2>}

      <div className="result">
        {side ? <h2>Result: {side}</h2> : <h2>Click to Flip!</h2>}
      </div>

      <button onClick={flipCoin} className="flip-button">
        Flip Coin
      </button>

      <div className="flip-info">
        <h3>HighScore: {score}</h3>

        <button onClick={saveScore} className="save-button">
          Save Score
        </button>

        {message && <p>{message}</p>}

        <Scoreboard />
      </div>
    </div>
  );
}

export default CoinFlip;
