// src/Scoreboard.js
import './LoginSignUp.css';
import Login from './Login';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Scoreboard = () => {
  const [scores, setScores] = useState([]);
  //const [name, setName] = useState('');
  const [score, setScore] = useState('');
  const [leaderboardData, setLeaderboardData] = useState([]);
  const location = useLocation();
  // Access the firstName from the location state
const firstName = location.state && location.state.firstName;
  useEffect(() => {
    const fetchScores = async () => {
      try {
        const response = await axios.get('http://dreamlo.com/lb/9Aer_96Ftk6SjhkuZyjgkALyyXxqLcfU65gqW_Z48zUw/json');
        setLeaderboardData(response.data.dreamlo.leaderboard.entry);
      } catch (error) {
        console.error('Error fetching leaderboard data:', error);
      }
    };

    fetchScores();
  }, []);

  const fetchScores = async () => {
   
      const response = await axios.get('http://dreamlo.com/lb/9Aer_96Ftk6SjhkuZyjgkALyyXxqLcfU65gqW_Z48zUw/json');
      
        console.log(response);
      
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const existingEntryIndex = leaderboardData.findIndex(entry => entry.name === firstName);
      console.log(existingEntryIndex);
      if (existingEntryIndex !== -1) {
        // If the name already exists in the leaderboard, update the score by adding the new score
        const updatedScores = [...leaderboardData]; // Make a copy of the array
        updatedScores[existingEntryIndex] = { // Update the specific entry
          ...updatedScores[existingEntryIndex], // Maintain other properties
          score: parseInt(updatedScores[existingEntryIndex].score) + parseInt(score) // Add the new score
        };
        await axios.get(`http://dreamlo.com/lb/9Aer_96Ftk6SjhkuZyjgkALyyXxqLcfU65gqW_Z48zUw/add/${firstName}/${updatedScores[existingEntryIndex].score}`);
        setLeaderboardData(updatedScores); // Update the state
      } else {
        // If the name doesn't exist in the leaderboard, add a new entry
        await axios.get(`http://dreamlo.com/lb/9Aer_96Ftk6SjhkuZyjgkALyyXxqLcfU65gqW_Z48zUw/add/${firstName}/${score}`);
        setLeaderboardData([...leaderboardData, { firstName, score: parseInt(score) }]);
      }
      setScore('');
      fetchScores(); // Refresh scoreboard after submission
    } catch (error) {
      console.error('Error submitting score:', error);
    }
    window.location.href = '/'; 
  };
  
  
  const renderScores = () => {
    // Sort entries by score value (descending order)
    leaderboardData.sort((a, b) => parseInt(b.score) - parseInt(a.score));

    // Select top 5 scores
    const top5Scores = leaderboardData.slice(0, 10);

    // Generate JSX elements for each score entry
    return (
      <div>
        <div className='header'><b>Leaderboard</b></div>
        <div className="container2">
          {top5Scores.map((entry, index) => (
            <div key={index} className="row">
              <span className="name">{entry.name}</span>
              <span className="score">{entry.score}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };
  return (
    <div>
      <h2>&nbsp;Binge Week 2024🎉</h2>
      <form onSubmit={handleSubmit}>
      <div className='inputs'>
        <label>
          Score:
          <input className='input' type="number" value={score} onChange={(e) => setScore(e.target.value)} />
        </label>
        <label><br></br>
        <button className='submit' type="submit" style={{padding:'20px'}}> Submit</button>
        </label>
        </div>
      </form >
      <div>
      <div className='header'>How to get points 🤔</div>
        <div className="container2">
            <div className="row">
              <span className="name"><b>Action</b></span>
              <span className="score"><b>Points</b></span>
            </div>
            <div className="row">
              <span className="name">6x Beers (Men), 8x Beers (Women)</span>
              <span className="score">1</span>
            </div>
            <div className="row">
              <span className="name">16x $ Beers (Men), 12x  $ Beers (Women)</span>
              <span className="score">1</span>
            </div>
            <div className="row">
              <span className="name">Getting a Phone Number</span>
              <span className="score">1</span>
            </div>
            <div className="row">
              <span className="name">Bar Hookup (Max. 1/night)</span>
              <span className="score">1</span>
            </div>
            <div className="row">
              <span className="name">Sex (No repeats)</span>
              <span className="score">2</span>
            </div>
            <div className="row">
              <span className="name">Post Bar Food</span>
              <span className="score">1</span>
            </div>
            <div className="row">
              <span className="name"> Going to Class Next Day</span>
              <span className="score">1</span>
            </div>
            <div className="row">
              <span className="name"> Event Participation</span>
              <span className="score">1</span>
            </div>
            <div className="row">
              <span className="name"> Crying</span>
              <span className="score">-1</span>
            </div>
            <div className="row">
              <span className="name">Puking</span>
              <span className="score">-1</span>
            </div>
            <div className="row">
              <span className="name"> Not Getting into Bar</span>
              <span className="score">-1</span>
            </div>
            
         
        </div>
      </div>
    </div>
  );
};

export default Scoreboard;
