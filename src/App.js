import React, { useState } from "react";
import axios from "axios";
import './App.css';

function App() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error

    if (!url) {
      setError("Please enter a valid URL.");
      return;
    }

    try {
      const baseUrl = process.env.REACT_APP_API_URL;
      console.log({baseUrl});
      // Replace 'http://localhost:8081' with your backend URL or docker container URL
      const response = await axios.post(baseUrl, { actualUrl: url });
      
      // Assuming the response contains the shortened URL
      setShortUrl(response.data.shortUrl);
    } catch (err) {
      setError("Error creating short URL");
    }
  };

  return (
    <div className="App">
      <div className="mainBox">
        <h2>URL Shortener</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Enter URL:&nbsp;
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
              className="urlInput"
            />
          </label>
          <button type="submit" className="submitBtn"><strong>Shorten</strong></button>
        </form>

        {shortUrl && (
          <div>
            <h4>Shortened URL:</h4>
            <a href={shortUrl} className="shortenedUrl" target="_blank" rel="noreferrer">{shortUrl}</a>
          </div>
        )}

        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
      <p className="footer">*Please save the shortened url somewhere as this is a personal project, and you will not be able to view your shortened urls once refreshed.
        <br />*Shortened url will still work.
      </p>
    </div>
  );
}

export default App;