import React, { useState, useEffect } from 'react';
import { Typography, TextField, Button, Box } from '@mui/material';
import { auth, db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const Profile: React.FC = () => {
  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (auth.currentUser) {
        const userRef = doc(db, 'users', auth.currentUser.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const userData = userSnap.data();
          setDisplayName(userData.displayName || '');
          setBio(userData.bio || '');
        }
      }
    };
    fetchUserProfile();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (auth.currentUser) {
      const userRef = doc(db, 'users', auth.currentUser.uid);
      await setDoc(userRef, { displayName, bio }, { merge: true });
      alert('Profile updated successfully!');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h4" gutterBottom>
        Profile
      </Typography>
      <TextField
        margin="normal"
        fullWidth
        id="displayName"
        label="Display Name"
        name="displayName"
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
      />
      <TextField
        margin="normal"
        fullWidth
        id="bio"
        label="Bio"
        name="bio"
        multiline
        rows={4}
        value={bio}
        onChange={(e) => setBio(e.target.value)}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Update Profile
      </Button>
    </Box>
  );
};

export default Profile;