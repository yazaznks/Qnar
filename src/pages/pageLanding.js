import React from 'react'

import {Box, Typography, TextField, Button, Paper } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { useLocation } from 'wouter';
import videoSrc from '../Assets/sample.mp4'
import back from '../Assets/back.png';
import boy from '../Assets/boy.png'; // Path to the first image
import girl from '../Assets/girl.png'; // Path to the second image
import dots from '../Assets/dots.png'; // Path to the second image
import HowBG from '../Assets/HowToBG.png'
import VideoBG from '../Assets/videoBG.png'
import story from '../Assets/story.png'
import backBubble from '../Assets/backBubble.png'
import knar from '../Assets/Knar.png'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { HolidayVillage } from '@mui/icons-material';
function pageLanding() {
  return (
    <Box
        sx={{
          overflow: 'hidden',
          display: 'flex',
          flexDirection:'column',  
          height: '450vh',
        }}
      >
        <Box sx={{
        
        position: 'relative',
        flex: 1,
        display: 'flex',
          
        }}>
        <img
        src={back}
        alt="Background"
        style={{
          position: 'absolute',
          right: 0,
          top: '40%',
          transform: 'translateY(-50%)', // Center the image vertically
          width: '40%',
          height: '80vh', // Adjust height as needed
          zIndex: 1, // Ensure it is behind other content
        }}
      />
        <img
          src={boy}
          alt="First decorative"
          style={{
            position: 'absolute',
            width: '20vw', // Adjust the width as needed
            height: 'auto',
            top: '120px',
            right: '40px',
            zIndex: 2, 
          }}
        />
        <img
          src={girl}
          alt="Second decorative"
          style={{
            position: 'absolute',
            width: '17vw', // Adjust the width as needed
            height: 'auto',
            top: '120px', // Adjust to position below the first image
            right: '400px',
            zIndex: 2, 
          }}
        />
      
        <Paper
          elevation={3}
          sx={{
            padding: '20px',
            width: '400px',
            maxWidth: '100%',
            position: 'absolute',
            alignItems: 'center',
          justifyContent: 'center',
          display: 'flex',
          flexDirection: 'column',
            left: '20%',
            top: '40%',
            transform: 'translateY(-50%)',
            backgroundColor: 'rgba(207, 231, 213, 0.7)',
            color: '#3B5D44',
          }}
        >
          <Typography variant="h4" gutterBottom>
          Inspiring Educators Exceptional Learners
          </Typography>
          <Typography variant="body1">
          Engage Students Like Never Before with Fun and Educational Games Tailored to Your Curriculum
          </Typography><br></br>
          <Button variant="contained" sx={{ backgroundColor: '#4B7857', color: '#fff',  }}>
                  Join us now!    <ArrowForwardIcon/>
                </Button>
        </Paper>
        <img
          src={dots}
          alt="Second decorative"
          style={{
            position: 'absolute',
            width: 'auto', // Adjust the width as needed
            height: 'auto',
            top: '60px', // Adjust to position below the first image
            left: '10px',
            zIndex: 2, 
          }}
        />
      </Box>
      <Box  sx={{
        backgroundColor:'#E6F8EB',
        flex: 0.7,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
   
        zIndex: 3
      }}>
        <Typography style={{color: '#3B5D44'}} variant="h4" gutterBottom>
        Don’t Miss Out!          </Typography>
          <Typography style={{color: '#3B5D44'}} variant="body1">
          Join our community to receive exclusive updates and early access to our groundbreaking educational gaming platform.          </Typography><br></br>
          <Typography style={{color: '#3B5D44'}}>Enter your email</Typography>
          <TextField style={{background: '#ffffff'}}></TextField>
          <Button variant="contained" sx={{ backgroundColor: '#4B7857', color: '#fff',  }}>
                  Submit
                </Button>
      </Box>

       {/* New Section */}
       <Box
        sx={{
            flex:0.8,
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          backgroundColor: '#f9f9f9',
          backgroundImage: `url(${HowBG})`,
          backgroundSize: 'cover', // Cover the entire area
          backgroundPosition: 'center', // Center the image
          backgroundRepeat: 'no-repeat', // Prevent repeating the image
        }}
      >
  

        {/* Video Frame */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft:'-1.5vw',
            paddingRight:'5vw',
            width: '100%', // Adjust width as needed
            height: '60vw',
            maxWidth: '500px',
            maxHeight: '500px',
            backgroundImage: `url(${VideoBG})`,
          backgroundSize: 'cover', // Cover the entire area
          backgroundPosition: 'center', // Center the image
          backgroundRepeat: 'no-repeat', // Prevent repeating the image
          overflow: 'hidden', 
        }}
        >
            <div class="rc">
          <video
            src={videoSrc}
            controls
            class="video-circle"
            width="420" height="400"
          /></div>
        </Box>

        {/* Text Content */}
        <Box
          sx={{
            flex: 1,
            padding: '20px',
            textAlign: 'center',
            color: '#3B5D44'
          }}
        >
          <Typography variant="h2" gutterBottom>
            How to Play!
          </Typography>
          <Typography variant="h6" paragraph>
          Create your game by choosing a template, adding questions and content, and setting the difficulty. Assign the game to your students and enjoy watching them learn interactively. Review their performance to improve your teaching.          </Typography>
          
        </Box>
      </Box>
      <Box
        sx={{
            flex:0.8,
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          backgroundColor: '#F4DADA',
        }}
      >
        <Box
          sx={{
            flex: 1,
            padding: '20px',
            textAlign: 'center',
            color: '#3B5D44'
          }}
        >
          <Typography variant="h2" gutterBottom>
          Our story
          </Typography>
          <Typography style={{color:'#C36759'}} variant="h4" gutterBottom>
          From PowerPoint slide to gaming website
          </Typography>
          
          <Typography variant="h6" paragraph>
          Qnar was born from the pressing need for an educational gaming platform that resonates with Arab students' cultural identity. Samah, the founder of Qnar, a science teacher at a primary school with a deep-rooted belief in the transformative power of technology in education. Her vision is to harness these tools to enrich the Arab and Islamic identity while enhancing the learning experience.           </Typography>
          
        </Box><Box
          sx={{
            flex: 1,
            padding: '20px',
            textAlign: 'center',
            color: '#3B5D44'
          }}
        >
          <img
        src={story}
        alt="Background"
        style={{
        
          width: 'auto',
          height: '60vh', // Adjust height as needed
          zIndex: 1, // Ensure it is behind other content
        }}
      />
        </Box>
        </Box>

        {/* new section */}
        <Box  sx={{
      
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: `url(${backBubble})`,
          backgroundSize: 'cover', // Cover the entire area
          backgroundPosition: 'center', // Center the image
          backgroundRepeat: 'no-repeat', // Prevent repeating the image
          color: '#3B5D44',
          
      }}>
        <Typography variant="h2" gutterBottom>
          Our Mission
          </Typography>
          <Typography style={{color:'#C36759'}} variant="h4" gutterBottom>
          Educational Games Driving Positive Change
          </Typography>
          
          <Typography variant="h6" style={{ paddingLeft: '5vw', paddingRight: '5vw'}} paragraph>
          We believe that educational games are a powerful tool for improving learning and promoting Arab and Islamic values. Through our platform, we strive to empower teachers to design interactive and innovative educational games that enrich the learning experience for students and help them succeed.
          </Typography>
          <Paper
          elevation={3}
          sx={{
            padding: '20px',      
            maxWidth: '80%',   
            display: 'flex',
            flexDirection: 'row',  
            backgroundColor: '#F9F9ED',
            color: '#3B5D44',
            marginTop: '5vh'
          }}
        >
            <Box
          sx={{
            flex: 1,
            padding: '20px',
            textAlign: 'center',
            color: '#3B5D44'
          }}
        >
            <img
        src={knar}
        alt="Background"
        style={{
        
          width: 'auto',
          height: '30vh', // Adjust height as needed
          zIndex: 1, // Ensure it is behind other content
        }}
      />
        </Box>
        <Box
          sx={{
            flex: 1,
            padding: '20px',
            textAlign: 'center',
            color: '#3B5D44'
          }}
        >
          <Typography variant="h2" gutterBottom>
          What is Qnar?          </Typography>
          <Typography variant="h6">
          <span style={{ color: '#EB8576' }}>Qnar</span>, or "Knar," is the fruit borne by the Sidra tree, revered in the <span style={{ color: '#EB8576' }}>Quran</span>.
           This tree thrives in the challenging climate of <span style={{ color: '#EB8576' }}>Qatar</span>,
            symbolizing resilience and abundance. Renowned for its numerous benefits to human health, the name Qnar was chosen to reflect the enriching knowledge and understanding that our platform offers, nurturing mental and life skills.          </Typography>
        
               </Box>
        </Paper>
        </Box>
    
      </Box>
  )
}

export default pageLanding