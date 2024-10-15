import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { Home, User, LogIn, LogOut } from 'lucide-react';

interface NavbarProps {
  user: any;
}

const Navbar: React.FC<NavbarProps> = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          MyApp
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button color="inherit" component={RouterLink} to="/" startIcon={<Home />}>
            Home
          </Button>
          {user ? (
            <>
              <Button color="inherit" component={RouterLink} to="/profile" startIcon={<User />}>
                Profile
              </Button>
              <Button color="inherit" onClick={handleLogout} startIcon={<LogOut />}>
                Logout
              </Button>
            </>
          ) : (
            <Button color="inherit" component={RouterLink} to="/login" startIcon={<LogIn />}>
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;