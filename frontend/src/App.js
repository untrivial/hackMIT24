import React, { useState } from 'react';
import './App.css';
import { getSimilarSongs } from './wtf.js';
import KnowledgeGraph from './components/KnowledgeGraph';

function App() {
  const [songName, setSongName] = useState('');
  const [knowledgeGraph, setKnowledgeGraph] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Hardcoded knowledge graph response
    const hardcodedResponse = {
      nodes: [
        { id: 1, label: 'All I Ask', artist: 'Adele' },
        // 20 similar songs to "All I Ask"
        { id: 2, label: 'Someone Like You', artist: 'Adele' },
        { id: 3, label: 'Hello', artist: 'Adele' },
        { id: 4, label: 'When We Were Young', artist: 'Adele' },
        { id: 5, label: 'Make You Feel My Love', artist: 'Adele' },
        { id: 6, label: 'Set Fire to the Rain', artist: 'Adele' },
        { id: 7, label: 'Rolling in the Deep', artist: 'Adele' },
        { id: 8, label: 'Turning Tables', artist: 'Adele' },
        { id: 9, label: 'One and Only', artist: 'Adele' },
        { id: 10, label: 'Chasing Pavements', artist: 'Adele' },
        { id: 11, label: 'Skyfall', artist: 'Adele' },
        { id: 12, label: 'Stay With Me', artist: 'Sam Smith' },
        { id: 13, label: 'Thinking Out Loud', artist: 'Ed Sheeran' },
        { id: 14, label: 'All of Me', artist: 'John Legend' },
        { id: 15, label: 'Say You Love Me', artist: 'Jessie Ware' },
        { id: 16, label: 'Love Me Like You Do', artist: 'Ellie Goulding' },
        { id: 17, label: 'Skinny Love', artist: 'Birdy' },
        { id: 18, label: 'Gravity', artist: 'Sara Bareilles' },
        { id: 19, label: 'Elastic Heart', artist: 'Sia' },
        { id: 20, label: 'Lay Me Down', artist: 'Sam Smith' },
        { id: 21, label: 'Photograph', artist: 'Ed Sheeran' },
        // 10 similar songs to the above (second degree)
        { id: 22, label: 'Hometown Glory', artist: 'Adele' },
        { id: 23, label: 'Im Not the Only One', artist: 'Sam Smith' },
        { id: 24, label: 'Perfect', artist: 'Ed Sheeran' },
        { id: 25, label: 'Ordinary People', artist: 'John Legend' },
        { id: 26, label: 'Wildest Dreams', artist: 'Taylor Swift' },
        { id: 27, label: 'Chandelier', artist: 'Sia' },
        { id: 28, label: 'The A Team', artist: 'Ed Sheeran' },
        { id: 29, label: 'Love on the Brain', artist: 'Rihanna' },
        { id: 30, label: 'Royals', artist: 'Lorde' },
        { id: 31, label: 'Blank Space', artist: 'Taylor Swift' },
      ],
      edges: [
        // Edges for the first 20 similar songs
        ...Array.from({ length: 20 }, (_, i) => ({ from: 1, to: i + 2, weight: Math.random() })),
        // Edges for the next 10 similar songs (connected to random nodes from the first 20)
        ...Array.from({ length: 10 }, (_, i) => ({
          from: Math.floor(Math.random() * 20) + 2,
          to: i + 22,
          weight: Math.random() * 0.5 // Lower weight for second-degree connections
        }))
      ]
    };
    setKnowledgeGraph(hardcodedResponse);
  };

  return (
  


    <div className="App">
      <div className="container">
        <h1>Song Recommendation Engine</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={songName}
            onChange={(e) => setSongName(e.target.value)}
            placeholder="Enter a song name"
            required
          />
          <button type="submit">Generate Recommendations</button>
        </form>
        <p>{getSimilarSongs(songName)}</p>
        {knowledgeGraph && (
          <div className="knowledge-graph">
            <h2>Recommendations for "{songName}"</h2>
            <KnowledgeGraph data={knowledgeGraph} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
