// import ReactDOM from "react-dom";
import "./Styles.css";
import React, { useState, useEffect, useRef } from 'react';
import { Box, Button, Typography, Container } from '@mui/material';
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
import settingsIcon from '../Assets/settings.png'
import celebrateBubbles from '../Assets/celebration.gif'
import { useRoute } from 'wouter';
function PlayGameTesting() {
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
    //GetQuestions();
    //console.log(questions)
    setQuestions(questionsOG)
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


//   const GetGame = async () => {
//     try {
//       const response = await fetch(`http://127.0.0.1:8000/api/games/${id}`, {
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


//   const GetQuestions = async () => {
//     try {
//       const response = await fetch(`http://127.0.0.1:8000/api/questions/?game=${id}`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
//       const data = await response.json();
//       console.log('Questions', data); // Use the data in your front-end logic
//       setQuestions(data)
//       return data;
//     } catch (error) {
//       console.error('Error fetching questions:', error);
//     }
//   };

  const deletequestions = async (gameId) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/questions/${9}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        console.log('Game deleted successfully');
      } else {
        console.error('Error deleting game');
      }
    } catch (error) {
      console.error('Error deleting game:', error);
    }
  };
  const updateQuestion = async (questionId, updatedFields) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/questions/${questionId}/`, {
        method: 'PATCH',  // or 'PUT' if you want a full update
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedFields),  // Send the updated fields as JSON
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Question updated successfully', data);
      } else {
        console.error('Error updating question', response.statusText);
      }
    } catch (error) {
      console.error('Error updating question:', error);
    }
  };






  const handleNext = async () => {
    //const gameId = await postGame(settings);
    for (const question of questions) {
      //console.log({ text: question.title, answers: question.answers,correctAnswerIndex : question.correctAnswerIndex })
    //  await postQuestion({ text: question.title, answers: question.answers,correctAnswerIndex : question.correctAnswerIndex }, gameId);

    }


  }
 
    return ( <Container maxWidth="xl" sx={{ padding: '20px' }}>
        {/* Main Game Area */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-around',
            alignItems: 'center',
            gap: '20px',
            padding: '20px',
          }}
        >
        
          {/* Spinning Wheel */}
        <Box
          className="show"
          sx={{
            width: { xs: '60vw', sm: '40vw', md: '30vw' },
            height: { xs: '60vw', sm: '40vw', md: '30vw' },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          {/* Selector Arrow */}
          <Box
            id="selector"
            sx={{
              position: 'absolute',
              top: '30%',
              left: '200%', // Adjusts arrow position for responsiveness
              transform: 'translateY(-50%)',
              zIndex: 1000,
              width: { xs: '5vw', md: '3vw' }, // Adjusts arrow size for responsiveness
          border: '2px solid red'
            }}
          >
            <img src={arrow} alt="selector arrow" style={{ width: '100%', height: 'auto' }} />
          </Box>
        
          {/* Canvas for the Wheel */}
          <canvas
            id="wheel"
            width="300"
            height="300"
            style={{
              width: '70%', // Makes canvas responsive to container
              height: '70%',
              zIndex: 90,
              transform: `rotate(${rotate}deg)`,
              transition: `transform ${easeOut}s ease-out`,
            }}
          />
        </Box>
   {/* Right Side Image */}
   <Box sx={{ width: { xs: '50%', sm: '20%' }, textAlign: 'center' }}>
          <img
            src="ship.png" // Update with actual image path
            alt="ship"
            style={{ width: '100%', height: 'auto' }}
            className="side-image right-image"
          />
        </Box>
      </Box>

      {/* Question Section */}
      <Box
        sx={{
          textAlign: 'center',
          marginTop: '20px',
          padding: { xs: '10px', sm: '20px' },
          fontSize: { xs: '1rem', sm: '1.5rem', md: '2rem' },
        }}
      >
        <Typography variant="h5" sx={{ fontSize: { xs: '1.5rem',sm:'1.5rem', md: '2rem' } }}>
          What is the capital of France?
        </Typography>
      </Box>

      {/* Answer Buttons */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: selectedQuestion.answers.some(answer => answer.image) ? 'repeat(2, 1fr)' : '1fr',
            md: selectedQuestion.answers.some(answer => answer.image) ? 'repeat(3, 1fr)' : '1fr'
          },          gap: '10px',
          justifyContent: 'center',
          padding: '20px',
        }}
      >
        {['Paris', 'London', 'Rome', 'Berlin'].map((answer) => (
          <Button
            key={answer}
            variant="contained"
            sx={{
              fontSize: { xs: '0.8rem', sm: '1rem', md: '1.2rem' },
              padding: { xs: '8px', sm: '10px', md: '15px' },
              width: '100%',
            }}
          >
            {answer}
          </Button>
        ))}
      </Box>

      {/* Score and Lives Section */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-around',
          marginTop: '20px',
          padding: '10px',
          fontSize: { xs: '0.8rem', sm: '1rem', md: '1.2rem' },
        }}
      >
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h6" sx={{ fontSize: { xs: '0.9rem', md: '1.2rem' } }}>Score: 100</Typography>
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h6" sx={{ fontSize: { xs: '0.9rem', md: '1.2rem' } }}>Lives: 3</Typography>
        </Box>
      </Box>
    </Container>
  );
};

        

export default PlayGameTesting