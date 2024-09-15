import React, { useState } from 'react';
import './App.css';
import { getSimilarSongs } from './wtf.js';

function App() {
  const [songName, setSongName] = useState('');
  const [knowledgeGraph, setKnowledgeGraph] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Hardcoded knowledge graph response
    

    
  };

  return (
  


    <div className="App">
      <div className="container">
        <h1>Song Knowledge Graph Generator</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={songName}
            onChange={(e) => setSongName(e.target.value)}
            placeholder="Enter a song name"
            required
          />
          <button type="submit">Generate Knowledge Graph</button>
        </form>
        <p>{getSimilarSongs(songName)}</p>
        {knowledgeGraph && (
          <div className="knowledge-graph">
            <h2>Knowledge Graph for "{songName}"</h2>
            <pre>{JSON.stringify(knowledgeGraph, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
