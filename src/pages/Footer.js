import React from 'react';
import { Box, Typography, Link, Grid, Button, TextField } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import logo from '../Assets/logoF.png'
function Footer() {
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
          Site map
        </Typography>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Link href="/" color="inherit" sx={{ display: 'block', marginBottom: '5px' }}>
              Home
            </Link>
            <Link href="#" color="inherit" sx={{ display: 'block', marginBottom: '5px' }}>
              Privacy policy
            </Link>
            <Link href="#" color="inherit" sx={{ display: 'block', marginBottom: '5px' }}>
              Price plans
            </Link>
            <Link href="#" color="inherit" sx={{ display: 'block', marginBottom: '5px' }}>
              School plans
            </Link>
            <Link href="#" color="inherit" sx={{ display: 'block', marginBottom: '5px' }}>
              Community
            </Link>
          </Grid>
          <Grid item xs={6}>
            <Link href="#" color="inherit" sx={{ display: 'block', marginBottom: '5px' }}>
              Game templates
            </Link>
            <Link href="#" color="inherit" sx={{ display: 'block', marginBottom: '5px' }}>
              About us
            </Link>
            <Link href="#" color="inherit" sx={{ display: 'block', marginBottom: '5px' }}>
              How to play
            </Link>
            <Link href="#" color="inherit" sx={{ display: 'block', marginBottom: '5px' }}>
              Contact us
            </Link>
            <Link href="#" color="inherit" sx={{ display: 'block', marginBottom: '5px' }}>
              Terms & conditions
            </Link>
          </Grid>
        </Grid>
      </Grid>

      {/* Right Section - Feedback and Languages */}
      <Grid item xs={12} sm={4}>
        <Typography variant="h6" sx={{ marginBottom: '10px', fontWeight: 'bold' }}>
          Share your feedback
        </Typography>
        <TextField
          placeholder="Type here"
          variant="outlined"
          fullWidth
          sx={{ marginBottom: '10px' }}
        />
        <Button
          variant="contained"
          sx={{ backgroundColor: '#4B7857', color: '#fff', display: 'block', marginBottom: '10px' }}
        >
          Submit
        </Button>

        <Typography variant="h6" sx={{ marginBottom: '10px', fontWeight: 'bold' }}>
          Languages
        </Typography>
        <Box>
          <Link href="#" color="inherit" sx={{ marginRight: '15px' }}>
            English
          </Link>
          <Link href="#" color="inherit">
            Arabic
          </Link>
        </Box>
      </Grid>

    </Grid>
  </Box>
  );
}

export default Footer;