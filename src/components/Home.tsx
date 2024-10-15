import React from 'react';
import { Typography, Box, Paper, Grid } from '@mui/material';

const Home: React.FC = () => {
  return (
    <Box sx={{ flexGrow: 1, mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome to MyApp
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body1">
              MyApp is a cutting-edge platform that helps you manage your tasks and stay organized.
              With our intuitive interface and powerful features, you'll boost your productivity in no time!
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Features
            </Typography>
            <Typography variant="body1" component="ul">
              <li>Secure user authentication</li>
              <li>Personalized user profiles</li>
              <li>Task management and organization</li>
              <li>Real-time data synchronization</li>
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <img
          src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
          alt="Productivity"
          style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }}
        />
      </Box>
    </Box>
  );
};

export default Home;