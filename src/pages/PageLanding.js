import React, { useState, useEffect }  from 'react'
// quicksand, burger menubar, email send, main bg boy and girl
import {Box, Typography, TextField, Button, Paper, Dialog, DialogContent, DialogActions, IconButton} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { useLocation } from 'wouter';
import videoSrc from '../Assets/sample.mp4';
import VideoAR from '../Assets/sampleAr.mp4';
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
import emailPic from '../Assets/email.png'
import location from '../Assets/location.png'
import emailjs from 'emailjs-com';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useTranslation } from 'react-i18next';
import UseMediaQuery from '@mui/material/useMediaQuery';
import { Close as CloseIcon } from '@mui/icons-material';



function PageLanding() {
  const IsMobile = UseMediaQuery('(max-width:700px)');
  const phoneNumber = '+97433477044';
  const emailAddress = 'contact@qnarweb.com'
  const Is900 = UseMediaQuery('(max-width:900px)');
  const Is1200 = UseMediaQuery('(max-width:1200px)');

  const {t, i18n} = useTranslation();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [ButtonNo, setButtonNo] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const handleClickOpen = (id) => {
    setButtonNo(id);
    // Perform the actions needed based on the id
    setIsDialogOpen(true);
  };
  

  const handleClose = () => {
    setIsDialogOpen(false);
  };
  // const { t, i18n } = useTranslation();

/////////////////////////////////////////// send email start////////////////////////////////////////////////////////////////////////////////////
  const handleChangeEmail = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const sendEmailEmail = () => {


    emailjs.send(
      'service_4xwd306', 
      'template_xofsc8o', 
      formData, 
      'mUqAWzZcVbrWiKca5'
    )
    .then((result) => {
        console.log('Email successfully sent!', result.text);

    }, (error) => {
        console.log('Failed to send email:', error.text);
    });
  setFormData({
    name: '',
    email: '',
    message: '',
  });}
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <Box sx={{overflow: 'hidden',display: 'flex',flexDirection:'column'}}>

        <Box sx={{position: 'relative',flex: 1, display: 'flex', alignContent:'center', alignItems: 'center',
          '@media (max-width: 700px)': { // 'sm' breakpoint
     
            
          },
        }}>
        <img className="responsive-img" src={back} alt="Background" />
       
        <Paper
  elevation={3}
  sx={{
  padding: '5vh',
    width: '30vw',
    maxWidth: '80%',
    maxhHeight: '80%',
    minHeight:'80%',
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
      
      left: '30%',
    },
    '@media (max-width: 700px)': { // 'sm' breakpoint
      top: '50%', /* Position from the top */
  left: '50%', /* Position from the left */
  transform: 'translate(-50%, -50%)',
      width: '80%',
     
    },
    '@media (max-width: 500px)': { // 'md' breakpoint
      width: '80%',
     
    },

  }}
