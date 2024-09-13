
// import ReactDOM from "react-dom";
import "./Styles.css";
import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, RadioGroup, FormControlLabel, Radio, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
// import { Wheel } from 'react-custom-roulette';
// import axios from 'axios';
import timer from '../Assets/timer.png';
import sound from '../Assets/sound.png';
import heartE from '../Assets/heart.png';
import heartF from '../Assets/heartF.png';
import arrow from '../Assets/arrow.png'
// import { blue } from '@mui/material/colors';
import background from '../Assets/show.jpg'


  
  // List of hardcoded questions with answers
const GamePreview =({ Questions,settings}) =>{

  const [isSpinning, setIsSpinning] = useState(false);
  // const [prizeNumber, setPrizeNumber] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [questions, setQuestions] = useState(Questions);
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
  const [isTimerActive, setTimerActive] = useState(false); // Timer is active
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
    return i % 2 === 0 ? `#f9cacd` : "#ab5252";
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
 
    setNet(netRotation);
    setResult(resultValue);
    let selectedQuestionTitle = questions[resultValue];
    setSelectedQuestion({...selectedQuestionTitle, label: resultValue+1})
    setTimerActive(true);
  };

  const reset = () => {
    setRotate(0);
    setEaseOut(0);
    setResult(null);
    setSpinning(false);
  };
  const handleAnswerSubmit = () => {
    if (!selectedQuestion) return;

    const correctAnswer = selectedQuestion.answers[selectedQuestion.correctAnswerIndex]?.text;
    const isCorrectAnswer = selectedAnswer === correctAnswer;
    setIsCorrect(isCorrectAnswer);

    // Open the dialog to show if the answer is correct
    setDialogOpen(true);

    if (isCorrectAnswer) {
      // Remove the question from the list
      
      const newQuestions = questions.filter(q => q.title !== selectedQuestion.title);
      console.log(newQuestions);
      setQuestions(newQuestions);
      setSelectedQuestion(null);
      //renderWheel(); // Clear the right-side content
    }
    else{
      setLives(lives - 1)
      setSelectedQuestion(null);
    }
    
    handleReset();
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };





  const postGame = async (gameData) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/games/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(gameData),
      });
      const data = await response.json();
      return data.id; // Return the game ID for creating questions
    } catch (error) {
      console.error('Error posting game:', error);
    }
  };


  const postQuestion = async (questionData, gameId) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/questions/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...questionData, game: gameId }),
      });

    } catch (error) {
      console.error('Error posting question:', error);
    }
  };


  const handleSound = () => {
  
  };





  const handleNext = async () => {
    const gameId = await postGame(settings);
    for (const question of questions) {
      console.log({ text: question.title, answers: question.answers,correctAnswerIndex : question.correctAnswerIndex })
      await postQuestion({ text: question.title, answers: question.answers,correctAnswerIndex : question.correctAnswerIndex }, gameId);

    }


  }
 
    return (<Box sx={{ display: 'flex', padding: '20px', justifyContent: 'center' }}>
       
      
      <Box sx={{width:'70%', textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Game Preview
        </Typography>
 
        <Box sx={{ width: '100%',display: 'flex', alignItems: 'center',backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.4)),url(${background})` 
                ,backgroundSize: 'cover',  // Ensures the image covers the entire box
                backgroundPosition: 'center', // Centers the image
                padding: '50px',
                borderRadius: '5px' }}>
          <Box sx={{ position: 'relative', marginRight: '20px', width:'50%'}}>
         
          <img 
            src={sound} 
            alt="button"
            onClick={handleSound}
            
            style={{ cursor: 'pointer',float:'left', border: 'none',padding: '0',background: 'none'}}/>
            <div style={{ position: 'relative', display: 'inline-block', alignSelf: 'center' }}>
            <img 
            src={timer} 
            alt="button"
            style={{ cursor: 'pointer', border: 'none',alignSelf:'center',background: 'none'}}/>
            <div style={{
      position: 'absolute', 
      top: '47%', 
      left: '50%', 
      transform: 'translate(-50%, -50%)', 
      fontWeight:'bold',
      fontSize: '24px', 
      color: '#3B5D44'
    }}>{time}</div></div>
    {/*//////////////////// start of wheel //////////////////// */}
    {windowWidth < 900 ? (
        selectedQuestion ? (
          // Show only the question with lives
          <Box className="selected-question-container show">
             {/*  //////scores / lives and questions on the right */}
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '50%', textAlign: 'center' }}>
    <Box sx={{ display: 'flex', flexDirection: 'row',height: '20%',background: `linear-gradient(rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.4))`, marginBottom: '20px'}}>
      <Box sx={{width:'40%',display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
        <Typography style={{marginLeft:'5%',fontSize:'24px',color:'#3B5D44'}}>Score: </Typography>
      <Typography style={{fontSize:'24px',color:'#EB8576'}}>100</Typography>
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
    <Box sx={{background: `linear-gradient(rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.4))`, float:'top'}}>
    
      {selectedQuestion ? (
        <>
          <Typography variant="h5" gutterBottom>
            {'Q'+selectedQuestion.label+': ' + selectedQuestion.title}
          </Typography>
          <RadioGroup
            value={selectedAnswer}
            onChange={(e) => setSelectedAnswer(e.target.value)}
            sx={{ marginTop: '20px', marginLeft:'20px' }}
          >
            {selectedQuestion.answers.map((answer, index) => (
              <FormControlLabel
                key={index}
                value={answer.text}
                control={<Radio />}
                label={answer.text}
              />
            ))}
          </RadioGroup>
          <Button
            onClick={handleAnswerSubmit}
            variant="contained"
            color="primary"
            sx={{ marginTop: '40px', marginBottom: '20px' }}
          >
            Submit Answer
          </Button>
        </>
      ) : (
        <Typography variant="h5" gutterBottom>
          Spin the wheel to get a question
        </Typography>
      )}
    </Box>
    </Box>
    {/* //////////////end of questions side////////////////// */}
            {/* Render the question and lives UI */}
          </Box>
        ) :(<Box className="wheel-container">
          {questions.length > 0 &&(
              
             
            <div className="App">
                <div className="wheel-container" style={{ position: 'relative', width: '300px', height: '300px' }}>
                <span id="selector" style={{ position: 'absolute', top: '50%', left: '-15px', transform: 'translateY(-50%)' }}>
                     <img src={arrow}/>
              </span>
              <canvas
                id="wheel"
                width="300"
                height="300"
                style={{
                  WebkitTransition: `-webkit-transform ${easeOut}s ease-out`,
                }}
              />
            </div>
             </div>
        )}</Box>) ):(<>
            
            {questions.length > 0 &&(
              
             
      <div className="App">
          <div className="wheel-container" style={{ position: 'relative', width: '300px', height: '300px' }}>
          <span id="selector" style={{ position: 'absolute', top: '50%', left: '-15px', transform: 'translateY(-50%)' }}>
               <img src={arrow}/>
        </span>
        <canvas
          id="wheel"
          width="300"
          height="300"
          style={{
            WebkitTransition: `-webkit-transform ${easeOut}s ease-out`,
          }}
        />
      </div>
       </div>
              //////////////////////// end of wheel ///////////////////////
      )}</>) }<Box sx={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
      
    </Box>

    <Button
        onClick={spin}
        variant="contained"
        sx={{ zIndex: 1, marginBottom: '20px', backgroundColor: '#F3F27A', color: '#4B7857', float:'left', fontWeight:'bold' }}
        disabled={isSpinning || questions.length === 0 || selectedQuestion != null }
        //
      >
        {isSpinning ? 'Spinning...' :  (selectedQuestion == null? 'Spin': 'Answer the question')}
      </Button>
    </Box>

    {/*  //////scores / lives and questions on the right */}
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '50%', textAlign: 'center' }}>
    <Box sx={{ display: 'flex', flexDirection: 'row',height: '20%',background: `linear-gradient(rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.4))`, marginBottom: '20px'}}>
      <Box sx={{width:'40%',display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
        <Typography style={{marginLeft:'5%',fontSize:'24px',color:'#3B5D44'}}>Score: </Typography>
      <Typography style={{fontSize:'24px',color:'#EB8576'}}>100</Typography>
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
    <Box sx={{background: `linear-gradient(rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.4))`, float:'top'}}>
    
      {selectedQuestion ? (
        <>
          <Typography variant="h5" gutterBottom>
            {'Q'+selectedQuestion.label+': ' + selectedQuestion.title}
          </Typography>
          <RadioGroup
            value={selectedAnswer}
            onChange={(e) => setSelectedAnswer(e.target.value)}
            sx={{ marginTop: '20px', marginLeft:'20px' }}
          >
            {selectedQuestion.answers.map((answer, index) => (
              <FormControlLabel
                key={index}
                value={answer.text}
                control={<Radio />}
                label={answer.text}
              />
            ))}
          </RadioGroup>
          <Button
            onClick={handleAnswerSubmit}
            variant="contained"
            color="primary"
            sx={{ marginTop: '40px', marginBottom: '20px' }}
          >
            Submit Answer
          </Button>
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
  <Button
        onClick={handleNext}
        variant="contained"
        color="primary"
        sx={{ backgroundColor: '#EB8576', color: '#fff' }}
      >
        Share
      </Button>
</Box>
<Dialog open={dialogOpen} onClose={handleDialogClose}>
  <DialogTitle>{isCorrect ? 'Correct!' : 'Wrong Answer'}</DialogTitle>
  <DialogContent>
    <Typography>
      {isCorrect ? 'You answered correctly!' : 'Try again!'}
    </Typography>
  </DialogContent>
  <DialogActions>
    <Button onClick={handleDialogClose} color="primary">
      Close
    </Button>
  </DialogActions>
</Dialog>
      
</Box>
    );
  }



export default GamePreview; // Export the component
