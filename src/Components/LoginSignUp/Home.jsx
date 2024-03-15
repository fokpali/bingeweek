import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, firestore } from './firebase'; // Import auth and firestore from your firebase module
import './LoginSignUp.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './LoginSignUp.css';

const Home = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Use useNavigate hook for navigation
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const leaderboardRef = firestore.collection('bingeweek');
        const snapshot = await leaderboardRef.get();
        const leaderboardData = snapshot.docs.map(doc => doc.data());
        setLeaderboardData(leaderboardData);
      } catch (error) {
        console.error('Error fetching leaderboard data:', error);
      }
    };

    fetchScores();
  }, []);

  const renderScores = () => {
    // Sort entries by score value (descending order)
    leaderboardData.sort((a, b) => parseInt(b.points) - parseInt(a.points));
  
    // Generate JSX elements for each score entry
    return (
      <div>
        <div className='header'><b>Leaderboard</b></div>
        <div className='container2'>
          {leaderboardData.map((entry, index) => (
            <div key={index} className="row">
              <span className="name">{entry.firstName}</span>
              <span className="score">{entry.points}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div>
      <h2>&nbsp;Binge Week 2024🎉</h2>
      <div style={{ display: 'flex', flexDirection: 'row' , padding:'20px'}}>
        <Link to="/signup">
        <button className='signlogin' style={{padding:'20px'}}>Sign Up</button>
        </Link>
              <Link to="/login">
          <button className='signlogin' style={{padding:'20px'}}>Login</button>
        </Link>
      </div>
      <div>
        {renderScores()}
      </div>
           
       
    </div>
  );
};

export default Home;
