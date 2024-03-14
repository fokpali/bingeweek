import './LoginSignUp.css';
import Login from './Login';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import firebase from 'firebase/compat/app';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { firestore } from './firebase'; // Import firestore from Firebase config

const Scoreboard = () => {
  const [scores, setScores] = useState([]);
  const [score, setPoints] = useState('');
  const [leaderboardData, setLeaderboardData] = useState([]);
  const location = useLocation();
  const navigate = useNavigate(); // Use useNavigate hook for navigation
  const db = firebase.firestore();

  // Access the firstName from the location state
  const firstName = location.state && location.state.firstName;
  const email = location.state && location.state.email; // Add email from location state
console.log(firstName)
  useEffect(() => {
    const fetchScores = async () => {
      try {
        const leaderboardRef = db.collection('bingeweek').limit(20);
        const snapshot = await leaderboardRef.get();
        const leaderboardData = snapshot.docs.map(doc => doc.data());
        setLeaderboardData(leaderboardData);
      } catch (error) {
        console.error('Error fetching leaderboard data:', error);
      }
    };

    fetchScores();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Update score based on email
      console.log(email)
      firestore.collection('bingeweek').where('email', '==', email).get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // Update the 'points' field with the new score
            const currentPoints = doc.data().points || 0;
            const newScore = currentPoints + parseInt(score);
            firestore.collection('bingeweek').doc(doc.id).update({
              points: newScore
            })
            .then(() => {
              console.log("Score updated successfully!");
              navigate('/');
            })
            .catch((error) => {
              console.error("Error updating score: ", error);
            });
          });
        })
        .catch((error) => {
          console.error("Error getting documents: ", error);
        });
    } catch (error) {
      console.error('Error updating score:', error);
    }
  };

  const clearPoints = async () => {
    try {
      const userRef = db.collection('bingeweek').doc(firstName);
      await userRef.set({
        points: 0
      }, { merge: true });
      navigate('/');
    } catch (error) {
      console.error('Error clearing scores:', error);
    }
  };

  const renderScores = () => {
    // Sort entries by score value (descending order)
    leaderboardData.sort((a, b) => parseInt(b.score) - parseInt(a.score));

    // Select top 5 scores
    const top5Scores = leaderboardData.slice(0, 20);

    // Generate JSX elements for each score entry
    return (
      <div>
        <div className='header'><b>Leaderboard</b></div>
        <div className="container2">
          <div>hi</div>
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
        <button className="submit2" onClick={clearPoints}>Reset Points to 0</button>
  
        <form onSubmit={handleSubmit}>
        <div className='inputs' style={{flexDirection:"column"}} >
          <label style={{flexDirection:"column", margin:"auto"}}>
            Add points:
            <input className='input' style={{flexDirection:"column"}} type="number" value={score} onChange={(e) => setPoints(e.target.value)} />
          </label>
          <label style={{flexDirection:"column"}}>
          <button className='submit' style={{flexDirection:"column", padding:'20px'}}type="submit"> Submit</button>
          </label>
          </div>
          </form>
        <div>
        <div className='header'>How to get points 🤔</div>
          <div className="container2">
              <div className="row">
                <span className="name"><b>Action</b></span>
                <span className="score"><b>Points</b></span>
              </div>
              <div className="row">
                <span className="name">Hosting a pre/event</span>
                <span className="score">5</span>
              </div>
              <div className="row">
                <span className="name">8x Beers/shots (Men)</span>
                <span className="score">1</span>
              </div>
              <div className="row">
                <span className="name">6x Beers/shots (Women)</span>
                <span className="score">1</span>
              </div>
              <div className="row">
                <span className="name">1 Wine Bottle</span>
                <span className="score">1</span>
              </div>
              <div className="row">
                <span className="name">16x $ Beers (Men)</span>
                <span className="score">1</span>
              </div>
              <div className="row">
                <span className="name">12x  $ Beers (Women)</span>
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
