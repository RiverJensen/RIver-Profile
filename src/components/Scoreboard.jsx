import React, { useEffect, useState } from "react";
import axios from "axios";  // Import axios
import '../css/game.css';  // Link to your CSS file

function Scoreboard() {
  const [usernames, setUsernames] = useState([]);
  const [scores, setScores] = useState([]);

  const getUserInfo = async () => {
    try {
      const res = await axios.get("/getUserInfo");  
      if (res.data.users && res.data.users.length > 0) {
        
        const sortedUsers = res.data.users.sort((a, b) => b.score - a.score);  // Sort users by score
        
       
        setUsernames(sortedUsers.map(user => user.username));  // {river: 10, john: 5, jane: 3}
        setScores(sortedUsers.map(user => user.score));  
        console.log("No users found");
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  useEffect(() => {
    getUserInfo();  
  }, []);

  return (
    <div className="scoreboard-container">
      <h2 className="scoreboard-title">High Score Ranking</h2>
      <div className="scoreboard-list">
        {usernames.map((username, index) => (
          <div className="scoreboard-item" key={index}>
            <div className="username-box">{username}</div>
            <div className="score-box">{scores[index]}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Scoreboard;
