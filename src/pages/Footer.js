import React from 'react';
import { Box, Typography, Link, Grid, Button, TextField } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import logo from '../Assets/logoF.png'
import { useTranslation } from 'react-i18next';
function Footer() {
  const {t, i18n} = useTranslation();

  const handleChange = (event) => {
    const selectedLanguage = event.target.value;
    i18n.changeLanguage(selectedLanguage);
    localStorage.setItem('i18nextLng', selectedLanguage); // Persist in localStorage
  };

  return (
    <Box 
    component="footer"
    sx={{
      padding: '2rem',
      color: '#3B5D44',
      backgroundColor: '#f9f9f9',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    }}
  >
    <Grid container spacing={4} justifyContent="space-between"
    sx={{flexDirection: { xs: 'column', sm: 'row' }}}>
      
      {/* Left Section - Logo */}
      <Grid item xs={12} sm={4} sx={{
            display: { xs: 'none', md: 'block' }, // Hide on small screens
            textAlign: 'center'
          }}>
        <Box sx={{ textAlign: 'center' }}>
          {/* Insert your logo here */}
          <img src={logo} alt="Logo" style={{ width: '120px' }} />
      
        </Box>
      </Grid>

      {/* Middle Section - Site Map */}
      <Grid item xs={12} sm={4}>
        <Typography variant="h6" sx={{ marginBottom: '10px', fontWeight: 'bold' }}>
        {t('site')} Site map
        </Typography>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Link href="/" color="inherit" sx={{ display: 'block', marginBottom: '5px' }}>
            {t('Home')}
            </Link>
            <Link href="#" color="inherit" sx={{ display: 'block', marginBottom: '5px' }}>
            {t('policy')}
            </Link>
            <Link href="#" color="inherit" sx={{ display: 'block', marginBottom: '5px' }}>
            {t('price')}
            </Link>
            <Link href="#" color="inherit" sx={{ display: 'block', marginBottom: '5px' }}>
            {t('plans')}
            </Link>
            <Link href="#" color="inherit" sx={{ display: 'block', marginBottom: '5px' }}>
            {t('communityW')}
            </Link>
          </Grid>
          <Grid item xs={6}>
            <Link href="#" color="inherit" sx={{ display: 'block', marginBottom: '5px' }}>
            {t('Games')}
            </Link>
            <Link href="#" color="inherit" sx={{ display: 'block', marginBottom: '5px' }}>
            {t('AboutUs')}
            </Link>
            <Link href="#" color="inherit" sx={{ display: 'block', marginBottom: '5px' }}>
            {t('Features')}
            </Link>
            <Link href="#" color="inherit" sx={{ display: 'block', marginBottom: '5px' }}>
            {t('contact')}
            </Link>
            <Link href="#" color="inherit" sx={{ display: 'block', marginBottom: '5px' }}>
            {t('Terms')}
            </Link>
          </Grid>
        </Grid>
      </Grid>

      {/* Right Section - Feedback and Languages */}
      <Grid item xs={12} sm={4}>
        <Typography variant="h6" sx={{ marginBottom: '10px', fontWeight: 'bold' }}>
        {t('feedback')}
        </Typography>
        <TextField
          placeholder={t('message')}
          variant="outlined"
          fullWidth
          sx={{ marginBottom: '10px' }}
        />
        <Button
          variant="contained"
          sx={{ backgroundColor: '#4B7857', color: '#fff', display: 'block', marginBottom: '10px' }}
        >
          {t('submit')}
        </Button>

        <Typography variant="h6" sx={{ marginBottom: '10px', fontWeight: 'bold' }}>
        {t('Language')}
        </Typography>
        <Box>
          <Link href="#" color="inherit" sx={{ marginRight: '15px' }}>
          {t('Eng')}
          </Link>
          <Link href="#" color="inherit">
          {t('Arab')}
          </Link>
        </Box>
      </Grid>

    </Grid>
  </Box>
  );
}

export default Footer;