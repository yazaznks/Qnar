import React from 'react'
import {Box, Typography,  Paper, } from '@mui/material';
import { useTranslation } from 'react-i18next';
import UseMediaQuery from '@mui/material/useMediaQuery';
import story from '../Assets/story.png'
import backBubble from '../Assets/backBubble.png'
import knar from '../Assets/Knar.png'

function AboutUs() {
    const Is1200 = UseMediaQuery('(max-width:1200px)');
    const Is900 = UseMediaQuery('(max-width:900px)');
    const {t, i18n} = useTranslation();
  return (
    <Box sx={{overflow: 'hidden',display: 'flex',flexDirection:'column'}}>
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
      </Box>
  )
}

export default AboutUs