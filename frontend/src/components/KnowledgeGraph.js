import React from 'react';
import CytoscapeComponent from 'react-cytoscapejs';

const KnowledgeGraph = ({ data }) => {
  const elements = [
    ...data.nodes.map(node => ({
      data: { id: node.id.toString(), label: node.label, type: node.type },
      position: { x: Math.random() * 300, y: Math.random() * 300 } // Random positioning
    })),
    ...data.edges.map(edge => ({
      data: { source: edge.from.toString(), target: edge.to.toString(), label: edge.label }
    }))
  ];

  const stylesheet = [
    {
      selector: 'node',
      style: {
        'background-color': '#666',
        'label': 'data(label)',
        'color': '#fff',
        'text-valign': 'center',
        'text-halign': 'center',
        'font-size': '12px'
      }
    },
    {
      selector: 'edge',
      style: {
        'width': 3,
        'line-color': '#ccc',
        'target-arrow-color': '#ccc',
        'target-arrow-shape': 'triangle',
        'curve-style': 'bezier',
        'label': 'data(label)',
        'font-size': '10px',
        'text-rotation': 'autorotate'
      }
    },
    {
      selector: 'node[type="song"]',
      style: {
        'background-color': '#007bff',
      }
    },
    {
      selector: 'node[type="artist"]',
      style: {
        'background-color': '#28a745',
      }
    },
    {
      selector: 'node[type="album"]',
      style: {
        'background-color': '#ffc107',
      }
    },
    {
      selector: 'node[type="genre"]',
      style: {
        'background-color': '#dc3545',
      }
    }
  ];

  return (
    <CytoscapeComponent
      elements={elements}
      stylesheet={stylesheet}
      style={{ width: '100%', height: '400px' }}
      layout={{ name: 'cose' }}
    />
  );
};

export default KnowledgeGraph;
