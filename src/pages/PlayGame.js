
// import ReactDOM from "react-dom";
import "./Styles.css";
import React, { useState, useEffect, useRef } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { CheckCircle, Cancel, Fullscreen } from '@mui/icons-material'; // Importing icons
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
// import { Wheel } from 'react-custom-roulette';
// import axios from 'axios';
import timer from '../Assets/timer.png';
import sound from '../Assets/sound.png';
import heartE from '../Assets/heart.png';
import heartF from '../Assets/heartF.png';
import arrow from '../Assets/arrow.png'
// import { blue } from '@mui/material/colors';
import background from '../Assets/dessert.png'
import camel from '../Assets/Camel.png'
import cactus from '../Assets/cactus.png'
// import audio files
import countDownSound from '../Assets/sound/countdown.wav'
import celebrationSound from '../Assets/sound/celebration.wav'
import correctSound from '../Assets/sound/correctAnswer.wav'
import wrongSound from '../Assets/sound/wrongAnswer.wav'
import newQSound from '../Assets/sound/newQuestion.wav'
import wheelSpinSound from '../Assets/sound/wheelSpin.wav'
import starterSound from '../Assets/sound/starter.wav'
import counting3 from '../Assets/output.webm'
import Maximize  from "../Assets/maximize.png";
import minimize from '../Assets/minimize.png'
import backTop from '../Assets/Upper.png'
import backBottom from '../Assets/lowerbg.png'
import settingsIcon from '../Assets/sittings.png'
import celebrateBubbles from '../Assets/celebration.gif'

  // List of hardcoded questions with answers
const PlayGame =() =>{
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);
  // const [prizeNumber, setPrizeNumber] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const [questions, setQuestions] = useState([{}]);
  const [questionsOG, setQuestionsOG] = useState([
    {
        "id": 6,
        "game": 29,
        "title": "الحيوان المفترس لديه عينان تقعان على جانبي الرأس؟",
        "answers": [
            {
                "text": "خطأ",
                "image": null
            },
            {
                "text": "صح",
                "image": null
            }
        ],
        "correct_answer_index": 0
    },
    {
        "id": 7,
        "game": 29,
        "title": "ما سبب امتلاك آكلات الأعشاب حوافر؟",
        "answers": [
            {
                "image": null,
                "text": "لتمكنها من افتراس الفريسة"
            },
            {
                "image": null,
                "text": "لتحديد موقع الفريسة"
            },
            {
                "image": null,
                "text": "لتتمكن من سماع من أين يأتي المفترس"
            },
            {
                "image": null,
                "text": "لتمكنها من التحرك بسرعة"
            }
        ],
        "correct_answer_index": 1
    },
    {
        "id": 8,
        "game": 29,
        "title": "أي الخصائص الآتية من الخصائص الجسمية لآكلات اللحوم؟",
        "answers": [
            {
                "image": null,
                "text": "العيون تقع في مقدمة الرأس"
            },
            {
                "image": null,
                "text": "لديه حوافر"
            },
            {
                "image": null,
                "text": "لديهم أذنين طويلتين"
            },
            {
                "image": null,
                "text": "لديهم افواه صغيرة مقارنة بأحجام رؤوسهم"
            }
        ],
        "correct_answer_index": 0
    }
]);
  const [settings, setSettings] = useState({});
  const [isCorrect, setIsCorrect] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const [radius] = useState(65); // PIXELS
  const [rotate, setRotate] = useState(0); // DEGREES
  const [easeOut, setEaseOut] = useState(0); // SECONDS
  const [angle, setAngle] = useState(0); // RADIANS
  const [top, setTop] = useState(null); // INDEX
  const [offset, setOffset] = useState(0); // RADIANS
  const [net, setNet] = useState(null); // RADIANS
  const [result, setResult] = useState(null); // INDEX
  const [spinning, setSpinning] = useState(false);
  const [lives, setLives] = useState(5);
  const [time, setTime] = useState(10); // Initial time
  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const [isTimerActive, setTimerActive] = useState(false); // Timer is active
  const [score, setScore] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const colors = ['#EB8576', '#4B7857', '#E6E444', '#81c3d7', '#4caf50'];
  const [showWheel, setShowWheel] = useState(false); // Control the appearance of the wheel
  const [animateImages, setAnimateImages] = useState(false); // Control the animation of images
  const [showTimer, setShowTimer] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showGif, setShowGif] = useState(true); // State to control GIF visibility
  const [start, setstart] = useState(false);
  const [finish, setFinish] = useState(false);
  const [videoVisible, setVideoVisible] = useState(false);
  // sounds
  const soundRefs = useRef([]);
  const sounds = [
    starterSound,     // 0
    countDownSound,   // 1
    wheelSpinSound,   // 2
    newQSound,        // 3
    correctSound,     // 4
    wrongSound,       // 5
    celebrationSound, // 6

   
  ];
  const videoRef = useRef(null);
