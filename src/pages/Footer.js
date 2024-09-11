import React from 'react';
import { Box, Typography, Link, Grid, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: '#3B5D44',
        color: '#fff',
        padding: '20px 0',
        marginTop: '40px',
        width: '100%',
        bottom:0
      }}
    >
      <Grid container spacing={3} sx={{ justifyContent: 'center', textAlign: 'center' }}>
        {/* Section 1: Quick Links */}
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" sx={{ marginBottom: '10px' }}>
            Quick Links
          </Typography>
          <Link href="/" color="inherit" sx={{ display: 'block', marginBottom: '5px' }}>
            Home
          </Link>
          <Link href="#" color="inherit" sx={{ display: 'block', marginBottom: '5px' }}>
            About Us
          </Link>
          <Link href="#" color="inherit" sx={{ display: 'block', marginBottom: '5px' }}>
            Features
          </Link>
          <Link href="/Games" color="inherit" sx={{ display: 'block', marginBottom: '5px' }}>
            Games
          </Link>
        </Grid>

        {/* Section 2: Contact Us */}
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" sx={{ marginBottom: '10px' }}>
            Contact Us
          </Typography>
          <Typography variant="body2">Office address</Typography>
          <Typography variant="body2">Doha, Qatar</Typography>
          <Typography variant="body2">Email: contact@Qnar.com</Typography>
          <Typography variant="body2">Phone: +123 456 7890</Typography>
        </Grid>

        {/* Section 3: Follow Us */}
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" sx={{ marginBottom: '10px' }}>
            Follow Us
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <IconButton href="#" sx={{ color: '#fff' }}>
              <FacebookIcon />
            </IconButton>
            <IconButton href="#" sx={{ color: '#fff' }}>
              <TwitterIcon />
            </IconButton>
            <IconButton href="#" sx={{ color: '#fff' }}>
              <InstagramIcon />
            </IconButton>
          </Box>
        </Grid>
      </Grid>

      <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
        <Typography variant="body2">&copy; 2024 Qnar. All rights reserved.</Typography>
      </Box>
    </Box>
  );
}

export default Footer;