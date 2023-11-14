import React, { useState } from "react";
import "./WebApi.css";
function WebApi() {
  const [username, setUsername] = useState("");
  const [repos, setRepos] = useState([]);
  const [userData, setUserData] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchUserData();
    fetchRepos();
    setSubmitted(true);
  };

  const fetchUserData = async () => {
    const response = await fetch(`https://api.github.com/users/${username}`);
    const data = await response.json();
    setUserData(data);
  };

  const fetchRepos = async () => {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos`
    );
    const data = await response.json();
    setRepos(data);
  };

  return (
    <div className="main-div">
      <div className="container">
        <form className="first-div" onSubmit={handleSubmit}>
          <h1>API Sample</h1>
          <input
            type="text"
            placeholder="Github username"
            value={username}
            onChange={handleUsernameChange}
          />
          <br />
          <button type="submit">Pull User Data</button>
        </form>
        {submitted && ( // add this line
          <>
            <div className="apiFetched">
              <h2>
                {userData.name} (@<span>{userData.login}</span>)
              </h2>
              <div className="section">
                <div className="img-1">
                  <img
                    src={userData.avatar_url}
                    alt="Profile"
                    className="img"
                  />
                </div>
                <div className="follow">
                  {" "}
                  <p>Followers: {userData.followers}</p>
                </div>
                <div className="flg">
                  <p>Following: {userData.following}</p>
                </div>
                <div className="repos">
                  {" "}
                  <p>Repos: {userData.public_repos}</p>
                </div>
              </div>
            </div>
            <h3>Repos List</h3>
            <ul className="ul">
              {Array.isArray(repos) &&
                repos.map((repo) => (
                  <li key={repo.id}>
                    <a
                      href={repo.html_url}
                      target="_blank"
                      
                    >
                      {repo.name}
                    </a>
                  </li>
                ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}

export default WebApi;
