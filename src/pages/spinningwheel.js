// import React, { useState, useRef } from 'react';
// import {
//   Box, Button, TextField, Typography, Dialog, DialogTitle, DialogContent, DialogActions,
// } from '@mui/material';
// import { Wheel } from 'react-custom-roulette';

// const GamePage = () => {
//   const [questions, setQuestions] = useState([]);
//   const [newQuestion, setNewQuestion] = useState('');
//   const [selectedQuestion, setSelectedQuestion] = useState(null);
//   const [isSpinning, setIsSpinning] = useState(false);
//   const [dialogOpen, setDialogOpen] = useState(false);
//   const [answer, setAnswer] = useState('');
//   const [prizeNumber, setPrizeNumber] = useState(null);
//   const wheelRef = useRef(null);  // Ref to track the wheel instance

//   const handleAddQuestion = () => {
//     if (newQuestion.trim() !== '') {
//       setQuestions([...questions, newQuestion]);
//       setNewQuestion('');
//     }
//   };

//   const handleSpinWheel = () => {
//     if (questions.length > 0) {
//       setIsSpinning(true);
//       const randomIndex = Math.floor(Math.random() * questions.length);
//       setPrizeNumber(randomIndex);

//       // Ensure wheel spinning stops before showing dialog
//       setTimeout(() => {
//         if (wheelRef.current) {
//           wheelRef.current.spin();
//         }
//       }, 100); // Short delay to ensure the spin action
//     }
//   };

//   const handleStopSpinning = () => {
//     setIsSpinning(false);
//     setSelectedQuestion(questions[prizeNumber]);
//     setDialogOpen(true);
//   };

//   const handleDialogClose = () => {
//     setDialogOpen(false);
//     setAnswer(''); // Reset the answer field when dialog closes
//   };

//   const handleAnswerSubmit = () => {
//     console.log(`Answer: ${answer}`); // Handle the answer submission
//     handleDialogClose();
//   };

//   return (
//     <Box sx={{ textAlign: 'center', padding: '20px' }}>
//       <Typography variant="h4" gutterBottom>
//         Add Your Questions
//       </Typography>
//       <TextField
//         value={newQuestion}
//         onChange={(e) => setNewQuestion(e.target.value)}
//         placeholder="Enter your question"
//         sx={{ width: '300px', marginBottom: '20px' }}
//       />
//       <Button
//         onClick={handleAddQuestion}
//         variant="contained"
//         sx={{ marginLeft: '10px', backgroundColor: '#3B5D44', color: '#fff' }}
//       >
//         Add Question
//       </Button>

//       <Box sx={{ marginTop: '40px', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//         <Button
//           onClick={handleSpinWheel}
//           variant="contained"
//           sx={{ marginBottom: '20px', backgroundColor: '#EB8576', color: '#fff' }}
//           disabled={isSpinning || questions.length === 0}
//         >
//           {isSpinning ? 'Spinning...' : 'Spin the Wheel'}
//         </Button>

//         {/* Wheel Display */}
//         {questions.length > 0 && (
//           <Wheel
//             ref={wheelRef}  // Attach ref to the Wheel component
//             mustStartSpinning={isSpinning}
//             prizeNumber={prizeNumber}
//             data={questions.map((question) => ({ option: question }))}
//             backgroundColors={['#3B5D44', '#EB8576']}
//             textColors={['#ffffff']}
//             spinDuration={0.3}
//             onStopSpinning={handleStopSpinning} // Callback for when spinning stops
//           />
//         )}
//       </Box>

//       {/* Dialog to display the selected question and answer it */}
//       <Dialog open={dialogOpen} onClose={handleDialogClose}>
//         <DialogTitle>Answer the Question</DialogTitle>
//         <DialogContent>
//           <Typography variant="body1" gutterBottom>
//             {selectedQuestion}
//           </Typography>
//           <TextField
//             value={answer}
//             onChange={(e) => setAnswer(e.target.value)}
//             placeholder="Type your answer here"
//             fullWidth
//             sx={{ marginTop: '20px' }}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleAnswerSubmit} variant="contained" color="primary">
//             Submit Answer
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default GamePage;
