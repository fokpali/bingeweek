import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate from react-router-dom
import './LoginSignUp.css';
import React, { useState } from 'react';
import { auth, firestore } from './firebase'; // Import auth and firestore from your firebase module

const signUp = (email, password, firstName) => {
  console.log('Email:', email);
  console.log('Password:', password);
  // Create user account with email and password
  return auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Add user's first name to firestore
      return firestore.collection('bingeweek').doc(userCredential.user.uid).set({
        email: email,
        firstName: firstName,
        points: 0

      });
    });
};

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Use useNavigate hook for navigation


  const handleSignUp = async () => {
    try {
      await signUp(email, password, firstName); // Pass first name to signUp function
      // Sign up successful, handle redirection or state update
      console.log('Sign up successful');
      navigate('/login'); 
      //Go to login
      
    } catch (error) {
      // Handle sign up error
      setError("🛈 Enter a valid email and password over 6 characters");
      console.error('Sign up error:', error.message);
    }
  };

  return (
    <div>
     <h2>&nbsp;Binge Week 2024🎉</h2>
    <div className='header' style={{fontSize:"30px"}}>Sign Up</div>
    <div className="inputs2">
      <input className="input"
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        placeholder="First Name" // Add input for first name
      />
      <input className="input"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input className="input"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button className="submit" onClick={handleSignUp}>Sign Up</button>
      {error && <div className="err">{error}</div>}
      
      
      </div>
      <br></br>
  
    </div>
  );
};

export default SignUp;
/**
 * 
 * <div className='header'>How to get points 🤔</div>
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
 */