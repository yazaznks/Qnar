import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, TextField, Button, Grid, IconButton } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import EditIcon from '@mui/icons-material/Edit';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import wheel from '../Assets/spinIcon.png'
import { useTranslation } from 'react-i18next';
import { useLocation } from 'wouter';
import GameChoose from './GameChoose';
function Games() {
  const {t, i18n} = useTranslation();
  const [location, setLocation] = useLocation();
  const [games, setGames] = useState(
    [
      { title: '', description: '' , image: null },
      { title: '', description: '' , image: null },
      { title: '', description: '' , image: null },

    ]);
    useEffect(() => {
      setGames([
        { 
          title: 'Spinning Wheel', 
          description: t('SpinningH2'), 
          image: wheel 
        },
        // Add more games as needed
      ]);
    }, [t]);
  return (
    <Box
      sx={{
        padding: '20px',
        backgroundColor: '#F9F9ED',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color :'#4B7857' 
      }}
    >
      {/* Header Section */}
      <Typography variant="h3" sx={{ marginBottom: '10px', textAlign: 'center' }}>
        Create your game
      </Typography>
      <Typography variant="subtitle1" sx={{ marginBottom: '30px', textAlign: 'center' }}>
        Select a template to start creating a game
      </Typography>

      <Grid
  container
  spacing={4}
  sx={{ marginBottom: '40px', justifyContent: 'center' }}
  
>
  {games.map((item, index) => (
    <Grid
      item
      key={index}
      xs={12}
      md={6}
      sx={{ display: 'flex', justifyContent: 'center' }}
    >
      <Paper
        elevation={3}
        sx={{
          width: '100%',
          maxWidth: '600px', // Ensure max width to prevent excessive stretching
          padding: '20px',
          height: '100%',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' }, // Column on small, row on medium and up
          alignItems: 'center',
          cursor: 'pointer',
        }}
        onClick={() => setLocation('/GameSelect')}
      >
        <Box
          sx={{
            width: { xs: '100%', md: '50%' }, // Full width on small, half on medium and up
            height: '150px',

            marginBottom: { xs: '15px', md: '0' }, // Space below image on small screens
            display: 'flex',
            padding: '20px',
            color :'#4B7857' ,
            backgroundImage: `url(${item.image})`,
          backgroundSize: 'cover', // Cover the entire area
          backgroundPosition: 'center', // Center the image
          backgroundRepeat: 'no-repeat', 
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Placeholder for image */}
        </Box>
        <Box
          sx={{
            width: { xs: '100%', md: '50%' }, // Full width on small, half on medium and up
            paddingLeft: { md: '20px' },
            color :'#4B7857' , // Space between image and description on larger screens
          }}
        >
          <Typography variant="h5" sx={{ marginBottom: '10px', fontWeight: 'bold' }}>
            {item.title}
          </Typography>
          <Typography variant="body1" textAlign="left">
          {item.description}
          </Typography>
        </Box>
      </Paper>
    </Grid>
  ))}
</Grid>


      {/* Search Section */}
      <Box sx={{ marginBottom: '30px', width: '100%', textAlign: 'center' }}>
        <Typography variant="h5" sx={{ marginBottom: '10px' }}>
          Search in our community
        </Typography>
        <Box sx={{ display: 'inline-flex', alignItems: 'center', width: '80%', maxWidth: '500px' }}>
          <TextField
            variant="outlined"
            fullWidth
            placeholder="Search"
            sx={{ marginRight: '10px' }}
          />
          <Button variant="contained" sx={{ backgroundColor: '#3B5D44', color: '#fff' }}>
            Search
          </Button>
        </Box>
      </Box>
{/* 
      Suggestions Section
      <Box sx={{ width: '100%', textAlign: 'center' }}>
        <Typography variant="h5" sx={{ marginBottom: '20px' }}>
          Suggestions
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          {[1, 2, 3, 4, 5, 6].map((item, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
              <Paper
                elevation={3}
                sx={{
                  padding: '15px',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    height: '100px',
                    backgroundColor: '#e0e0e0',
                    marginBottom: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  /* Placeholder for image */
 /*                 <Typography variant="h6">Image</Typography>
                </Box>
                <Typography variant="h6" sx={{ marginBottom: '5px' }}>
                  Game Name
                </Typography>
                <Typography variant="body2" sx={{ marginBottom: '10px' }}>
                  Author name
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: '5px' }}>
                  <IconButton color="primary">
                    <PlayArrowIcon />
                  </IconButton>
                  <IconButton color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton color="primary">
                    <FavoriteBorderIcon />
                  </IconButton>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box> */}
    </Box>
  );
}

export default Games;
