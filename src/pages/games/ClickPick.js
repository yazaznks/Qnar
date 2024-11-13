import '../Styles.css'
import React, { useState, useEffect, useRef } from 'react';
import { Box, Button, Typography, IconButton, Grid, useTheme} from '@mui/material';
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import {isMobile} from 'react-device-detect';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import WarningIcon from '@mui/icons-material/Warning'; 
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Doha from '../../Assets/Doha.jpg'
import boat from '../../Assets/boat.png'
import soundIcon from '../../Assets/sound.png'
import menu from '../../Assets/menu.png'
import timer from '../../Assets/timer.png'
import max from '../../Assets/maximize.png'
import min from '../../Assets/minimize.png'
import timeFade from '../../Assets/timeFade.png'
import backTop from '../../Assets/Upper.png'
import backBottom from '../../Assets/lowerbg.png'
import settingsIcon from '../../Assets/settings.png'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import counting3 from '../../Assets/output.webm'
import zIndex from '@mui/material/styles/zIndex';
import screenfull from 'screenfull';


const questionsData = [
  {
    question: "س 1: أي الدول التالية هي دولة عربية؟",
    answers: [
      { text: "الصين", isCorrect: false },
      { text: "قطر", isCorrect: true },
      { text: "الأردن", isCorrect: true },
      { text: "اليونان", isCorrect: false },
      { text: "الجزائر", isCorrect: true },
      { text: "تركيا", isCorrect: false },
      { text: "فلسطين", isCorrect: true },
    ],
  },
  {
    question: "س 2: أي من هذه الحيوانات من الثدييات؟",
    answers: [
      { text: "أسد", isCorrect: true },
      { text: "نسر", isCorrect: false },
      { text: "حوت", isCorrect: true },
      { text: "تمساح", isCorrect: false },
      { text: "دولفين", isCorrect: true },
      { text: "ثعبان", isCorrect: false },
    ],
  },
  {
    question: "س 3: أي الأطعمة تحتوي على فيتامين سي؟",
    answers: [
      { text: "تفاح", isCorrect: false },
      { text: "برتقال", isCorrect: true },
      { text: "أناناس", isCorrect: true },
      { text: "بروكلي", isCorrect: true },
      { text: "بصل", isCorrect: false },
    ],
  },
  // Add more questions if needed
];
function ClickPick() {
  const theme = useTheme(); // Get the theme object
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const [sound, setSound] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const [time, setTime] = useState(10); // Initial time
  const [isTimerActive, setTimerActive] = useState(false); // Timer is active
  const [animationKey, setAnimationKey] = useState(0);
  const currentQuestion = questionsData[currentQuestionIndex];
  const [isIphone, setIPhone]= useState(false)

  const [start, setstart] = useState(false);
  const [finish, setFinish] = useState(false);
  const [showGame, setShowGame] = useState(false);
  const [videoVisible, setVideoVisible] = useState(false);
  const [animateImages, setAnimateImages] = useState(false); // Control the animation of images
  const handle = useFullScreenHandle()
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  ////////////////////////// start /////////////////////////////

  const getDeviceType = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // Detect iOS
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return "iOS";
    }

    // // Detect Samsung (and other Android devices)
    // if (/android/i.test(userAgent)) {
    //     if (/Samsung/i.test(userAgent)) {
    //         return "Samsung";
    //     }
    //     return "Android";
    // }

    return "Other";
};
useEffect(() => {
  const deviceType = getDeviceType();

  if (deviceType === "iOS") {
    setIPhone(true);
  // } else if (deviceType === "Samsung") {
  //   setPhone("This is a Samsung device");
  //     console.log("This is a Samsung device");
  // } else if (deviceType === "Android") {
  //   setPhone("This is another type of Android device");
  //     console.log("This is another type of Android device");
  // } else {
  //     console.log("Unknown or other device");
   }
  const onFullScreenChange = () => {
    if (!document.fullscreenElement) {
      setIsFullscreen(false); // Call handleFullScreen when exiting fullscreen
    }
};

document.addEventListener('fullscreenchange', onFullScreenChange);

return () => {
    document.removeEventListener('fullscreenchange', onFullScreenChange);
};
  
}, []);

  const handleStart = () => {
    // Play video when the button is clicked
    setstart(true);
    // setQuestions(questionsOG);

    setFinish(false);
    setScore(0);

    if (videoRef.current) {


      setTimeout(() => {
        videoRef.current.play();
        //playSound(1);
      }, 1000);}

    

      //playSound(0);
      setVideoVisible(true);

   setTimeout(() => {

        setAnimateImages(true); // Start animating side images
        setVideoVisible(false);
        
      }, 4000);

    // Show the wheel after 4 seconds
    setTimeout(() => {
      setShowGame(true);
      setTime(10);
      setAnimationKey((prev) => prev + 1);
      setTimerActive(true);
    }, 5000);
    
    // Start the timer
  };


  ////////////////////////// timer /////////////////////////////
  useEffect(() => {
    let interval = null;

    if (isTimerActive && time > 0) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime - 1);
      }, 1000); // Update every second
    } else {
      clearInterval(interval);
      if (time === 0) {
        //onTimeUp(); // Call the callback function when time is up
      }
    }

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [isTimerActive, time]);
  ////////////////////////////end of timer ///////////////////////

  const handleAnswerClick = (index) => {
    if (!submitted) {
      setSelectedAnswers((prev) =>
        prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
      );
    }
  };

  const handleSubmit = () => {
    if (submitted) {
      // Move to next question
      setTime(10);
      setAnimationKey((prev) => prev + 1);
      setTimerActive(true);
      setSelectedAnswers([]);
      setSubmitted(false);
      if (currentQuestionIndex < questionsData.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
      } else {
        alert(`Game over! Your final score is ${score}`);
        setCurrentQuestionIndex(0);
        setScore(0);
      }
    } else {
      // Check answers and update score
      setTimerActive(false);
      const correctAnswers = currentQuestion.answers
        .map((answer, index) => (answer.isCorrect ? index : null))
        .filter((index) => index !== null);

        const pointsEarned = selectedAnswers.reduce((acc, index) => {
          if (correctAnswers.includes(index)) {
            return acc + 10; // Add 10 points for a correct answer
          } else {
            return acc - 5; // Subtract 5 points for an incorrect answer
          }
        }, 0);
        
        setScore((prev) => prev + pointsEarned);
        setSubmitted(true);
  };}

  const handleSound = () =>{if (sound){setSound(false);}else{setSound(true);}};
  const handleFullScreen = () =>
    {if (!isFullscreen) {
   // Enter fullscreen
    if (containerRef.current.requestFullscreen) {
      containerRef.current.requestFullscreen();
    } else if (containerRef.current.mozRequestFullScreen) {
      containerRef.current.mozRequestFullScreen();
    } else if (containerRef.current.webkitRequestFullscreen) {
      containerRef.current.webkitRequestFullscreen();
    } 
    else if (containerRef.current.webkitEnterFullscreen) {
      containerRef.current.webkitEnterFullscreen();
    }
    else if (containerRef.current.msRequestFullscreen) {
      containerRef.current.msRequestFullscreen();
    }
    setIsFullscreen(true);
  } else {
    //Exit fullscreen
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
    setIsFullscreen(false);
  }};



  return (
    
    <Box
      ref={containerRef}
      className ={'FSMB'}
      //className={isIphone? 'FSMB': isFullscreen? 'FSbg':'normalDT'}
      sx={{
        
        
        display: 'flex', flexDirection: 'column',flexWrap: 'wrap',
        borderRadius: 2,
        boxShadow: 3,
        //height: '80vh',
        //width: ' 70vw',
        textAlign: 'center', 
        bgcolor: '#f0f4f8',
        zIndex: 100,
        overflow: 'hidden',    
        backgroundImage: showGame ? `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)),url(${Doha})`: `url(${Doha})`,  // Adjust background image path
        backgroundSize: 'cover', 
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        transition: 'background-size 0.5s ease-in-out, background-image 0.5s ease-in-out',      
       }}
    >
      {/*///////////////////////////////////////////////////////////////////////////////////////////////////////////  */}
    
      <img src={boat} className={`side-image-boat ${animateImages ? 'animateLeft' : ''}`} sx={{zIndex:97,}} alt="Right Image" />
      <Box
  
  sx={{
    p: 3,
    borderRadius: 2,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',// Set height as needed
    backgroundImage: `url(${backTop})`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    opacity: start ? 0 : 1,
    transform: start ? 'translateY(-100%)' : 'translateY(0)', // Move up off the screen
    transition: 'opacity 1s ease, transform 1s ease', 
    zIndex: 99 ,// Fade effect duration
    display: showGame ?'none': 'flex',
    justifyContent: 'center', // Center content horizontally
    alignItems: 'center', // Center content vertically
  }}
>
<Typography variant="h6" gutterBottom color={'white'}sx={{ position: 'absolute' ,top: 70,whiteSpace: 'pre-line', marginTop: '10pxx'}}>
{isIphone}
        </Typography>
        
</Box>

<Box
  sx={{
    p: 3,
    borderRadius: 2,
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '100%', // Adjust this as needed
    backgroundImage: `url(${backBottom})`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'bottom', // Aligns image to the bottom
    opacity: start ? 0 : 1,
    transition: 'opacity 1s ease',
    zIndex: 99,
    display: showGame ? 'none' : 'flex',
    justifyContent: 'center', // Adjust to center the content container horizontally
    alignItems: 'center', // Adjust to vertically align content
  }}
>
  {/* Inner container for buttons on top of the image */}
  <Box
    sx={{
      position: 'absolute',
      bottom: 0, // Position at the bottom of the image
      width: '100%',
      display: 'flex',
      marginBottom: '50px',
      justifyContent: 'space-between', // Space buttons evenly
      alignItems: 'center',
      p: 2, // Padding for spacing within the box
      [theme.breakpoints.down('md')]: {
        marginBottom: '0px',
      },
    }}
  >
    {/* Left-aligned button */}
    

    {/* Settings icon in the center */}
    <img
      src={settingsIcon}
      alt="Settings"
      style={{
        maxWidth: '60px', // Keep original size
        maxHeight: '60px', // Keep original size
        width: '8vw', // Responsive width
        height: '8vw', // Responsive height
        cursor: 'pointer',
        [theme.breakpoints.down('sm')]: {
          width: '12vw', // Adjust for small screens
          height: '12vw', // Adjust for small screens
        },
      }}
    />
<Button
      variant="contained"
      sx={{
        backgroundColor: '#fff',
        color: '#4B7857',
        fontSize: '1.5rem',
        padding: '10px 20px', // Responsive padding
        [theme.breakpoints.down('sm')]: {
          fontSize: '1.2rem', // Smaller font size for small screens
          padding: '8px 16px', // Adjust padding on smaller screens
        },
        [theme.breakpoints.down('xs')]: {
          fontSize: '0.5rem', // Smaller font size for small screens
          padding: '0px 0px', // Adjust padding on smaller screens
        },
        '&:hover': { backgroundColor: 'grey' },
      }}
      onClick={handleStart}
    >
      ابدأ اللعب <PlayArrowIcon />
    </Button>
    {/* Fullscreen icon on the right */}
    <img
      src={isFullscreen ? min : max}
      alt="Maximize"
      
      style={{
        maxWidth: '60px', // Keep original size
        maxHeight: '60px', // Keep original size
        width: '8vw', // Responsive width
        height: '8vw', // Responsive height
        cursor: 'pointer',
        [theme.breakpoints.down('sm')]: {
          width: '12vw', // Adjust for small screens
          height: '12vw', // Adjust for small screens
        },
      }}
      onClick={handleFullScreen}
    />
  </Box>
</Box>

    <Box
          sx={{
            position: 'absolute',
            top: '40%',
            left: '40%',
            transform: 'translate(-50%, -50%)',
            zIndex: 2, // Ensure it's above the background
          }}
        >
             
           <video ref={videoRef} playsInline className={!videoVisible ? 'fade-out' : ''}
        onEnded={() => setVideoVisible(false)}
        loop={false}  src={counting3} alt="Timer" style={{display: showGame ?'none': 'flex', width: '120%', height: '120%', opacity: videoVisible ? 1 : 0 }} /> 
        </Box>
{/*///////////////////////////////////////////////////////////////////////////////////////////////////////////  */}









      
      <Box  className={`game-container ${showGame ? (isFullscreen? 'show FSMT':'show FSMT') : ''}`} sx={{display: 'flex', justifyContent: 'space-between', mb: 2,height: '6vh' }}>
        <Box sx={{ display: 'flex', gap: 1 }}>
        <img src={soundIcon} alt="button" onClick={handleSound}style={{ cursor: 'pointer', width: isMobile ? '15vw' : '3vw', height:'auto'}}/>
        <img src={menu} alt="button" onClick={handleSound}style={{ cursor: 'pointer', width: isMobile ? '15vw' : '3vw'}}/>
        
        <Box
      onClick={handleSound}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: { xs: '20vw', sm: '15vw', md: '10vw' }, // Width changes for mobile, tablet, and desktop
        height: 'auto',
        maxWidth: '100px', // Maximum width for large screens
        cursor: 'pointer',
        marginLeft: '5vw', // Center-align horizontally
        position: 'relative',
      }}
    >
      <Box
        component="img"
        src={timer}
        alt="button"
        sx={{
          width: { xs: '20vw', sm: '6vw', md: '4vw' }, // Image size responsive to screen size
          height: 'auto',
          maxWidth: '50px', // Limit max image width
        }}
      />
      <Typography
        variant="h6"
        sx={{
          position: 'absolute',
          color: '#3B5D44',
          fontWeight: 'bold',
          fontSize: { xs: '1.2rem', sm: '1.5rem', md: '2rem', lg: '3rem' }, // Font size adjusts across breakpoints
        }}
      >
        {time}
      </Typography>
    </Box>

        </Box>
        <div className={isMobile? 'hide':"green-to-white-wrapper"} style={{marginright: '20px'}} key={animationKey}>
        
    <div className={`green-to-white-overlay ${isTimerActive ? '' : 'paused'}`}></div>
  </div>
        
        <Box sx={{ display: 'flex', gap: 1 }}>
        <Box sx={{background: `linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9))`,color:'FFFFFF',borderRadius: '10px',
      borderColor: '#4B7857',borderWidth: '3px',borderStyle: 'solid',
      padding: isFullscreen? '10px':{ xs: '3px', sm: '3px', md: '5px' },
      fontSize: { xs: '1rem', sm: '1.5rem', md: '2rem' },
      color:'#3B5D44'
    }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold'}}>Score: <span style={{ color: '#EB8576' }}>{score}</span></Typography>
        </Box>
       
        <img src={isFullscreen? min: max} alt="button" onClick={handleFullScreen}style={{ cursor: 'pointer', width: isMobile ? '15vw' : '3vw'}}/>
        </Box>
      </Box>
      <div className={isMobile? 'green-to-white-wrapper FSMT':"hide"} style={{height: '6vh'}} key={animationKey}>
        
        <div className={`green-to-white-overlay ${isTimerActive ? '' : 'paused'}`}></div>
      </div>
      {/* /////////////////////////////////// end of navbar/////////////////////////////////////////////////////// */}
      <Box className={`game-container ${showGame ?isMobile? 'show FSMTM': (isFullscreen? 'show FSMT': 'show') : ''}`} 
      sx={{display: 'flex',justifyContent:'center', mb: 2, background: `linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9))`,color:'FFFFFF',borderRadius: '10px',
      borderColor: '#4B7857',borderWidth: '3px',borderStyle: 'solid',
      padding: { xs: '5px', sm: '10px' },
      fontSize: { xs: '1rem', sm: '1.5rem', md: '2rem',
      fontWeight: "bold",
      color:'#3B5D44'
      }}}>{currentQuestion.question}</Box>
      <Box className={`game-container ${showGame ? isMobile? 'show FSMTM': (isFullscreen? 'show FSMT': 'show') : ''}`}
        sx={{
          display: 'flex',
          flexWrap: 'wrap', // Allows wrapping for multiple rows
          justifyContent: 'center', // Centers items within the Box
          gap: 4,
          maxWidth: { xs: '100%', sm: '80%', md: '60%' }, // Controls the maximum width of the container for better centering
          mx: 'auto', // Centers the Box horizontally within its parent
          
        }}
      >
         {currentQuestion.answers.map((answer, index) => {
    // Determine background color based on answer state
    let backgroundColor = '#E6F8EB'; // Default color
    let icon = null;

    if (submitted) {
      if (answer.isCorrect && !selectedAnswers.includes(index)) {
        // Missed correct answer
        backgroundColor = 'lightgreen';
        icon = <WarningIcon sx={{ color: 'white' }} />; // Icon for missed correct answer
      } else if (answer.isCorrect) {
        // Correct answer selected
        backgroundColor = 'green';
        icon = <CheckIcon sx={{ color: 'white' }} />;
      } else if (selectedAnswers.includes(index)) {
        // Incorrect answer selected
        backgroundColor = 'red';
        icon = <CloseIcon sx={{ color: 'white' }} />;
      }
    } else if (selectedAnswers.includes(index)) {
      // Selected before submission
      backgroundColor = '#FFFFCD';
    }

    return (
      <Button
        key={index}
        onClick={() => handleAnswerClick(index)}
        sx={{
          bgcolor: backgroundColor,
          color: 'black',
          marginTop: '10px',
          fontWeight: 'bold',
          textAlign: 'center',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: { xs: '1rem', sm: '1.5rem', md: '2rem' },
          gap: 3,
          width: { xs: '100px', sm: '100px', md: '100px', lg: '150px'},
          height: { xs: '100px', sm: '100px', md: '100px', lg: '150px'},
          borderRadius: '10px',
          '&:hover': {
            bgcolor: 'lightblue',
            transform: 'scale(1.05)',
          },
        }}
      >
        {answer.text}
        {icon}
      </Button>
    );
  })}
  
</Box>

<Button className={`game-container ${showGame ? isMobile? 'show FSMTM':(isFullscreen? 'show FSMT': 'show'): ''}`}
        variant="contained"
        color="secondary"
        onClick={handleSubmit}
        sx={{ mt: 3, fontWeight: 'bold', width: 'fit-content', mx: 'auto', marginBottom: '20px', display: 'block'}}
        
      >
        {submitted ? 'Next Question' : 'Submit'}
      </Button>
      </Box>
      

    
  );
  
}




export default ClickPick;
