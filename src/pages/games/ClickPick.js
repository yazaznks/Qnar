import '../Styles.css'
import React, { useState, useEffect, useRef } from 'react';
import { Box, Button, Typography, IconButton } from '@mui/material';
import {isMobile} from 'react-device-detect';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import WarningIcon from '@mui/icons-material/Warning'; 
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Doha from '../../Assets/Doha.jpg'
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


  const [start, setstart] = useState(false);
  const [finish, setFinish] = useState(false);
  const [showGame, setShowGame] = useState(false);
  const [videoVisible, setVideoVisible] = useState(false);
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  ////////////////////////// start /////////////////////////////
  const handleStart = () => {
    // Play video when the button is clicked
    setstart(true);
    // setQuestions(questionsOG);

    setFinish(false);
    setScore(0);

    if (videoRef.current) {


        videoRef.current.play();
    }

      //playSound(0);
        setVideoVisible(true);

   setTimeout(() => {

       // setAnimateImages(true); // Start animating side images
        setVideoVisible(false);
        setShowGame(true);
      }, 4000);

    // Show the wheel after 4 seconds
    setTimeout(() => {
      
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
  const handleFullScreen = () =>{if (!isFullscreen) {
    // Enter fullscreen
    if (containerRef.current.requestFullscreen) {
      containerRef.current.requestFullscreen();
    } else if (containerRef.current.mozRequestFullScreen) {
      containerRef.current.mozRequestFullScreen();
    } else if (containerRef.current.webkitRequestFullscreen) {
      containerRef.current.webkitRequestFullscreen();
    } else if (containerRef.current.msRequestFullscreen) {
      containerRef.current.msRequestFullscreen();
    }
    setIsFullscreen(true);
  } else {
    // Exit fullscreen
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
      className={isMobile? 'FSBG FSrotate': isFullscreen? "FSbg": ''}
      sx={{
        
        
        p: 3,
        borderRadius: 2,
        boxShadow: 3,
        maxWidth: '80%',
        height: 'auto',//'40vw',
        margin: '20px auto',
        textAlign: 'center',
        position: 'relative',
        bgcolor: '#f0f4f8',
        overflow: 'hidden',
        backgroundImage: start ? `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)),url(${Doha})`: `url(${Doha})`,  // Adjust background image path
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      {/*///////////////////////////////////////////////////////////////////////////////////////////////////////////  */}
      <Box
  
  sx={{
    p: 3,
    borderRadius: 2,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '55%', // Set height as needed
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
<Typography variant="h2" gutterBottom color={'white'}sx={{ position: 'absolute' ,top: 70,whiteSpace: 'pre-line', marginTop: '10pxx'}}>
Ai generated
        </Typography>
</Box>
<Box
  
  sx={{
    p: 3,
    borderRadius: 2,
    position: 'absolute',
    bottom: 0,
    left:0,
    width: '100%',
    height: '55%', // Set height as needed
    
    backgroundImage: `url(${backBottom})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    opacity: start ? 0 : 1,
    transform: start ? 'translateY(300%)' : '', // Move up off the screen
    transition: 'opacity 1s ease, transform 1s ease', 
    zIndex: 98, // Fade effect duration
    display: showGame ?'none': 'flex',
    justifyContent: 'center', // Center content horizontally
    alignItems: 'center', // Center content vertically
  }}
>
 <Button variant="contained" sx={{backgroundColor: '#fff', transform: 'translateY(130%)',color: '#4B7857', fontSize: '2rem' ,'&:hover': {
      backgroundColor: 'grey',  // Hover color
    }}} onClick={handleStart}>ابدأ اللعب<PlayArrowIcon /></Button>
     {/* Settings Icon - Positioned Bottom Left */}
 <img
    src={settingsIcon}
    alt="Settings"
    style={{
      position: 'absolute',
      bottom: '70px',
      left: '60px',
      width: '60px',  // Adjust size as needed
      height: '60px', // Adjust size as needed
      cursor: 'pointer',  // Optional: pointer cursor for interactivity
    }}
  />

  {/* Maximize Icon - Positioned Bottom Right */}
 <img
    src={max}
    alt="Maximize"
    style={{
      position: 'absolute',
      bottom: '70px',
      right: '60px',
      width: '60px',  // Adjust size as needed
      height: '60px', // Adjust size as needed
      cursor: 'pointer',  // Optional: pointer cursor for interactivity
    }}
  /> 


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









      
      <Box  className={`game-container ${showGame ? (isFullscreen? 'show FSMT':'show') : ''}`} sx={{display: 'flex', justifyContent: 'space-between', mb: 2,height: '7vh' }}>
        <Box sx={{ display: 'flex', gap: 1 }}>
        <img src={soundIcon} alt="button" onClick={handleSound}style={{ cursor: 'pointer', width:'3vw', height:'auto'}}/>
        <img src={menu} alt="button" onClick={handleSound}style={{ cursor: 'pointer', width:'3vw'}}/>
        <div
  style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '10vw',  // Adjust the width as needed
    height: 'auto',
    maxWidth: '100px', // Optional: Set a max width for responsiveness
    cursor: 'pointer',
    marginLeft: '15%',
    transform: 'translateX(-50%)', // Center the container
    position: 'relative',
  }}
  onClick={handleSound}
>
  <img src={timer} alt="button" style={{ width: '4vw', height: 'auto' }} />
  <span
    style={{
      position: 'absolute',
      color:'#3B5D44',
      fontSize: { xs: '1rem', sm: '1.5rem', md: '3rem' },
      fontWeight: 'bold',
    }}
  >
    <Typography variant="h6">{time}</Typography>
    
  </span>
</div>

        </Box>
        <div className="green-to-white-wrapper" key={animationKey}>
        
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
        {isMobile? <></>:
        <img src={isFullscreen? min: max} alt="button" onClick={handleFullScreen}style={{ cursor: 'pointer', width:'3vw'}}/>}
        </Box>
      </Box>

      {/* /////////////////////////////////// end of navbar/////////////////////////////////////////////////////// */}
      <Box className={`game-container ${showGame ? (isFullscreen? 'show FSMT': 'show') : ''}`} 
      sx={{display: showGame ? 'block' : 'none', mb: 2, background: `linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9))`,color:'FFFFFF',borderRadius: '10px',
      borderColor: '#4B7857',borderWidth: '3px',borderStyle: 'solid',
      padding: { xs: '5px', sm: '10px' },
      fontSize: { xs: '1rem', sm: '1.5rem', md: '2rem',
      fontWeight: "bold",
      color:'#3B5D44'
      }}}>{currentQuestion.question}</Box>
      <Box className={`game-container ${showGame ?  (isFullscreen? 'show FSMT': 'show') : ''}`}
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
          width: isFullscreen? '200px':{ xs: '50px', sm: '100px', md: '100px', lg: '150px'},
          height: isFullscreen? '200px':{ xs: '50px', sm: '100px', md: '100px', lg: '150px'},
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

<Button className={`game-container ${showGame ?(isFullscreen? 'show FSMT': 'show'): ''}`}
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
