import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Link } from '@mui/material';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { Link as RouterLink } from 'react-router-dom';

interface AuthFormProps {
  isLogin: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({ isLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const validateInput = () => {
    if (!email || !password) {
      setError('Please fill in all fields.');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
      return false;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!validateInput()) return;

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, 'users', userCredential.user.uid), {
          email: userCredential.user.email,
          createdAt: new Date(),
        });
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please try again.');
      console.error(err);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      await setDoc(doc(db, 'users', result.user.uid), {
        email: result.user.email,
        displayName: result.user.displayName,
        createdAt: new Date(),
      }, { merge: true });
    } catch (err: any) {
      setError(err.message || 'Google sign-in failed. Please try again.');
      console.error(err);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        {isLogin ? 'Sign In' : 'Sign Up'}
      </Button>
      <Button
        fullWidth
        variant="outlined"
        onClick={handleGoogleSignIn}
        sx={{ mt: 1, mb: 2 }}
      >
        Sign in with Google
      </Button>
      {error && (
        <Typography color="error" align="center">
          {error}
        </Typography>
      )}
      <Box sx={{ mt: 2, textAlign: 'center' }}>
        <Link component={RouterLink} to={isLogin ? '/register' : '/login'}>
          {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
        </Link>
      </Box>
    </Box>
  );
};

export default AuthForm;