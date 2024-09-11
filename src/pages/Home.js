import React from 'react';
import { Box, Typography, Grid, Card, CardContent, Container, Button, Paper } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { useLocation } from 'wouter';

import backgroundImage from '../Assets/Background.png';
import videoSrc from '../Assets/sample.mp4';



function HomePage() {
    const [location, setLocation] = useLocation();
    
    
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Main Content */}
      <Box
        sx={{
          flexGrow: 1,
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'right',
          backgroundRepeat: 'no-repeat',
          padding: '250px 0',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: '20px',
            width: '300px',
            maxWidth: '90%',
            position: 'absolute',
            left: '10%',
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: 'rgba(207, 231, 213, 0.7)',
            color: '#3B5D44',
          }}
        >
          <Typography variant="h4" gutterBottom>
            Stylish Box Title
          </Typography>
          <Typography variant="body1">
            This is some stylish text inside a box. You can add more content here.
          </Typography>
        </Paper>
      </Box>

      {/* New Section */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          backgroundColor: '#f9f9f9',
        }}
      >
        {/* Video Frame */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            padding: '10px',
          }}
        >
          <video
            src={videoSrc}
            controls
            style={{ width: '100%', maxWidth: '500px' }}
          />
        </Box>

        {/* Text Content */}
        <Box
          sx={{
            flex: 1,
            padding: '20px',
            textAlign: 'center',
          }}
        >
          <Typography variant="h4" gutterBottom>
            How to Play
          </Typography>
          <Typography variant="body1" paragraph>
            Learn the basics of the game and get started with this quick tutorial.
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            sx={{ marginRight: '10px' }}
            onClick={() => setLocation('/learn-more')}
          >
            Learn More
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setLocation('/play-now')}
          >
            Play Now
          </Button>
        </Box>
      </Box>

      {/* Our Sponsors Section */}
      <Box sx={{ backgroundColor: '#f9f9f9', padding: '40px 0' }}>
        <Container>
          <Typography variant="h4" align="center" sx={{ marginBottom: '20px', color: '#3B5D44' }}>
            Our Sponsors
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={6} md={3}>
              <img src="https://via.placeholder.com/150" alt="Sponsor 1" style={{ width: '50%' }} />
            </Grid>
            <Grid item xs={6} md={3}>
              <img src="https://via.placeholder.com/150" alt="Sponsor 2" style={{ width: '50%' }} />
            </Grid>
            <Grid item xs={6} md={3}>
              <img src="https://via.placeholder.com/150" alt="Sponsor 3" style={{ width: '50%' }} />
            </Grid>
            <Grid item xs={6} md={3}>
              <img src="https://via.placeholder.com/150" alt="Sponsor 4" style={{ width: '50%' }} />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Reviews from Our Users Section */}
      <Box sx={{ backgroundColor: '#F4AAAB', padding: '40px 0', flexGrow: 1 }}>
        <Container>
          <Typography variant="h4" align="center" sx={{ marginBottom: '20px', color: '#fff' }}>
            Reviews from our users
          </Typography>
          <Grid container spacing={4}>
            {[1, 2, 3, 4].map((_, index) => (
              <Grid item xs={12} md={3} key={index}>
                <Card sx={{ backgroundColor: '#fff', padding: '20px' }}>
                  <CardContent>
                    <Typography variant="body1" sx={{ marginBottom: '10px', color: '#3B5D44' }}>
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor."
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                      {[1, 2, 3, 4, 5].map((_, index) => (
                        <StarIcon key={index} sx={{ color: '#FFD700' }} />
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

    </Box>
  );
}

export default HomePage;
