import React, { useState } from 'react';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [users, setUsers] = useState(() => {
    // Load users from local storage or initialize an empty array
    const storedUsers = localStorage.getItem('users');
    return storedUsers ? JSON.parse(storedUsers) : [];
  });

  const handleLogin = (e) => {
    e.preventDefault();
    // Find user by username
    const user = users.find(user => user.username === username);
    if (user && user.password === password) {
      setLoggedIn(true);
      alert('Login successful!');
    } else {
      alert('Incorrect username or password');
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    // Check if username already exists
    if (users.some(user => user.username === username)) {
      alert('Username already exists');
    } else {
      // Add new user to the list
      const newUser = { username, password };
      setUsers([...users, newUser]);
      // Save updated users to local storage
      localStorage.setItem('users', JSON.stringify([...users, newUser]));
      alert('Registration successful!');
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUsername('');
    setPassword('');
  };

  if (loggedIn) {
    return (
      <div>
        <h1>Welcome, {username}!</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default LoginPage;