const containerRef = useRef(null);
  
    // Function to request fullscreen
    const handleFullscreen = () => {
        if (!isFullscreen) {
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
          }
    };
 
  const playSound = async(index) => {
    stopSounds();
    if (!soundRefs.current[index]) {
        soundRefs.current[index] = new Audio(sounds[index]);
      }
    
      // Play the selected sound
      try {
        await soundRefs.current[index].play();
      } catch (error) {
        console.error("Playback failed: ", error);
      }
    };

  const stopSounds = () => {
    soundRefs.current.forEach((sound) => {
        if (sound && !sound.paused) {  // Ensure the sound is playing before pausing
            sound.pause();
            sound.currentTime = 0; // Reset to the start
          }

    });
};


//   useEffect(() => {
//     // Fetch all games when the component mounts
// // const updatedFields = {
// //     correct_answer_index: 0,  // Example of the field you want to update
// //     // Add more fields if needed
// //   };
  
// //   updateQuestion(6, updatedFields);
//     GetQuestions(29).then(setQuestions);
//     setQuestionsOG(questions);
//   }, []);
  const handleStart = () => {
    // Play video when the button is clicked
    setstart(true);
    setQuestions(questionsOG);
    console.log(questionsOG)
    setFinish(false);
    setScore(0);
    setLives(5);
    if (videoRef.current) {

    setTimeout(() => {
        videoRef.current.play();
        playSound(1);
      }, 2000);}

      playSound(0);
        setVideoVisible(true);

   setTimeout(() => {
        setShowTimer(false); // Hide the timer image after 3 seconds
        setAnimateImages(true); // Start animating side images
        setVideoVisible(false);
        setShowGif(false);
      }, 5000);

    // Show the wheel after 4 seconds
    setTimeout(() => {
      setShowWheel(true);
    }, 6500);
    
    // Start the timer
  };
//   useEffect(() => {
//     let timer1, timer2;
//     if (start) {
//         }

