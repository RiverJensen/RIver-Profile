import React, { useState } from 'react';
import axios from 'axios'; // Import axios
import '../css/game.css'; // Import external CSS file

function CoinFlip() {
  const [side, setSide] = useState(null); // Store result (Heads/Tails)
  const [flipCount, setFlipCount] = useState(0); // Track number of flips
  const [score, setScore] = useState(0); // Track player's score
  const [highScore, setHighScore] = useState(0); // Track high score
  const [playerName, setPlayerName] = useState(''); // Track player's name
  const [message, setMessage] = useState(''); // Display success or error messages

  // Function to reset the game
  const resetGame = () => {
    setSide(null); // Reset the result
    setFlipCount(0); // Reset the flip count
    setScore(0); // Reset the score
  };

  // Function to flip the coin
  const flipCoin = () => {
    const result = Math.random() < 0.5 ? 'Heads' : 'Tails'; // Randomize heads or tails
    setSide(result);
    setFlipCount(flipCount + 1); // Increase flip count

    if (result === 'Heads') {
      setScore(score + 1); // Gain 1 point for Heads
    } else {
      // When result is "Tails"
      if (score > highScore) {
        setHighScore(score); // Save the high score if current score is higher
      }
      resetGame(); // Reset the game after hitting Tails
    }
  };

  // Function to save the score and name to the backend using Axios
  const saveScore = async () => {
    if (!playerName) {
      setMessage('Please enter your name.');
      return;
    }

    try {
      const addUser = await axios.put(`/addUser`, {
        name: playerName,
        score: score,
      });

      if (response.status === 200) {
        setMessage('Score saved successfully!');
      } else {
        setMessage('Failed to save score.');
      }
    } catch (error) {
      console.error('Error saving score:', error);
      setMessage('Error saving score.');
    }
  };

  return (
    <div className="coin-flip-game">
      <h1>Coin Flip Game</h1>
      
      {/* Player Name Input */}
      <input
        type="text"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)} // Update the player name state
        placeholder="Enter your name"
      />
      
      {/* Display Player Name */}
      {playerName && <h2>Player: {playerName}</h2>}

      <div className="result">
        {side ? <h2>Result: {side}</h2> : <h2>Click to Flip!</h2>}
      </div>

      <button onClick={flipCoin} className="flip-button">
        Flip Coin
      </button>

      <div className="flip-info">
        <h3>Total Flips: {flipCount}</h3>
        <h3>Score: {score}</h3>
        <h3>High Score: {highScore}</h3>

        {/* Save Score Button */}
        <button onClick={saveScore} className="save-button">
          Save Score
        </button>

        {/* Message for success or error */}
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}

export default CoinFlip;
