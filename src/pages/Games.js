import React from 'react';
import { Box, Typography, Paper, TextField, Button, Grid, IconButton } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import EditIcon from '@mui/icons-material/Edit';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

function Games() {
  return (
    <Box
      sx={{
        padding: '20px',
        backgroundColor: '#f9f9f9',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* Header Section */}
      <Typography variant="h3" sx={{ marginBottom: '10px', textAlign: 'center' }}>
        Create your game
      </Typography>
      <Typography variant="subtitle1" sx={{ marginBottom: '30px', textAlign: 'center' }}>
        Select a template to learn more
      </Typography>

      {/* Game Templates Section */}
      <Grid container spacing={2} sx={{ marginBottom: '40px', justifyContent: 'center' }}>
        {[1, 2].map((item, index) => (
          <Grid item key={index} xs={12} md={5} lg={4}>
            <Paper
              elevation={3}
              sx={{
                padding: '20px',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  height: '150px',
                  backgroundColor: '#e0e0e0',
                  marginBottom: '15px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {/* Placeholder for image */}
                <Typography variant="h6">Image</Typography>
              </Box>
              <Typography variant="h5" sx={{ marginBottom: '10px' }}>
                Game {index + 1}
              </Typography>
              <Typography variant="body1" textAlign="center">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. At purus tellus arcu
                sit nibh consectetur.
              </Typography>
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

      {/* Suggestions Section */}
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
                  {/* Placeholder for image */}
                  <Typography variant="h6">Image</Typography>
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
      </Box>
    </Box>
  );
}

export default Games;
