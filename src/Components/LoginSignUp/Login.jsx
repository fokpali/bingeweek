import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, firestore } from './firebase'; // Import auth and firestore from your firebase module
import './LoginSignUp.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Use useNavigate hook for navigation

  const fetchFirstNameByEmail = async (email) => {
    try {
      // Query Firestore to find the user document with matching email
      const querySnapshot = await firestore.collection('bingeweek').where('email', '==', email).get();
  
      // Check if a document matching the email exists
      if (!querySnapshot.empty) {
        // Extract the first name from the retrieved document
        const userDoc = querySnapshot.docs[0]; // Assuming only one user document per email
        const firstName = userDoc.data().firstName;
        return firstName;
      } else {
        // Handle the case where user data is not found
        console.log('User data not found for email:', email);
        return null;
      }
    } catch (error) {
      // Handle any errors that occur during the fetch operation
      console.error('Error fetching user data:', error);
      return null;
    }
  };

  const fetchPointsByEmail = async (email) => {
    try {
      // Query Firestore to find the user document with matching email
      const querySnapshot = await firestore.collection('bingeweek').where('email', '==', email).get();
  
      // Check if a document matching the email exists
      if (!querySnapshot.empty) {
        // Extract the first name from the retrieved document
        const userDoc = querySnapshot.docs[0]; // Assuming only one user document per email
        const points = userDoc.data().points;
        return points;
      } else {
        // Handle the case where user data is not found
        console.log('User data not found for email:', email);
        return null;
      }
    } catch (error) {
      // Handle any errors that occur during the fetch operation
      console.error('Error fetching user data:', error);
      return null;
    }
  };
  

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await auth.signInWithEmailAndPassword(email, password);
      
      // Fetch both first name and points
      Promise.all([
        fetchFirstNameByEmail(email),
        fetchPointsByEmail(email)
      ]).then(([firstName, userPoints]) => {
        if (firstName !== null) {
          console.log('First name:', firstName);
          console.log('Points:', userPoints);
          navigate('/dashboard', { state: { firstName:firstName, points: userPoints, email:email }});
        } else {
          console.log('No first name found for the email:', email);
          navigate('/dashboard', { state: { firstName: 'Unknown', points: userPoints, email:email }});
        }
      }).catch(error => {
        console.error('Error:', error);
      });
    } catch (error) {
      setError("🛈 Login information incorrect"); // Set error message if login fails
    }
  };
  
  return (
    <div>
     <h2>&nbsp;Binge Week 2024🎉</h2>
      <div className='header' style={{fontSize:"30px"}}>Login</div>
          <form onSubmit={handleLogin}>
          <div className="inputs2">
            
              <input className="input"
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            
              <input
                className="input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Password"
              />
           
            <button className='submit' type="submit">Login</button>
            {error && <div className="err">{error}</div>}
            </div>
          </form>
          
          <div>
          <br></br>
        
      </div>
      <br></br>
    </div>
  );
};

export default Login;
