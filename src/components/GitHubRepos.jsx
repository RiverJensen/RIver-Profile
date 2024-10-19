import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/githubrepos.css"

function GithubRepos() {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    axios.get("https://api.github.com/users/riverjensen/repos")
      .then(response => {
        setRepos(response.data);
      })
      .catch(error => {
        console.error("Error fetching repos:", error);
      });
  }, []);

  return (
    <div className="repo-container">
      {repos.map(repo => (
        <div key={repo.id} className="repo-box">
          <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
            {repo.name}
          </a>
          
        </div>
      ))}
    </div>
  );
}

export default GithubRepos;