//     return () => {
//         clearTimeout(timer1);
//         clearTimeout(timer2);
//     };
//   }, [start]);

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

  const handleReset = () => {
    setTimerActive(false);
    setTime(10); // Reset to 10 seconds
    
     // Activate timer
  };

  useEffect(() => {
    if (questions.length > 0) {
        renderWheel(); // Re-render the wheel whenever the questions state changes
      }
    else{
        playSound(6);
        setAnimateImages(false);
        setShowWheel(false);
        setFinish(true);
        
    }
}, [questions]);



  const renderWheel = () => {
    let numOptions = questions.length;
    let arcSize = (2 * Math.PI) / numOptions;
    setAngle(arcSize);
    topPosition(numOptions, arcSize);

    let angle = 0;
    for (let i = 0; i < numOptions; i++) {
      let text = `Q${i + 1}`
      renderSector(i + 1, text, angle, arcSize, getColor(i));
      angle += arcSize;
    }

    renderCircle();
    renderCenterCircle();
  };

  const topPosition = (num, angle) => {
    let leftSpot = null;
    let degreesOff = null;

    // The logic to determine the segment and the alignment angle
    if (num === 10) {
      leftSpot = 6; // Left side position for segment 9
      degreesOff = Math.PI / 2 - angle * 1.5;} // Adjust for alignment
    else if (num === 9) {
        leftSpot = 5; // Left side position for segment 9
        degreesOff = Math.PI / 2 - angle * 1.7; // Adjust for alignment
    } else if (num === 8) {
        leftSpot = 4; // Left side position for segment 8
        degreesOff = 0; // No angle adjustment needed
    } else if (num === 7 ) {
        leftSpot = 4; // Left side position for segments 5 to 7
        degreesOff = Math.PI / 2.5 - angle; // Adjust for alignment
    } else if (num === 6) {
        leftSpot = 2; // Left side position for segment 4
        degreesOff = 0; // No angle adjustment needed
    } else if (num === 5) {
        leftSpot = 3; // Left side position for segment 4
        degreesOff = Math.PI / 1.7 - angle; // No angle adjustment needed
    } else if (num === 4) {
        leftSpot = 2; // Left side position for segment 4
        degreesOff = 0; // No angle adjustment needed
    } else if (num === 3) {
        leftSpot = 3; // Left side position for segments 1 to 3
        degreesOff = Math.PI ; // Adjust for alignment
    }
    else  if (num === 2){
      leftSpot = 2; // Left side position for segments 1 to 3
      degreesOff = Math.PI  ; // Adjust for alignment
  }
  else  if (num === 1){
    leftSpot = 1; // Left side position for segments 1 to 3
    degreesOff = 0; // Adjust for alignment
}

    setTop(leftSpot - 1); // Update state for left position
    setOffset(degreesOff); // Update state for angle adjustment
  };

  const renderCenterCircle = () => {
    var c = document.getElementById("wheel");
    var ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.arc(150, 150, 10, 0, 2 * Math.PI);
    ctx.lineWidth = 20;
    ctx.strokeStyle = "white"; 
    ctx.shadowBlur = 5;
    ctx.shadowColor = "gray";
    ctx.stroke();
  };

  const renderCircle = () => {
    var c = document.getElementById("wheel");
    var ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.arc(150, 150, radius * 2, 0, 2 * Math.PI);
    ctx.lineWidth = 5;
    ctx.strokeStyle = "white";
    ctx.shadowBlur = 5;
    ctx.shadowColor = "#A9A9A9";
    ctx.stroke();
  };

  const renderSector = (index, text, start, arc, color) => {
    let canvas = document.getElementById("wheel");
    let ctx = canvas.getContext("2d");
    let x = canvas.width / 2;
    let y = canvas.height / 2;
    let radius = 65;
    let startAngle = start;
    let endAngle = start + arc;
    let angle = index * arc;
    let baseSize = radius * 2.33;
    let textRadius = baseSize - 65;

    ctx.beginPath();
    ctx.arc(x, y, radius, startAngle, endAngle, false);
    ctx.lineWidth = radius * 2;
    ctx.strokeStyle = color;

    ctx.font = "500 26px Arial";
    ctx.fillStyle = index % 2 === 0 ? "white" : "black";
    ctx.shadowBlur = 1;
    ctx.shadowColor = index % 2 === 0 ? "white" : "black";
    ctx.stroke();

    ctx.save();
    ctx.translate(
      baseSize + Math.cos(angle - arc / 2.5) * textRadius,
      baseSize + Math.sin(angle - arc / 2) * textRadius
    );
    ctx.rotate(angle - arc / 1.9);
    ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
    ctx.restore();
  };

  const getColor = (i) => {
    return colors[i % colors.length];
  };

  const spin = () => {
    let randomSpin = Math.floor(Math.random() * 900) + 500 + rotate;
    setRotate(randomSpin);
    setEaseOut(2);
    setSpinning(true);

    setTimeout(() => {
      getResult(randomSpin);
    }, 2000);
  };

  const getResult = (spin) => {
    let netRotation = ((spin % 360) * Math.PI) / 180;
    let travel = netRotation + offset ;
    let count = top + 1;
    while (travel > 0) {
      travel -= angle;
      count--;
    }
    let resultValue;
    if (count >= 0) {
      resultValue = count;
    } else {
      resultValue = questions.length + count;
    }
    stopSounds();
    setNet(netRotation);
    setResult(resultValue);
    let selectedQuestionTitle = questions[resultValue];
    setSelectedQuestion({...selectedQuestionTitle, label: resultValue+1})
    
    playSound(3);
    setTimerActive(true);
  };

  const reset = () => {
    setRotate(0);
    setEaseOut(0);
    setResult(null);
    setSpinning(false);
  };
  const handleAnswerSubmit = async (index) => {
    if (!selectedQuestion) return;
    setSelectedAnswerIndex(index);
    const correctAnswerIndex = selectedQuestion.correct_answer_index;

    const isCorrectAnswer = index === correctAnswerIndex;
    setIsCorrect(isCorrectAnswer);

    // Open the dialog to show if the answer is correct
    setDialogOpen(true);

    if (isCorrectAnswer) {
      // Remove the question from the list
      playSound(4);
      const newQuestions = questions.filter(q => q.title !== selectedQuestion.title);
      console.log(newQuestions);
      setQuestions(newQuestions);
      setScore(prevScore => prevScore  + (time * 100));
      await wait(2000);
      setSelectedAnswerIndex(null);
      setSelectedQuestion(null);
      
      //renderWheel(); // Clear the right-side content
    }
    else{
      playSound(5);
      setLives(lives - 1)
      await wait(2000);
      setSelectedAnswerIndex(null);
      setSelectedQuestion(null);
    }
    
    handleReset();
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };


