import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './pages/login/signup'
import Login from './pages/login/login'
import Home from './pages/home/home';
import UserDetails from './components/UserDetails/userDetails'
import CreateUser from './components/createUser/index'
import RegisterUser from './components/createUser/RegisterUser'
import ViewAndEditUser from './components/editViewUser';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/profile/" element={<ViewAndEditUser />} />
        <Route path="/" element={< Signup />} />
        <Route path="/login" element={< Login />} />
        <Route path="/user/:userId" element={<UserDetails />} />
        <Route path="/create-user/:number" element={<CreateUser />} />
        <Route path="/create-user/:number/register-user" element={<RegisterUser />} />
        
      </Routes>
    </Router>
  );
}

export default App;
