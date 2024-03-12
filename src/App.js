import logo from './logo.svg';
import './App.css';
import Login from './Components/LoginSignUp/Login';
import SignUp from './Components/LoginSignUp/SignUp';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/LoginSignUp/Home'; 
//import LoginPage from './Components/LoginSignUp/LoginPage';
import Register from './Components/LoginSignUp/Leaderboard';
//import LoginPage from './Components/LoginSignUp/jokes';

const App = () => {
  return (
    <Router>
      <Routes> {/* Use Routes instead of Switch */}
        <Route path="/" element={<Home />} /> {/* Use 'element' prop instead of 'component' */}
        <Route path="/dashboard" element={<Register />} /> {/* Use 'element' prop instead of 'component' */}
        <Route path="/signup" element={<SignUp />} /> {/* Use 'element' prop instead of 'component' */}
        <Route path="/login" element={<Login />} /> {/* Use 'element' prop instead of 'component' */}
      </Routes>
    </Router>
  );
};

export default App;