//const handleSound = () =>{};






////////////////////////////////////////////////////////////// API /////////////////////////////////////////////////////////////


//   const GetGames = async () => {
//     try {
//       const response = await fetch('http://127.0.0.1:8000/api/games/{}', {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
//       const data = await response.json();
//       console.log('Games:', data)
//       return data; // Return the game ID for creating questions
//     } catch (error) {
//       console.error('Error posting game:', error);
//     }
//   };


//   const GetQuestions = async (gameId) => {
//     try {
//       const response = await fetch(`http://127.0.0.1:8000/api/questions/?game=${29}`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
//       const data = await response.json();
//       console.log('Questions', data); // Use the data in your front-end logic
//       return data;
//     } catch (error) {
//       console.error('Error fetching questions:', error);
//     }
//   };

//   const deletequestions = async (gameId) => {
//     try {
//       const response = await fetch(`http://127.0.0.1:8000/api/questions/${9}/`, {
//         method: 'DELETE',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
  
//       if (response.ok) {
//         console.log('Game deleted successfully');
//       } else {
//         console.error('Error deleting game');
//       }
//     } catch (error) {
//       console.error('Error deleting game:', error);
//     }
//   };
//   const updateQuestion = async (questionId, updatedFields) => {
//     try {
//       const response = await fetch(`http://127.0.0.1:8000/api/questions/${questionId}/`, {
//         method: 'PATCH',  // or 'PUT' if you want a full update
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(updatedFields),  // Send the updated fields as JSON
//       });
  
