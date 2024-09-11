import React, { useState } from 'react';
import { Paper, Typography, FormControl, FormControlLabel, RadioGroup, Radio, Button, Grid, InputLabel, Select, MenuItem, TextField, Box, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import show from '../Assets/show.jpg';
import show2 from '../Assets/show2.jpg';
const Settings = ({ settings, setSettings, onNext }) => {
    const [spinningSpeed, setSpinningSpeed] = useState(1);
    const [hideAnswered, setHideAnswered] = useState(true);
    const [questionNumberAppearance, setQuestionNumberAppearance] = useState('numbers');
    const [gameSound, setGameSound] = useState(true);
    const [shuffleAnswers, setShuffleAnswers] = useState(true);
    const [repeatWrongAnswers, setRepeatWrongAnswers] = useState(true);
    const [showCorrectAnswers, setShowCorrectAnswers] = useState(true);
    const [skipQuestions, setSkipQuestions] = useState(true);
    const [backgroundOption, setBackgroundOption] = useState('sample1');
    const [uploadedImage, setUploadedImage] = useState(null);

    const handleBackgroundChange = (event) => {
        const value = event.target.value;
        setBackgroundOption(value);
        if (value !== 'upload') {
            setUploadedImage(null); // Clear uploaded image if a sample is selected
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setUploadedImage(URL.createObjectURL(file));
            setBackgroundOption('upload');
        }
    };

    const handleNext = () => {
        setSettings({...settings,
            Speed: spinningSpeed,
            HideQ: hideAnswered,
            sound:gameSound,
            shuffle:shuffleAnswers,
            repeat:repeatWrongAnswers,
            showA:showCorrectAnswers,
            skip: skipQuestions,
            creator: 1,
            // bg:backgroundOption,
            background:uploadedImage
        });  
        console.log('Updated Settings:', settings);

        // Trigger the onNext function passed from parent to move to the next step
        onNext();
    };

    return (
        <Paper elevation={3} sx={{ padding: 4,marginTop: 4, marginLeft: 20, marginRight:20, }}>
            <Typography variant="h4" gutterBottom style={{ textAlign: 'center', marginBottom: '20px' }}> 
                Settings
            </Typography>
            
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <FormControl component="fieldset" fullWidth>
                        <Typography variant="subtitle1">Spinning Speed</Typography>
                        <RadioGroup
                            row
                            value={spinningSpeed.toString()}
                            onChange={(e) => setSpinningSpeed(parseInt(e.target.value))}
                        >
                            <FormControlLabel value="1" control={<Radio />} label="Low" />
                            <FormControlLabel value="2" control={<Radio />} label="Mid" />
                            <FormControlLabel value="3" control={<Radio />} label="High" />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                    <FormControl component="fieldset" fullWidth>
                        <Typography variant="subtitle1">Hide Answered Questions from Wheel</Typography>
                        <RadioGroup
                            row
                            value={hideAnswered.toString()}
                            onChange={(e) => setHideAnswered(e.target.value === "true")}
                        >
                            <FormControlLabel value="true" control={<Radio />} label="Hide" />
                            <FormControlLabel value="false" control={<Radio />} label="Keep" />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                
        
                
                <Grid item xs={12} sm={6}>
                    <FormControl component="fieldset" fullWidth>
                        <Typography variant="subtitle1">Game Sound</Typography>
                        <RadioGroup
                            row
                            value={gameSound.toString()}
                            onChange={(e) => setGameSound(e.target.value === "true")}
                        >
                            <FormControlLabel value="true" control={<Radio />} label="On" />
                            <FormControlLabel value="false" control={<Radio />} label="Off" />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                    <FormControl component="fieldset" fullWidth>
                        <Typography variant="subtitle1">Shuffle Answers</Typography>
                        <RadioGroup
                            row
                            value={shuffleAnswers.toString()}
                            onChange={(e) => setShuffleAnswers(e.target.value === "true")}
                        >
                            <FormControlLabel value="true" control={<Radio />} label="On" />
                            <FormControlLabel value="false" control={<Radio />} label="Off" />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                    <FormControl component="fieldset" fullWidth>
                        <Typography variant="subtitle1">Repeat Wrong Answers</Typography>
                        <RadioGroup
                            row
                            value={repeatWrongAnswers.toString()}
                            onChange={(e) => setRepeatWrongAnswers(e.target.value === "true")}
                        >
                            <FormControlLabel value="true" control={<Radio />} label="On" />
                            <FormControlLabel value="false" control={<Radio />} label="Off" />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                    <FormControl component="fieldset" fullWidth>
                        <Typography variant="subtitle1">Show Correct Answers</Typography>
                        <RadioGroup
                            row
                            value={showCorrectAnswers.toString()}
                            onChange={(e) => setShowCorrectAnswers(e.target.value === "true")}
                        >
                            <FormControlLabel value="true" control={<Radio />} label="On" />
                            <FormControlLabel value="false" control={<Radio />} label="Off" />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                    <FormControl component="fieldset" fullWidth>
                        <Typography variant="subtitle1">Skip Questions</Typography>
                        <RadioGroup
                            row
                            value={skipQuestions.toString()}
                            onChange={(e) => setSkipQuestions(e.target.value === "true")}
                        >
                            <FormControlLabel value="true" control={<Radio />} label="On" />
                            <FormControlLabel value="false" control={<Radio />} label="Off" />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                
                <Grid item xs={12}>
                    <FormControl component="fieldset" fullWidth>
                        <Typography variant="subtitle1">Choose Background</Typography>
                        <Box display="flex" flexDirection="column" alignItems="center">
                            <RadioGroup
                                row
                                value={backgroundOption}
                                onChange={handleBackgroundChange}
                                defaultValue="top"
                            >
                                <FormControlLabel value="sample1" control={<Radio />} labelPlacement="top" label={
                                    <Box textAlign="center">
                                        <img src={show} alt="Sample 1" style={{ width: 'auto', height: '150px', border: '1px solid #ddd', borderRadius: '4px' }} />
                                        <Typography>Sample 1</Typography>
                                    </Box>
                                } />
                                <FormControlLabel value="sample2" control={<Radio />} labelPlacement="top" label={
                                    <Box textAlign="center">
                                        <img src={show2} alt="Sample 2" style={{ width: 'auto', height: '150px', border: '1px solid #ddd', borderRadius: '4px' }} />
                                        <Typography>Sample 2</Typography>
                                    </Box>
                                } />
                                <FormControlLabel value="upload" control={<Radio />} labelPlacement="top" label="Upload Image" />
                            </RadioGroup>
                            {backgroundOption === 'upload' && (
                                <Box mt={2}>
                                    <input
                                        accept="image/*"
                                        id="upload-button"
                                        type="file"
                                        style={{ display: 'none' }}
                                        onChange={handleFileChange}
                                    />
                                    <label htmlFor="upload-button">
                                        <Button variant="contained" color="primary" component="span">
                                            Upload Image
                                        </Button>
                                    </label>
                                    {uploadedImage && (
                                        <Box mt={2}>
                                            <Typography variant="subtitle1">Preview:</Typography>
                                            <img src={uploadedImage} alt="Uploaded Preview" style={{ width: '100%', maxHeight: '200px', objectFit: 'cover', border: '1px solid #ddd', borderRadius: '4px' }} />
                                        </Box>
                                    )}
                                </Box>
                            )}
                        </Box>
                    </FormControl>
                </Grid>
            </Grid>
            
            <Box display="flex" justifyContent="flex-end" marginTop={4}>
                <Button variant="contained" color="primary" onClick={handleNext}>
                    Next
                </Button>
            </Box>
        </Paper>
    );
};

export default Settings;
