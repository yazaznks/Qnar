import React, { useState, useEffect }  from 'react'
// quicksand, burger menubar, email send, main bg boy and girl
import {Box, Typography, TextField, Button, Paper } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { useLocation } from 'wouter';
import videoSrc from '../Assets/sample.mp4'
import back from '../Assets/backgroundM.png';
import VideoBGMobile from '../Assets/videoBGMobile.png'; // Path to the first image
import girl from '../Assets/girl.png'; // Path to the second image
import boy from '../Assets/boy.png'
import mobileDots from '../Assets/mobileDots.png'; // Path to the second image
import HowBG from '../Assets/HowToBG.png'
import VideoBG from '../Assets/videoBG.png'
import story from '../Assets/story.png'
import backBubble from '../Assets/backBubble.png'
import knar from '../Assets/Knar.png'
import phone from '../Assets/phone.png'
import email from '../Assets/email.png'
import location from '../Assets/location.png'

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { HolidayVillage, PictureAsPdfSharp,  } from '@mui/icons-material';

import UseMediaQuery from '@mui/material/useMediaQuery';



function PageLanding() {
  const IsMobile = UseMediaQuery('(max-width:700px)');
  const phoneNumber = '+97433477044';
  const emailAddress = 'contact@qnarweb.com'
  const Is900 = UseMediaQuery('(max-width:900px)');
  const Is1200 = UseMediaQuery('(max-width:1200px)');
  const [email, setEmail] = useState('');

  // Initialize IndexedDB
  const initDB = () => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('emailDatabase', 1);

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        // Create an object store with a primary key
        db.createObjectStore('emails', { keyPath: 'id', autoIncrement: true });
      };

      request.onsuccess = (event) => {
        resolve(event.target.result);
      };

      request.onerror = (event) => {
        reject('Error opening IndexedDB:', event.target.errorCode);
      };
    });
  };

  // Save email to IndexedDB
  const saveEmail = async (email) => {
    try {
      const db = await initDB();
      const transaction = db.transaction(['emails'], 'readwrite');
      const store = transaction.objectStore('emails');
      store.add({ email: email });
      transaction.oncomplete = () => {
        console.log('Email saved successfully!');
      };
      transaction.onerror = (event) => {
        console.error('Error saving email:', event.target.errorCode);
      };
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveEmail(email);
    setEmail(''); // Clear the text field after saving
  };

  return (
    <Box sx={{overflow: 'hidden',display: 'flex',flexDirection:'column'}}>

        <Box sx={{position: 'relative',flex: 1, display: 'flex', alignContent:'center', alignItems: 'center',
          '@media (max-width: 700px)': { // 'sm' breakpoint
            height:'10vh',
            flex:0.5
            
          },
        }}>
        <img className="responsive-img" src={back} alt="Background"  />
       
        <Paper
  elevation={3}
  sx={{
    padding: '5vh',
    width: '30vw',
    maxWidth: '100%',
    minHeight:'70%',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    top: '10%',
    left: '30%',
    zIndex: 2,
    backgroundColor: 'rgba(207, 231, 213, 0.8)',
    color: '#3B5D44',
    textAlign: 'center',
    // Responsive width with manually defined breakpoints
    '@media (max-width: 960px)': { // 'md' breakpoint
      width: '30vw',
      height: '40vh',
      left: '30%',
    },
    '@media (max-width: 700px)': { // 'sm' breakpoint
      top: '50%', /* Position from the top */
  left: '50%', /* Position from the left */
  transform: 'translate(-50%, -50%)',
      width: '80%',
     
    },
    '@media (max-width: 500px)': { // 'md' breakpoint
      width: '60%',
     
    },

  }}
>
  <Typography
    variant="h3"
    gutterBottom
    sx={{
      // Responsive font size
    
      fontWeight: 'bold',
      fontSize: '2vw',
'@media (max-width: 700px)': { // 'sm' breakpoint
      fontSize: '4vw',
    },
    }}
  >
    Inspiring Educators Exceptional Learners
  </Typography>
  <Typography
  
    variant="h6"
    sx={{
      // Responsive font size
      fontSize: '1vw',
      '@media (max-width: 700px)': { // 'sm' breakpoint
      fontSize: '3vw',
    },
    }}
  >
    Engage Students Like Never Before with Fun and Educational Games Tailored to Your Curriculum
  </Typography>
  <br />
  <Button
    variant="contained"
    sx={{
      backgroundColor: '#4B7857',
      color: '#fff',
      // Responsive button size
      '@media (max-width: 960px)': { // 'md' breakpoint
        fontSize: '0.875rem',
      },
      '@media (max-width: 600px)': { // 'sm' breakpoint
        fontSize: '0.75rem',
      },
    }}
  >
    Join us now! <ArrowForwardIcon />
  </Button>
</Paper>
      
      </Box>
      <Box  sx={{
        backgroundColor:'#E6F8EB',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding:'10px',
        zIndex: 3,
        textAlign: 'center',
      }}>
        <Typography style={{color: '#3B5D44'}} variant="h4" gutterBottom>
        Don’t Miss Out!          </Typography>
          <Typography style={{color: '#3B5D44'}} variant="h6">
          Join our community to receive exclusive updates and early access to our groundbreaking educational gaming platform.          </Typography><br></br>
          <Typography  variant="h6" style={{color: '#3B5D44'}} >Enter your email</Typography>
          <Box sx={{ flex: 1,
        display: 'flex',
        flexDirection: 'Row',
        padding:'10px',
        
      }}>
          <TextField onChange={(e) => setEmail(e.target.value)} style={{background: '#ffffff'}}></TextField>
          <Button variant="contained" sx={{ backgroundColor: '#4B7857', color: '#fff', margin:'5px'  }}>
                  Submit
                </Button></Box>
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
          
          background: `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url(${HowBG})`,
          backgroundSize: 'cover', // Cover the entire area
          backgroundPosition: 'center', // Center the image
          backgroundRepeat: 'no-repeat',
          
          
        }}
      >
  
  <Typography
        variant="h2"
        gutterBottom
        sx={{
          textAlign: 'center',
          color: '#3B5D44',
          margin: '20px 0', // Adjust margin as needed
          display: Is900 ? 'block' : 'none', // Hide on larger screens
        }}
      >
        How to Play!
      </Typography>
        {/* Video Frame */}
        <Box
          sx={{
            flex: 1,
            
            
          //   justifyContent: 'center',
          //   alignItems: 'center',
          //   marginLeft:'-1.5vw',
          //   marginBottom:'20vh',
          //   padding:'5vw',
          //   width: 'auto', // Adjust width as needed
          //   height: 'auto',
          //   maxWidth: '32vw',
          //   maxHeight: '60vh',
          //   backgroundImage: `url(${Is900? VideoBGMobile : VideoBG})`,
          // backgroundSize: 'contain', // Cover the entire area
          // backgroundPosition: 'center', // Center the image
          // backgroundRepeat: 'no-repeat', // Prevent repeating the image
          // overflow: 'hidden', 
          // className:"responsive-HowTo"
        }}
        >
           <div className="circle-container">
      <img src={(Is900? VideoBGMobile : VideoBG)} alt="Background" className="background-image" />
      <div className="circle-video-wrapper">
        <video src={videoSrc} controls autoPlay  muted loop className="circle-video" />
      </div>
    </div>
        </Box>

        {/* Text Content */}
        <Box
          sx={{
            flex: 1,
            padding: '20px',
            textAlign: 'center',
            color: '#3B5D44',
            
          }}
        >
           <Typography
        variant="h2"
        gutterBottom
        sx={{
          textAlign: 'center',
          color: '#3B5D44',
          margin: '20px 0', // Adjust margin as needed
          display: Is900 ? 'none' : 'block', // Hide on larger screens
        }}
      >
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
          textAlign: 'center'
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
        className="story"
        style={{
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
          textAlign: 'center'
          
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
            maxWidth: Is900? '80%':'60%',   
            display: 'flex',
            flexDirection: { xs: 'column', lg: 'row' }, 
            backgroundColor: '#F9F9ED',
            color: '#3B5D44',
            marginTop: '5vh',
            marginBottom: '5vh'
          }}
        >
          <Typography variant="h2" sx={{display: Is1200 ? 'block' : 'none',textAlign:'center'}} gutterBottom>
          What is Qnar?          </Typography>
            <Box
          sx={{
            flex: 0.5,
            padding: '10px',
            textAlign: 'center',
            color: '#3B5D44'
          }}
        >
          
            <img
        src={knar}
        alt="Background"
        className="knar"
        style={{
          // Adjust height as needed
          zIndex: 1, // Ensure it is behind other content
        }}
      />
        </Box>
        <Box
          sx={{
            flex: 1,
            padding: '20px',
            textAlign: Is900?'center' : 'left',
            color: '#3B5D44'
          }}
        >
          <Typography variant="h2" sx={{display: Is1200 ? 'none' : 'block',}} gutterBottom>
          What is Qnar?          </Typography>
          <Typography variant="h6">
          <span style={{ color: '#EB8576' }}>Qnar</span>, or "Knar," is the fruit borne by the Sidra tree, revered in the <span style={{ color: '#EB8576' }}>Quran</span>.
           This tree thrives in the challenging climate of <span style={{ color: '#EB8576' }}>Qatar</span>,
            symbolizing resilience and abundance. Renowned for its numerous benefits to human health, the name Qnar was chosen to reflect the enriching knowledge and understanding that our platform offers, nurturing mental and life skills.          </Typography>
        
               </Box>
        </Paper>
        </Box>
        <Box  sx={{
      
      flex: 1,
      display: 'flex',
      flexDirection: { sm: 'row', md: 'column' }, 
      alignItems: 'center',
      justifyContent: 'center',
      // backgroundImage: `url(${backBubble})`,
      //   backgroundSize: 'cover', // Cover the entire area
      //   backgroundPosition: 'center', // Center the image
      //   backgroundRepeat: 'no-repeat', // Prevent repeating the image
        color: '#F5FFF8',
        padding: "10px"
        
    }}>
      </Box>
      <Box sx={{flex: 1,display: 'flex',alignItems: 'center', justifyContent: 'center',}}><Typography style={{color:'#3B5D44'}} variant='h2'>Contact Us</Typography></Box>
      <Box sx={{flex: 1,display: 'flex',  flexDirection: 'row',alignItems: 'center', justifyContent: 'center'}}>
      <a style={{marginRight:'5vw'}} href={`tel:${phoneNumber}`}><img className="contactIMG" src={phone}alt="Background"/></a>
      <a style={{marginRight:'5vw'}} href={`mailto:${emailAddress}`}>< img  className="contactIMG" src={email}alt="Background"/></a>
      <a ><img className="contactIMG" src={location}alt="Background"/></a></Box>
    <Box
      sx={{
        display: 'flex',
        flexDirection: {xs:'column', md:'row'}, // Column on small screens, row on larger
        justifyContent: 'space-between',
        padding: '2rem',
        gap: '2rem',
        
      }}
    >
      {/* Left Box: Contact Form */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '2rem',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          borderRadius: '10px',
          backgroundColor: '#f9f9f9',
        }}
      >
        <Typography variant="h4" gutterBottom style={{color:'#3B5D44'}}>Get in touch with us
     
        </Typography>

        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Message"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          margin="normal"
        />

        <Button
          variant="contained"
          sx={{ backgroundColor: '#4B7857', color: '#fff', marginTop: '1rem' }}
        >
          Submit
        </Button>
      </Box>

      {/* Right Box: Map */}
      <Box
        sx={{
          flex: 1,
          height: '100%',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          borderRadius: '10px',
          overflow: 'hidden',
         
          height: '80vh',
        }}
      >
<iframe
    title="Map"
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1516.29725708653!2d51.43723384478978!3d25.32492686717924!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e45dc1b48888243%3A0xc99991c5589f3b25!2sQatar%20Science%20and%20Technology%20Park!5e0!3m2!1sen!2sjo!4v1726347410248!5m2!1sen!2sjo"
    width="100%"
    height="100%"
    style={{ border: 0 }} // Properly passing the style object here
    allowFullScreen=""
    loading="lazy"
  ></iframe>  </Box>
    </Box></Box>
  )
}

export default PageLanding