//       if (response.ok) {
//         const data = await response.json();
//         console.log('Question updated successfully', data);
//       } else {
//         console.error('Error updating question', response.statusText);
//       }
//     } catch (error) {
//       console.error('Error updating question:', error);
//     }
//   };






  const handleNext = async () => {
    //const gameId = await postGame(settings);
    for (const question of questions) {
      //console.log({ text: question.title, answers: question.answers,correctAnswerIndex : question.correctAnswerIndex })
    //  await postQuestion({ text: question.title, answers: question.answers,correctAnswerIndex : question.correctAnswerIndex }, gameId);

    }


  }
 
    return (<Box ref={containerRef} sx={{ display: 'flex', padding: '20px', justifyContent: 'center', direction: 'ltr' }}>
       
      
      <Box sx={{width:'70%', textAlign: 'center' }}>
        
        
        <div className="main-container">
        <Box
  
  sx={{
    position: 'absolute',
    width: '100%',
    height: '300px', // Set height as needed
    backgroundImage: `url(${backTop})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    opacity: start ? 0 : 1,
    transform: start ? 'translateY(-100%)' : 'translateY(0)', // Move up off the screen
    transition: 'opacity 1s ease, transform 1s ease', 
    zIndex: 99 // Fade effect duration
  }}
>
<Typography variant="h2" gutterBottom color={'white'}sx={{ whiteSpace: 'pre-line', marginTop: '10pxx'}}>
مراجعة الخصائص الجسمية{"\n"}للكائنات الحية
        </Typography>
</Box>
<Box
  
  sx={{
    position: 'absolute',
    width: '100%',
    height: '300px', // Set height as needed
    backgroundImage: `url(${backBottom})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    opacity: start ? 0 : 1,
    transform: start ? 'translateY(200%)' : 'translateY(100%)', // Move up off the screen
    transition: 'opacity 1s ease, transform 1s ease', 
    zIndex: 99 // Fade effect duration
  }}
>
<Button variant="contained" sx={{backgroundColor: '#fff', transform: 'translateY(250%)',color: '#4B7857', fontSize: '2rem' ,'&:hover': {
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
    src={Maximize}
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
        loop={false}  src={counting3} alt="Timer" style={{ width: '120%', height: '120%', opacity: videoVisible ? 1 : 0 }} /> 
        </Box>
        <Box  className={`background-container ${showWheel ? 'zoom' : ''}`} sx={{ width: '100%',display: 'flex', alignItems: 'center',backgroundImage: `linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0)),url(${background})` 
                ,backgroundSize: 'cover',  // Ensures the image covers the entire box
                backgroundPosition: 'center', // Centers the image
                padding: '50px',
                borderRadius: '5px' }}>
                    
                    <img src={camel}  className={`side-image left-image ${animateImages ? 'animate' : ''}`} alt="Left Image" />
                    <img src={cactus} className={`side-image right-image ${animateImages ? 'animate' : ''}`} alt="Right Image" />

{finish &&
<Box 
    sx={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(255, 255, 255, 0.8)', // White with transparency
      zIndex: 999, // Ensure it's on top of the content inside the box
    }}
  >
    <Typography variant="h1" gutterBottom color={'white'}sx={{ color: '#4B7857',marginTop: '100px', direction: 'rtl'}}>
عمل رائع!
        </Typography>
        <Button variant="contained" sx={{backgroundColor: '#fff',color: '#4B7857',zIndex:99, fontSize: '2rem' ,'&:hover': {
      backgroundColor: 'grey',  // Hover color
    }}} onClick={handleStart}>تكرار اللعب<PlayArrowIcon /></Button>
    <Typography variant="h3" gutterBottom color={'white'}sx={{ color: '#4B7857',marginTop: '100px', direction: 'rtl'}}>
النقاط:  <span style={{ color: '#EB8576' }}>{score}</span>    
    </Typography>
    <img src={backBottom} width={'100%'} sx={{marginBottom:'30px'}}/>
    <img
    src={celebrateBubbles}
    alt="Settings"
    style={{
      position: 'absolute',
      bottom:'230px',
      left: '-300px',
      width: '90%',  // Adjust size as needed
      height: 'auto', // Adjust size as needed
    }}
  />

  {/* Maximize Icon - Positioned Bottom Right */}
  <img
    src={celebrateBubbles}
    alt="Settings"
    style={{
      position: 'absolute',
      bottom:'230px',
      right: '-300px',
      width: '90%',  // Adjust size as needed
      height: 'auto', // Adjust size as needed
    }}
  />
    {/* Optional: Any content you want to add inside the overlay */}
  </Box>}
          <Box  className={`wheel-container ${showWheel ? 'show' : ''}`} sx={{ position: 'relative', marginRight: '20px', width:'50%'}}>
            
          <img src={sound} alt="button"
            //onClick={handleSound}
             style={{position:'absolute', cursor: 'pointer',left:'10px',top:'-35px',border: 'none',padding: '0',background: 'none', width:'3vw'}}/>
           <img src={sound} alt="button"
            //onClick={handleSound}
             style={{position:'absolute', cursor: 'pointer',left:'10px',top:'-35px',border: 'none',padding: '0',background: 'none', width:'3vw'}}/>
            <div style={{ position: 'relative', display: 'inline-block', marginLeft: '200px' }}>
  <img 
    src={timer} 
    alt="button"
    style={{ 
      border: 'none',
      alignSelf: 'right', 
      width: '4vw', 
      
    }}
  />
  <div style={{
    position: 'absolute', 
    top: '50%', 
    left: '50%', 
    transform: 'translate(-50%, -50%)', // Center both horizontally and vertically
    fontWeight: 'bold',
    fontSize: '24px', 
    color: '#3B5D44',
    
  }}>
    {time}
  </div>
</div>
    {/*//////////////////// start of wheel //////////////////// */}
   
            
      {questions.length > 0 &&(
              
             
      <div className="App">
          <div  style={{ position: 'relative', width: '40vh', height: '40vh' }}>
          <span id="selector" style={{ position: 'absolute', top: '50%', left: '-15px', transform: 'translateY(-50%)' }}>
               <img src={arrow}/>
        </span>
        <canvas
          id="wheel"
          width="300"
          height="300"
          style={{
              zIndex: 90,
              transform: `rotate(${rotate}deg)`, // Add rotation transformation here
              WebkitTransition: `-webkit-transform ${easeOut}s ease-out`,
         
  
          }}
        />
      </div>
       </div>
              //////////////////////// end of wheel ///////////////////////
      )} 
      <Box sx={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
      
    </Box>

    <Button
       onClick={() => {playSound(2);spin();}}
        variant="contained"
        sx={{ zIndex: 1, marginBottom: '20px', backgroundColor: '#F3F27A', color: '#4B7857', float:'left', fontWeight:'bold' }}
        disabled={isSpinning || questions.length === 0 || selectedQuestion != null }
        //
      >
        {isSpinning ? 'Spinning...' :  (selectedQuestion == null? 'Spin': 'Answer the question')}
      </Button>
    </Box>

    {/*  //////scores / lives and questions on the right */}
    <Box className={`wheel-container ${showWheel ? 'show' : ''}`}  sx={{ display: 'flex', flexDirection: 'column', width: '50%', textAlign: 'center' }}>
    <img src={Maximize} onClick={handleFullscreen} style={{position:'absolute', cursor: 'pointer',right:'10px',top:'-70px', border: 'none',padding: '0',background: 'none', width:'3vw'}} />

    <Box sx={{ display: 'flex', flexDirection: 'row',height: '20%',background: `linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9))`,color:'FFFFFF',borderRadius: '10px', marginBottom: '20px'}}>
      <Box sx={{width:'40%',display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
        <Typography style={{marginLeft:'5%',fontSize:'24px',color:'#3B5D44'}}>Score: </Typography>
      <Typography style={{fontSize:'24px',color:'#EB8576'}}>{score}</Typography>
      </Box>
      <Box sx={{width:'60%',display: 'flex', flexDirection: 'row',alignItems: 'center'}}>
      <Typography style={{fontSize:'24px',color:'#3B5D44'}}>Lives:</Typography>
      {[...Array(5)].map((_, index) => (
          <img
            key={index}
            src={index >= lives ? heartE : heartF} // Choose image based on remaining lives
            style={{
              height: '50%',
              width: '100%',
              
              objectFit: 'contain',
            }}
            alt="heart icon"
          />
        ))}
      </Box>

    </Box>
    <Box sx={{background: `linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9))`,color:'FFFFFF',borderRadius: '10px', height:'45vh',float:'top'}}>
    
      {selectedQuestion ? (
        <>
          <Typography variant="h5" gutterBottom>
            {'Q'+selectedQuestion.label+': ' + selectedQuestion.title}
          </Typography>
          <Box
        sx={{
          display: 'grid',
          //gridTemplateColumns: `repeat(${selectedQuestion.answers.length}, 1fr)`,
          gridTemplateColumns: `repeat(${selectedQuestion.answers.some(answer => answer.image ) ? 2 : 1}, 1fr)`,
          justifyContent: 'center', // Center horizontally

          gap: '10px',
         
          marginTop: '10px',
          padding:'20px'
        }}
      >
        {selectedQuestion.answers.map((answer, index) => (
          <Box key={index} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop:'-10px' }}>
            <Button
            className={selectedAnswerIndex === index ? (isCorrect ? 'correct' : 'incorrect') : ''}
            variant="contained"
            onClick={() => handleAnswerSubmit(index)}
            sx={{
              backgroundColor:
                index === 0 ? '#ffb3b3' : index === 1 ? '#b3ffcc' : index === 2 ? '#ffffb3' : '#e6e6e6',
              color: '#333',
              // padding: '10px',
              fontWeight: 'bold',
              marginBottom: '10px',
              fontSize: '18px',
              borderRadius: '15px',
              width: '100%',
              direction: 'rtl',
              display: 'flex', // Use flex to align items inside the button
              alignItems: 'center', // Center items vertically
              justifyContent: 'space-between', // Spread items to the edges
              padding: '10px 20px', // Add padding for better spacing
              boxShadow: '0px 3px 6px rgba(0,0,0,0.1)',
              transition: 'transform 0.2s', // For zoom effect
              border: selectedAnswerIndex === index ? (isCorrect ? '3px solid green' : '3px solid red') : 'none',
              animation: selectedAnswerIndex === index ? (isCorrect ? 'zoom-in 0.5s forwards' : 'shake-tilt 0.5s forwards') : 'none',
              '&:hover': {
                backgroundColor:
                  index === 0 ? '#ff9999' : index === 1 ? '#99ff99' : index === 2 ? '#ffff99' : '#cccccc',
              },
            }}

          >
           
            
            {answer.image ? ( // Check if image exists
              <img
                src={answer.image}
                alt={`Answer ${index + 1}`}
                style={{ width: '15vh', height: '15vh', borderRadius: '10px' }}
              />
            ) : answer.text}

{selectedAnswerIndex === index && isCorrect && (
              <CheckCircle sx={{ color: 'green', marginRight: '8px', float:'left' }} /> // Correct icon
            )}
            {selectedAnswerIndex === index && isCorrect === false && (
              <Cancel sx={{ color: 'red', marginRight: '8px' }} /> // Incorrect icon
            )}
            
          </Button>
            
          </Box>
        ))}
      </Box>
         
         
        </>
      ) : (
        <Typography variant="h5" gutterBottom>
          Spin the wheel to get a question
        </Typography>
      )}
    </Box>
    </Box>
    {/* //////////////end of questions side////////////////// */}
   
  </Box>
  

      </div>
      
</Box>
 
      
</Box>
    );
  }



export default PlayGame; // Export the component
