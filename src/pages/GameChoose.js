import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, TextField, Button, Grid, IconButton } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import EditIcon from '@mui/icons-material/Edit';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import wheel from '../Assets/spinIcon.png'
import { useTranslation } from 'react-i18next';
import { useLocation } from 'wouter';
function GameChoose({game}) {
    const {t, i18n} = useTranslation();
    const [location, setLocation] = useLocation();
    const [games, setGames] = useState([{}]);
    const randomGames = [
        { title: 'الأحياء صف: 4-3', createdBy: 'John Doe', image: wheel },
        { title: 'رياضيات: ضرب', createdBy: 'Jane Smith', image: {wheel} },
        { title: 'English: past tenses', createdBy: 'Alice Johnson', image: {wheel} },
        { title: 'اسئلة عامة', createdBy: 'Bob Brown', image: {wheel}},
      ];
    useEffect(() => {
        // Fetch all games when the component mounts
        GetGames().then(setGames);
    }, []);

    const GetGames = async () => {
        try {
          const response = await fetch('http://127.0.0.1:8000/api/games/limited/', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          const data = await response.json();
          console.log('Games:', data)
          return data; // Return the game ID for creating questions
        } catch (error) {
          console.error('Error posting game:', error);
        }
    };
  return (
    <div style={{  backgroundColor: '#F9F9ED' ,color :'#4B7857' }}>
    {/* Game Icon and Description */}
    <Box sx={{ display: 'flex', padding: '20px', flexDirection: 'row', justifyContent: 'center' }}>
        <img src={wheel} alt="Game Icon" style={{ width: '20vw', height: 'auto', marginRight:'20px' , marginLeft:'20px'}} />
        <Box>
        <Typography  variant="h3" style={{ fontWeight:'bold'}}gutterBottom>{t('SpinningH1')}</Typography>
        <Typography variant="h6">{t('SpinningH2')}</Typography>
        </Box>
    </Box>
    <Paper style={{ padding: '20px', marginBottom: '20px', marginLeft: 20, marginRight:20 ,color :'#4B7857', fontWeight:'bold'}}>
       {/* Rendering 4 random papers inside each main paper */}
       <Grid container spacing={2}>
            {randomGames.map((item, idx) => (
                <Grid item key={idx} xs={12} sm={3}>
                    <Paper
                        elevation={3}
                        sx={{
                            width: '100%',
                            padding: '20px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            cursor: 'pointer',
                        }}
                        onClick={() => setLocation('/PlayGame')}
                    >
                        <Box
                            sx={{
                                width: '100%',
                                height: '235px',
                                backgroundImage: `url(${item.image})`,
                                backgroundSize: 'contain', // Ensure image covers the entire box
                                backgroundPosition: 'center', // Center the image within the box
                                backgroundRepeat: 'no-repeat',
                                marginBottom: '10px',
                                
                            }}
                        />
                        <Typography variant="subtitle1" style={{color:'#4B7857'}}>{item.title}</Typography>
                        <Typography variant="body2" color="textSecondary">
                            Created by {item.createdBy}
                        </Typography>
                    </Paper>
                </Grid>
            ))}
        </Grid>

    </Paper></div>
  )
}

export default GameChoose