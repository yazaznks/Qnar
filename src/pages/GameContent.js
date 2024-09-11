import React, { useState } from 'react';
import { Paper, TextField, Button, IconButton, Radio, FormControlLabel, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import ImageIcon from '@mui/icons-material/Image';

const GameContent = ({ Questions, SetQuestions,settings, setSettings, onNext }) => {
    const [questions, setQuestions] = useState([{ title: '', answers: [{ text: '', image: null }, { text: '', image: null }], correctAnswerIndex: 0 }]);
    const [deleteWarningOpen, setDeleteWarningOpen] = useState(false);
    const [GameTitle, setGameTitle]= useState('')
    
    const [description, setDescription] = useState('');
    const addQuestion = () => {
        setQuestions([...questions, { title: '', answers: [{ text: '', image: null }, { text: '', image: null }], correctAnswerIndex: 0 }]);
    };

    const addAnswer = (qIndex) => {
        const newQuestions = [...questions];
        newQuestions[qIndex].answers.push({ text: '', image: null });
        setQuestions(newQuestions);
    };

    const handleQuestionChange = (index, value) => {
        const newQuestions = [...questions];
        newQuestions[index].title = value;
        setQuestions(newQuestions);
        SetQuestions(newQuestions);
    };

    const handleAnswerChange = (qIndex, aIndex, value) => {
        const newQuestions = [...questions];
        newQuestions[qIndex].answers[aIndex].text = value;
        setQuestions(newQuestions);
    };

    const handleCorrectAnswerChange = (qIndex, aIndex) => {
        const newQuestions = [...questions];
        newQuestions[qIndex].correctAnswerIndex = aIndex;
        setQuestions(newQuestions);
    };

    const deleteAnswer = (qIndex, aIndex) => {
        const newQuestions = [...questions];
        if (newQuestions[qIndex].answers.length > 2) {
            newQuestions[qIndex].answers.splice(aIndex, 1);
            if (newQuestions[qIndex].correctAnswerIndex === aIndex) {
                newQuestions[qIndex].correctAnswerIndex = null; // Reset correct answer if it was deleted
            }
            setQuestions(newQuestions);
        } else {
            setDeleteWarningOpen(true);
        }
    };

    const handleImageUpload = (qIndex, aIndex, event) => {
        const newQuestions = [...questions];
        newQuestions[qIndex].answers[aIndex].image = URL.createObjectURL(event.target.files[0]);
        setQuestions(newQuestions);
    };
    const handleTitleChange = (e) => {
        const newValue = e.target.value;
        setGameTitle(newValue);
        // Add your additional function here
        setSettings( {...settings, // Assuming you have other settings in the state
            title: newValue})
    };
    
    const handleCloseDeleteWarning = () => {
        setDeleteWarningOpen(false);
    };
    const handleNext = () => {
        if (!GameTitle.trim()) {
            alert('Please enter a title for the game.');
            return;
        }
    
        // Check if there is at least one question with a non-empty title
        const hasValidQuestion = questions.some(question => question.title.trim());
    
        if (!hasValidQuestion) {
            alert('Please enter at least one question.');
            return;
        }

        const allQuestionsHaveCorrectAnswer = questions.every(question => 
            question.correctAnswerIndex !== null
        );
    
        if (!allQuestionsHaveCorrectAnswer) {
            alert('Please select a correct answer for each question.');
            return;
        }
        SetQuestions(questions.map(question => ({

            title: question.title,
            answers: question.answers.map(answer => ({
                text: answer.text,
                image: answer.image
            })),
            correctAnswerIndex: question.correctAnswerIndex
        })));
        setSettings( {...settings, // Assuming you have other settings in the state
            title: GameTitle,
            description: description})
        // Trigger the onNext function passed from parent to move to the next step
        onNext();
    };
    return (
        <div style={{ padding: '20px',marginTop: 4, marginLeft: 20, marginRight:20, }}>
            {/* Game Icon and Description */}
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <img src="/path/to/game-icon.png" alt="Game Icon" style={{ width: '100px' }} />
                <p>Describe your game here...</p>
            </div>

            {/* Add Content Section */}
            <Paper style={{ padding: '20px', marginBottom: '20px', marginLeft: 20, marginRight:20, }}>
                <h2>Add Content</h2>

                <TextField label="Activity Title" fullWidth margin="normal" value={GameTitle}
                onChange={handleTitleChange}/>
                <TextField label="Add Description" fullWidth margin="normal"  value={description}
                onChange={(e) => setDescription(e.target.value)}/>

                {questions.map((question, qIndex) => (
                    <div key={question.id}>
                        <TextField
                            label={`Q${qIndex + 1}`}
                            fullWidth
                            margin="normal"
                            value={question.title}
                            onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                        />
                        {question.answers.map((answer, aIndex) => (
                            <div key={aIndex} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                <TextField
                                    label={`Answer ${String.fromCharCode(65 + aIndex)}`}
                                    fullWidth
                                    margin="normal"
                                    value={answer.text}
                                    onChange={(e) => handleAnswerChange(qIndex, aIndex, e.target.value)}
                                    style={{ marginRight: '10px' }}
                                />
                                <IconButton
                                    color="primary"
                                    component="label"
                                    style={{ marginRight: '10px' }}
                                >
                                    <ImageIcon />
                                    <input
                                        type="file"
                                        hidden
                                        accept="image/*"
                                        onChange={(e) => handleImageUpload(qIndex, aIndex, e)}
                                    />
                                </IconButton>
                                {answer.image && <img src={answer.image} alt="Answer" style={{ width: '200px', height: '200px', marginRight: '10px' }} />}
                                <FormControlLabel
                                    control={
                                        <Radio
                                            checked={question.correctAnswerIndex === aIndex}
                                            onChange={() => handleCorrectAnswerChange(qIndex, aIndex)}
                                        />
                                    }
                                    label="Correct"
                                />
                                <IconButton
                                    onClick={() => deleteAnswer(qIndex, aIndex)}
                                    color="secondary"
                                    aria-label="delete"
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </div>
                        ))}
                        <Button
                            startIcon={<AddCircleIcon />}
                            onClick={() => addAnswer(qIndex)}
                            style={{ marginTop: '10px', marginBottom: '20px' }}
                        >
                            Add More Answers
                        </Button>
                    </div>
                ))}

                <Button startIcon={<AddCircleIcon />} onClick={addQuestion}>
                    Add More Questions
                </Button>
            </Paper>

            {/* Next Button */}
            <div style={{ textAlign: 'right' }}>
                <Button variant="contained" color="primary" onClick={handleNext}>
                    Next
                </Button>
            </div>

            {/* Delete Warning Dialog */}
            <Dialog
                open={deleteWarningOpen}
                onClose={handleCloseDeleteWarning}
            >
                <DialogTitle>Warning</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Each question must have at least two answers. You cannot delete an answer if there are only two remaining.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteWarning} color="primary">
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default GameContent;
