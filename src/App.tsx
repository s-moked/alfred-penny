import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { auth } from './firebase';
import AuthForm from './components/AuthForm';
import Profile from './components/Profile';
import Navbar from './components/Navbar';
import Home from './components/Home';

const theme = createTheme();

function App() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar user={user} />
        <Container component="main" maxWidth="md" sx={{ mt: 4 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={user ? <Navigate to="/profile" /> : <AuthForm isLogin={true} />} />
            <Route path="/register" element={user ? <Navigate to="/profile" /> : <AuthForm isLogin={false} />} />
            <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;