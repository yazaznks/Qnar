import React, { useState } from 'react';
import { Paper, TextField,FormControl, FormLabel, RadioGroup, Button, IconButton, Radio, Grid,FormControlLabel, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import ImageIcon from '@mui/icons-material/Image';
import mainIcon from '../Assets/spinIcon.png'
import { useTranslation } from 'react-i18next';
const GameContent = ({ Questions, SetQuestions,settings, setSettings, onNext }) => {
    const [questions, setQuestions] = useState([{ title: '', answers: [{ text: '', image: null }, { text: '', image: null }], correctAnswerIndex: 0 }]);

    const [deleteWarningOpen, setDeleteWarningOpen] = useState(false);
    const [deleteAdd, setDeleteAdd]= useState(0)
    const [GameTitle, setGameTitle]= useState('')
    const [answerType, setAnswerType] = useState('word');
    const [description, setDescription] = useState('');
    const {t, i18n} = useTranslation();

    const addQuestion = () => {
        setQuestions([...questions, { title: '', answers: [{ text: '', image: null }, { text: '', image: null }], correctAnswerIndex: 0 }]);
    };

    const addAnswer = (qIndex) => {
        const newQuestions = [...questions];
        if (newQuestions[qIndex].answers.length < 4) {
            newQuestions[qIndex].answers.push({ text: '', image: null });
            setQuestions(newQuestions);
        } else {
            setDeleteAdd(1);
            setDeleteWarningOpen(true);
        }
        
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
            setDeleteAdd(0);
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
        <div style={{  backgroundColor: '#CFE7D5' ,color :'#4B7857' }}>
            {/* Game Icon and Description */}
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <img src={mainIcon} alt="Game Icon" style={{ width: '20vw', height: 'auto', marginTop:'20px' }} />
                <Typography  variant="h3" style={{ fontWeight:'bold'}}gutterBottom>{t('SpinningH1')}</Typography>
                <Typography variant="h6">{t('SpinningH2')}</Typography>
            </div>

            {/* Add Content Section */}
            <Paper style={{ padding: '20px', marginBottom: '20px', marginLeft: 20, marginRight:20 ,color :'#4B7857', fontWeight:'bold'}}>
              <Typography variant= "h2"style={{ textAlign: 'center',fontWeight:'bold' }} >{t('Content')}</Typography>
            
                <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '-8px' }}>
  {t('CTitle')} {/* Title text */}
</Typography>
                <TextField label={t('CAddTitle')} fullWidth margin="normal" value={GameTitle}
                onChange={handleTitleChange}/>
                <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '-8px' }}>
  {t('CDescription')} {/* Title text */}
</Typography>
                <TextField label={t('CAddDescription')} fullWidth margin="normal"  value={description}
                onChange={(e) => setDescription(e.target.value)}/>
<Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '-8px' }}>
  {t('CQuestion')} {/* Title text */}
</Typography>
{questions.map((question, qIndex) => (
  <div key={question.id} style={{ marginBottom: '20px' }}>
    <Grid container spacing={2}>
      {/* Question Label (e.g., Q1) */}
      <Grid item xs={"auto"}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Q{qIndex + 1}
        </Typography>
      </Grid>

      {/* Question TextField */}
      <Grid item xs={11}>
        <TextField
          fullWidth
          label={t('CAddQuestion')}
          value={question.title}
          onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
        />
      </Grid>
    </Grid>

{/* Radio buttons to choose between Word and Picture answers */}
<FormControl component="fieldset" style={{ marginLeft: '40px', marginTop: '20px' }}>
  <FormLabel component="legend">Answer Type</FormLabel>
  <RadioGroup
    row
    value={question.answerType} // Assume question has an 'answerType' field ('word' or 'picture')
    onChange={(e) => setAnswerType(e.target.value)} // Handle answer type chang
  >
    <FormControlLabel value="word" control={<Radio />} label="Word Answers" />
    <FormControlLabel value="picture" control={<Radio />} label="Picture Answers" />
  </RadioGroup>
</FormControl>

{/* Answers for the Question */}
<Grid container spacing={2} style={{ marginLeft: '40px', marginTop: '10px' }}>
  {question.answers.map((answer, aIndex) => (
    <Grid container key={aIndex} alignItems="center" spacing={2}>
      
      {/* Answer Label (A, B, C, etc.) */}
      <Grid item xs={"auto"}>
        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
          {String.fromCharCode(65 + aIndex)}.
        </Typography>
      </Grid>

      {/* Conditional Rendering: Show text field for word answers or image upload for picture answers */}
      {answerType === 'word' ? (
        <Grid item xs={9}>
          {/* Word Answer TextField */}
          <TextField
            fullWidth
            margin="normal"
            label={t('CAddAnswer')}
            value={answer.text}
            onChange={(e) => handleAnswerChange(qIndex, aIndex, e.target.value)}
          />
        </Grid>
      ) : (
        
        <Grid item xs={"auto"}>
          {/* Picture Answer Image Upload */}
          <Grid item xs={"auto"}>
          <IconButton color="primary" component="label">
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Add Pictures
        </Typography>
            <ImageIcon />
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={(e) => handleImageUpload(qIndex, aIndex, e)}
            />
          </IconButton>
          </Grid>
          
        </Grid>
      )}
{/* Display the uploaded image */}
{answer.image && (
            <Grid item xs={4}>
                
              <img
                src={answer.image}
                alt="Answer"
                style={{ width: '100px', height: '100px', objectFit: 'fit', borderRadius: '8px' }}
              />
            </Grid>
          )}
      {/* Correct Answer Radio Button */}
      <Grid item xs={"auto"}>
        <FormControlLabel
          control={
            <Radio
              checked={question.correctAnswerIndex === aIndex}
              onChange={() => handleCorrectAnswerChange(qIndex, aIndex)}
            />
          }
          label="Correct"
        />
      </Grid>

      {/* Delete Answer Button */}
      <Grid item xs={"auto"}>
        <IconButton onClick={() => deleteAnswer(qIndex, aIndex)} color="secondary" aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </Grid>
    </Grid>
  ))}
  <Button
                            startIcon={<AddCircleIcon />}
                            onClick={() => addAnswer(qIndex)}
                            style={{ marginTop: '10px', marginBottom: '20px' }}>
                            {t('addA')}
                        </Button>
</Grid>
  </div>
))}

   

                <Button startIcon={<AddCircleIcon />} onClick={addQuestion}>
                {t('addQ')}
                </Button>
            </Paper>

            {/* Next Button */}
            <div style={{ textAlign: 'right' }}>
                <Button variant="contained" color="primary" onClick={handleNext}>
                {t('Next')}
                </Button>
            </div>

            {/* Delete Warning Dialog */}
            <Dialog
                open={deleteWarningOpen}
                onClose={handleCloseDeleteWarning}
            >
                <DialogTitle>{t('warning')}</DialogTitle>
                <DialogContent>
                {deleteAdd === 0?
                    <DialogContentText>
                        {t('least2')}
                        
                    </DialogContentText>:
                    <DialogContentText>
                        {t('max4')}
                   
                </DialogContentText>}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteWarning} color="primary">
                    {t('ok')}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default GameContent;
