import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Footer from './components/Footer';
import GotoTop from './components/GotoTop';
import Navbar from './components/Navbar';
import Notfound from './components/Notfound';
import About from './components/pages/About';
import Contact from './components/pages/Contact';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Logout from './components/pages/Logout';
import Register from './components/pages/Register';

function App() {
  const [auth, setAuth] = useState(false);

  const navigate = useNavigate();

  const isLoggedIn = async () => {
    try {
      const result = await fetch('http://127.0.0.1:3001/user/auth', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      if (result.status === 200) {
        setAuth(true);
      }
      if (result.status === 401) {
        setAuth(false);
        navigate('/login');
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <div>
      <div className="container">
        <Navbar auth={auth} />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/logout" element={<Logout />} />
          <Route element={<Notfound />} />
        </Routes>
        {auth ? (
          <>
            <About />
            <Contact />
          </>
        ) : (
          ''
        )}
        <GotoTop />
      </div>
      <hr />
      <Footer />
    </div>
  );
}

export default App;
