import React, { useEffect, useState } from "react";
import axios from 'axios';  // Import axios

function Scoreboard() {
  const [user, setUser] = useState([]);
  const [usernames, setUsernames] = useState([]);
  const [scores, setScores] = useState([]);

  const getUserInfo = async () => {
    try {
      const res = await axios.get("/getUserInfo");  // Fetch user info
      if (res.data.user) {
        setUser(res.data.user);
        setUsernames(res.data.user.map((user) => user.username));
        setScores(res.data.user.map((user) => user.score));
      } else {
        console.log("No users found");
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  useEffect(() => {
    getUserInfo();  // Fetch user info when component mounts
  }, []);

  return (
    <div>
      <p className="scoreboard">Scores: {scores.join(', ')}</p>  {/* Display scores */}
      <p className="usernames">Usernames: {usernames.join(', ')}</p>  {/* Display usernames */}
      Scoreboard
    </div>
  );
}

export default Scoreboard;
