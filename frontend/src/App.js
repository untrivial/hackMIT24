import React, { useState } from 'react';
import './App.css';

function App() {
  const [songName, setSongName] = useState('');
  const [knowledgeGraph, setKnowledgeGraph] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Hardcoded knowledge graph response
    const hardcodedResponse = {
      nodes: [
        { id: 1, label: songName, type: 'song' },
        { id: 2, label: 'Artist Name', type: 'artist' },
        { id: 3, label: 'Album Name', type: 'album' },
        { id: 4, label: 'Genre', type: 'genre' },
      ],
      edges: [
        { from: 1, to: 2, label: 'performed by' },
        { from: 1, to: 3, label: 'from album' },
        { from: 1, to: 4, label: 'belongs to' },
      ],
    };
    setKnowledgeGraph(hardcodedResponse);
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
