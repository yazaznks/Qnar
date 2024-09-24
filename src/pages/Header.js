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
import CloseIcon from '@mui/icons-material/Close';
import Globe from '../Assets/globe.png';
import { useTranslation } from 'react-i18next';
function Header() {
  const [location, setLocation] = useLocation();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElLang, setAnchorElLang] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Change this based on your auth logic
  const [username, setUsername] = useState('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { t, i18n } = useTranslation();

  const handleChange = (event) => {
    setAnchorElNav(null);
    const selectedLanguage = event.target.value;
    i18n.changeLanguage(selectedLanguage);
    localStorage.setItem('i18nextLng', selectedLanguage); // Persist in localStorage
    
  };
  useEffect(() => {
    // Example of getting auth status from localStorage (or any other method)
    const token = localStorage.getItem('access_token');
    const storedUsername = localStorage.getItem('username');
    setIsLoggedIn(!!token);
    setUsername(storedUsername || '');
  }, []);

  const handleOpenNavMenu = (event) => {
    if(anchorElNav == null){
      setAnchorElNav(event.currentTarget);}
    else{
      setAnchorElNav(null);
    }
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
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, fontWeight:'bold' }}>
            <img
              onClick={() => setLocation('/')}
              style={{ cursor: 'pointer', }}
              src={logo}
              width="150px"
              height="auto"
              alt="Logo"
            />
{/* marginRight: isMobile ? 'auto' : '0px' */}
            {!isMobile && (
              <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
                <Button onClick={() => setLocation('/')} sx={{  color: location === '/' ? '#EB8576' : '#3B5D44' , fontWeight:'bold'}}>
                {t('Home')}
                </Button>
                <Button onClick={() => setLocation('/about')} sx={{ color: location === '/about' ? '#EB8576' : '#3B5D44' , fontWeight:'bold' }}>
                {t('AboutUs')}
                </Button>
                <Button onClick={() => setLocation('/#')} sx={{ color: location === '/features' ? '#EB8576' : '#3B5D44' , fontWeight:'bold' }}>
                {t('Features')} 
                </Button>
                <Button onClick={() => setLocation('/#')} sx={{ color: location === '/Games' ? '#EB8576' : '#3B5D44' , fontWeight:'bold' }}>
                {t('Games')}
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
                value={i18n.language}
                onChange={handleChange}
                sx={{ color: '#3B5D44', height:'5vh', fontWeight:'bold', bordercolor:'#3B5D44' }}
                renderValue={(selected) => (
                  <Box display="flex" alignItems="center">
                    <Box
                      component="img"
                      src={Globe}
                      alt="Custom"
                      width={24}
                      height={24}
                      marginRight={1}
                    />
                     {selected === 'ar' ? 'العربية' : 'English'}
                  </Box>)}
              >             
                <MuiMenuItem sx={{ color: '#3B5D44' }} value="en">English</MuiMenuItem>
                <MuiMenuItem sx={{ color: '#3B5D44' }} value="ar">العربية</MuiMenuItem>
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
                
                sx={{  zIndex: 1400 ,marginLeft: i18n.language === 'en' ? 'auto' : 0,  // Align to the left for English
                  marginRight: i18n.language === 'ar' ? 'auto' : 0   // Align to the right for Arabic
                }}
              >
                {anchorElNav ? (
          <CloseIcon sx={{ color: '#3B5D44' }} />
        ) : (
          <MenuIcon sx={{ color: '#3B5D44' }} />
        )}
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
                {t('LogOut')}
                </Button>
              </>
            )}

            {!isMobile && !isLoggedIn && (
              <>
                <Button onClick={() => setLocation('/login')} variant="contained" sx={{ backgroundColor: '#4B7857', color: '#fff', marginRight: '10px' }}>
                {t('Login')}
                </Button>
                <Button onClick={() => setLocation('/signup')} variant="outlined" sx={{ borderColor: '#4B7857', color: '#4B7857',marginRight: '10px'}}>
                {t('signup')}
                </Button>
              </>
            )}  
          </Box>

          <Menu
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
            slotProps={{
              paper: {
       
                sx: {
                  width: '80%',       // Adjust width for menu with margin
                  height: '100vh', 
                  minHeight: '100vh',    // Full height of the viewport
                  position: 'fixed',
                  marginTop:'-4vw',
                  marginLeft: i18n.language=== 'ar' ?'-10vw':'10vw'  ,           // Align to the top
                  zIndex: 1300,         // Ensure the menu is on top
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  bgcolor: 'background.paper',
                  '& .MuiMenuItem-root': {
                    
                    borderBottom: '1px solid #3B5D44', // Line under each item
                    padding: '16px 20px',
                   
                  },
                },
              },
            }}
          >
            <MenuItem sx={{ color: '#3B5D44' }} onClick={() => setLocation('/#')}>{t('Home')}</MenuItem>
            <MenuItem sx={{ color: '#3B5D44' }} onClick={() => setLocation('/#')}>{t('AboutUs')}</MenuItem>
            <MenuItem sx={{ color: '#3B5D44' }} onClick={() => setLocation('/#')}>{t('Features')}</MenuItem>
            <MenuItem sx={{ color: '#3B5D44' }} onClick={() => setLocation('/#')}>{t('Games')}</MenuItem>
            <MenuItem>
                <IconButton size="large" aria-label="language"  aria-controls="menu-appbar" aria-haspopup="true" onClick={handleOpenLangMenu} 
      style={{ backgroundColor: '#fff', borderRadius: '50%' }} > <LanguageIcon /></IconButton>
              
                <FormControl >
                  <Select
                    defaultValue="English"
                    displayEmpty
                    value={i18n.language}
                    onChange={handleChange}
                    sx={{ color: '#3B5D44' }}
                    renderValue={(selected) => (
                      <Box display="flex" alignItems="center">
                        <Box
                          component="img"
                          src={Globe}
                          alt="Custom"
                          width={24}
                          height={24}
                          marginRight={1}
                        />
                         {selected === 'ar' ? 'العربية' : 'English'}
                      </Box>)}
                  >
                    <MuiMenuItem sx={{ color: '#3B5D44' }} value="en">English</MuiMenuItem>
                    <MuiMenuItem sx={{ color: '#3B5D44' }} value="ar">العربية</MuiMenuItem>
                  </Select>
                </FormControl>
            </MenuItem>
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
