import "../css/project.css";
import GithubRepos from "./GitHubRepos";

const ProjectPage = () => {

  return (
    <div className="project-page-container">
      <h1 className="project-title">My Projects</h1>
      
      <p className="project-description">
        Below is a collection of my public repositories fetched directly from the GitHub API. 
        These projects demonstrate my journey and growth as a developer.
      </p>

      <GithubRepos />
    </div>
  );
};

export default ProjectPage;