>
  <Typography
    variant="h3"
    gutterBottom
    sx={{
      // Responsive font size
      maxWidth: '100%',
      fontWeight: 'bold',
      fontSize: '2vw',
      overflowWrap: 'break-word',
'@media (max-width: 700px)': { // 'sm' breakpoint
      fontSize: '6vw',
    },
    }}
  >
    {t('TitleTop')}
  </Typography>
  <Typography
  
    variant="h6"
    sx={{
      // Responsive font size
      fontSize: '1vw',
      maxWidth: '100%',
      overflowWrap: 'break-word',
      '@media (max-width: 700px)': { // 'sm' breakpoint
      fontSize: '5vw',
    },
    }}
  >
    {t('HeaderTop')}
  </Typography>
  <br />
  <Button onClick={() => handleClickOpen(3)}
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
    {t('buttonJoin')}  <ArrowForwardIcon />
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
        {t('MissOut')}          </Typography>
          <Typography style={{color: '#3B5D44'}} variant="h6">
          {t('community')}           </Typography><br></br>
          <Typography variant="h6" style={{color: '#3B5D44'}} >{t('Email')}</Typography>
          <Box sx={{ flex: 1,
        display: 'flex',
        flexDirection: 'Row',
        padding:'10px',
        
      }}>
          <TextField  placeholder={t('Email')} onChange={(e) =>
    setFormData((prevData) => ({...prevData, // Spread previous state
      email: e.target.value, // Update the email field
    }))
  } style={{background: '#ffffff'}}></TextField>
          <Button onClick={() => {if (formData.email !== "") {handleClickOpen(0); sendEmailEmail();}}} variant="contained" sx={{ backgroundColor: '#4B7857', color: '#fff', margin:'5px'  }}>
          {t('Submit')}
                </Button></Box>
      </Box>

       {/* New Section */}
       <Box
        dir="ltr"
        sx={{
            flex:0.8,
            
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          
          background: `linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), url(${HowBG})`,
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
        {t('HowTo')}
      </Typography>
        {/* Video Frame */}
        <Box
          sx={{
            flex: 1,

        }}
        >
           <div className="circle-container">
      <img src={(Is900? VideoBGMobile : VideoBG)} alt="Background" className="background-image" />
      <div className="circle-video-wrapper">
        <video src={i18n.language === 'ar'?VideoAR:videoSrc} controls autoPlay  muted loop className="circle-video" />
      </div>
    </div>
        </Box>

        {/* Text Content */}
        <Box
        dir="rtl"
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
        {t('HowTo')}
      </Typography>
          <Typography variant="h6" paragraph>
          {t('Explain')}          </Typography>
          
        </Box>
      </Box>
      {/*////////////////////// new section //////////////////////*/}
      <Box
      dir="ltr"
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
        dir="rtl"
          sx={{
            flex: 1,
            padding: '20px',
            textAlign: 'center',
            color: '#3B5D44'
          }}
        >
          <Typography variant="h2" gutterBottom>
          {t('story')}
          </Typography>
          <Typography style={{color:'#C36759'}} variant="h4" gutterBottom>
          {t('storyH')}
          </Typography>
          
          <Typography variant="h6" paragraph>
          {t('storyD')}           </Typography>
          
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
        {t('mission')}
          </Typography>
          <Typography style={{color:'#C36759'}} variant="h4" gutterBottom>
          {t('missionH')}
          </Typography>
          
          <Typography variant="h6" style={{ paddingLeft: '5vw', paddingRight: '5vw'}} paragraph>
          {t('missionD')}
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
          {t('Qnar')}          </Typography>
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
            textAlign: Is900?'center' : (i18n.language == 'ar'? 'right': 'left'),
            color: '#3B5D44'
          }}
        >
          <Typography variant="h2" sx={{display: Is1200 ? 'none' : 'block',}} gutterBottom>
          {t('Qnar')}      </Typography>
          <Typography variant="h6">
          <span style={{ color: '#EB8576' }}>{t('Q')}</span>{t('QnarE')}  <span style={{ color: '#EB8576' }}>{t('Q2')}</span>
          {t('QnarE2')} <span style={{ color: '#EB8576' }}>{t('Q3')}</span>
          {t('QnarE3')}          </Typography>
        
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
      <Box sx={{flex: 1,display: 'flex',alignItems: 'center', justifyContent: 'center',}}><Typography style={{color:'#3B5D44'}} variant='h2'>{t('contact')}</Typography></Box>
      <Box sx={{flex: 1,display: 'flex',  flexDirection: 'row',alignItems: 'center', justifyContent: 'center'}}>
      <a style={{marginRight:'5vw'}} href={`tel:${phoneNumber}`}><img className="contactIMG" src={phone}alt="Background"/></a>
      <a style={{marginRight:'5vw'}} href={`mailto:${emailAddress}`}>< img  className="contactIMG" src={emailPic}alt="Background"/></a>
      <a style={{marginRight:'5vw'}}><img className="contactIMG" src={location}alt="Background"/></a></Box>
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
        <Typography variant="h4" gutterBottom style={{color:'#3B5D44'}}>{t('getInTouch')} 
     
        </Typography>

        <form onSubmit={sendEmailEmail}>
        <TextField
           label={t('name')} 
          variant="outlined"
          fullWidth
          margin="normal"
          name="name" // Add this to associate the input with formData.name
        //   InputProps={{
        //     startAdornment: formData.name === '' ? (
        //       <InputAdornment position={i18n.language === "ar" ? "end" : "start"}>
        //         {t('name')}
        //       </InputAdornment>
        //     ) : null,
        // }}

        value={formData.name}
        onChange={handleChangeEmail}
        required
        />
        <TextField
          label={t('Email')} 
          variant="outlined"
          fullWidth
          margin="normal"
     
          name="email" // Add this to associate the input with formData.email
          value={formData.email}
          onChange={handleChangeEmail}
          required
       />
        <TextField
          label={t('message')} 
          variant="outlined"
          fullWidth
          dir='auto'
          multiline
          rows={4}
          margin="normal"
          name="message" // Add this to associate the input with formData.message
          value={formData.message}
          onChange={handleChangeEmail}
       />

        <Button
          variant="contained"
          sx={{ backgroundColor: '#4B7857', color: '#fff', marginTop: '1rem' }}
           type="submit"
           onClick={() => {
            if (formData.name !== "" && formData.email !== "") {
              handleClickOpen(1);
            }}}
        >
          {t('Submit')}  
        </Button>

    </form>
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
    </Box>
    {/* Dialog */}
    <Dialog
        open={isDialogOpen}
        onClose={handleClose}
        PaperProps={{
          sx: {
            padding: '20px',
            borderRadius: '20px',
            width: '400px',
            maxWidth: '90%',
          }
        }}
      >
        {/* Close button on the top-right corner */}
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: '#aaa',
          }}
        >
          <CloseIcon />
        </IconButton>

        {/* Dialog content */}
        <DialogContent sx={{ textAlign: 'center' }}>
  {ButtonNo === 3 ? (
    <>
      <TextField  placeholder={t('Email')} onChange={(e) =>
    setFormData((prevData) => ({...prevData, // Spread previous state
      email: e.target.value, // Update the email field
    }))
  } style={{background: '#ffffff'}}></TextField>
          <Button onClick={() => {if (formData.email !== "") {handleClickOpen(0); sendEmailEmail();}}} variant="contained" sx={{ backgroundColor: '#4B7857', color: '#fff', margin:'5px'  }}>
          {t('Submit')}
                </Button>

    
    </>
  ) : (
    <>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
        {t('Thanks')}
      </Typography>
      {ButtonNo === 0 ? (
        <Typography variant="body1" sx={{ color: '#666' }}>
          {t('subscribed')}
        </Typography>
      ) : (
        <Typography variant="body1" sx={{ color: '#666' }}>
          {t('msg')}
        </Typography>
      )}
    </>
  )}
</DialogContent>

        {/* Dialog actions with custom button */}
        <DialogActions sx={{ justifyContent: 'center', paddingBottom: '20px' }}>
          <Button
            variant="contained"
            onClick={handleClose}
            sx={{
              backgroundColor: '#4caf50',
              color: '#fff',
              borderRadius: '50px',
              padding: '10px 30px',
              '&:hover': {
                backgroundColor: '#45a049',
              },
            }}
          >
            {t('close')}
          </Button>
        </DialogActions>
      </Dialog></Box>
  )
}

export default PageLanding
