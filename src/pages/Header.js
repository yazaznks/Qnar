import React, { useState, useEffect } from 'react';
import {
  AppBar, Toolbar, Button, Typography, Box, IconButton, Menu, MenuItem, Container, FormControl, Select, MenuItem as MuiMenuItem
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LanguageIcon from '@mui/icons-material/Language';
import { useTheme } from '@mui/material/styles';
import { useLocation } from 'wouter';
import { useMediaQuery } from '@mui/material'; 
import logo from '../Assets/Logo2.png';

function Header() {
  const [location, setLocation] = useLocation();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElLang, setAnchorElLang] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Change this based on your auth logic
  const [username, setUsername] = useState('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    // Example of getting auth status from localStorage (or any other method)
    const token = localStorage.getItem('access_token');
    const storedUsername = localStorage.getItem('username');
    setIsLoggedIn(!!token);
    setUsername(storedUsername || '');
  }, []);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenLangMenu = (event) => {
    setAnchorElLang(event.currentTarget);
  };

  // const handleCloseLangMenu = () => {
  //   setAnchorElLang(null);
  // };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('username');
    setIsLoggedIn(false);
    setUsername('');
    setLocation('/login'); // Redirect to login page
  };

  return (
    <AppBar position="static" style={{ background: '#fff', height: 'auto', fontWeight: 'bold' }}>
      <Container>
        <Toolbar disableGutters>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <img
              onClick={() => setLocation('/')}
              style={{ cursor: 'pointer', marginRight: isMobile ? 'auto' : '0px' }}
              src={logo}
              width="150px"
              height="auto"
              alt="Logo"
            />

            {!isMobile && (
              <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
                <Button onClick={() => setLocation('/')} sx={{ color: location === '/' ? '#EB8576' : '#3B5D44' }}>
                  Home
                </Button>
                <Button onClick={() => setLocation('/about')} sx={{ color: location === '/about' ? '#EB8576' : '#3B5D44' }}>
                  About Us
                </Button>
                <Button onClick={() => setLocation('/features')} sx={{ color: location === '/features' ? '#EB8576' : '#3B5D44' }}>
                  Features
                </Button>
                <Button onClick={() => setLocation('/Games')} sx={{ color: location === '/Games' ? '#EB8576' : '#3B5D44' }}>
                  Games
                </Button>
                <IconButton
              size="large"
              aria-label="language"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenLangMenu}
              color="inherit"
            >
        
            </IconButton>
            <FormControl sx={{ minWidth: 120 }}>
              <Select
                defaultValue="English"
                displayEmpty
                IconComponent={LanguageIcon}
                sx={{ color: '#3B5D44' }}
              >
                <MuiMenuItem sx={{ color: '#3B5D44' }} value="English">English</MuiMenuItem>
                <MuiMenuItem sx={{ color: '#3B5D44' }} value="Arabic">Arabic</MuiMenuItem>
              </Select>
            </FormControl>
              </Box>
            )}

            {isMobile && (
              <IconButton
                size="large"
                aria-label="menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon sx={{ color: '#3B5D44' }} />
              </IconButton>
            )}
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {!isMobile && isLoggedIn && (
              <>
                <Typography sx={{ marginRight: '10px', color: '#3B5D44' }}>
                  Welcome, {username}
                </Typography>
                <Button onClick={handleLogout} variant="contained" sx={{ backgroundColor: '#3B5D44', color: '#fff', marginRight: '10px' }}>
                  Logout
                </Button>
              </>
            )}

            {!isMobile && !isLoggedIn && (
              <>
                <Button onClick={() => setLocation('/login')} variant="contained" sx={{ backgroundColor: '#4B7857', color: '#fff', marginRight: '10px' }}>
                  Log in
                </Button>
                <Button onClick={() => setLocation('/signup')} variant="outlined" sx={{ borderColor: '#4B7857', color: '#4B7857' }}>
                  Sign up
                </Button>
              </>
            )}

            
          </Box>

          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            PaperProps={{
              elevation: 0,
              sx: {
                width: '50vw',   // Full width for the menu (optional, you can reduce width if needed)
                height: '100vh',  // Full height of the viewport
                position: 'fixed',
                right: 0,        // Align to the right
                top: 0,          // Align to the top
                zIndex: 1300,    // Ensure the menu is on top
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                bgcolor: 'background.paper',
                '& .MuiMenuItem-root': {
                  borderBottom: '1px solid #3B5D44', // Line under each item
                  padding: '16px 20px', // Adjust padding for spacing
                },
            }}}
          >
            <MenuItem sx={{ color: '#3B5D44' }} onClick={() => setLocation('/')}>Home</MenuItem>
            <MenuItem sx={{ color: '#3B5D44' }} onClick={() => setLocation('/about')}>About Us</MenuItem>
            <MenuItem sx={{ color: '#3B5D44' }} onClick={() => setLocation('/features')}>Features</MenuItem>
            <MenuItem sx={{ color: '#3B5D44' }} onClick={() => setLocation('/pricing')}>Pricing</MenuItem>
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
