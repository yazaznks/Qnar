import React, { useState } from 'react';
import GameContent from './GameContent';
import GameSettings from './GameSettings';
import GamePreview from './GamePreview';
import GameNavBar from './GameNavbar';

// Import other sections when ready

const GamePage = () => {
    const [step, setStep] = useState(0);
    const [Questions, SetQuestions] = useState([{}]);
    const [settings, setSettings] = useState({});
    const [gameTitle, setGameTitle] = useState(''); // New state for the title
    // const [description, setDescription] = useState(''); // New state for the description
    const validateGameContent = () => {
        // Check if the game title is not empty
        if (!settings.title || !settings.title.trim()) {
            alert('Please enter a title for the game.');
            return false;
        }

        // Check if there is at least one question with a non-empty title
        const hasValidQuestion = Questions.some(question => question.title && question.title.trim());

        if (!hasValidQuestion) {
            alert('Please enter at least one question.');
            return false;
        }

        // Check that each question has a chosen correct answer
        const allQuestionsHaveCorrectAnswer = Questions.every(question => 
            question.correctAnswerIndex !== null
        );

        if (!allQuestionsHaveCorrectAnswer) {
            alert('Please select a correct answer for each question.');
            return false;
        }

        return true;
    };

    const handleStepChange = (newStep) => {
        if (step === 0) {
            // Validate the content page before allowing to proceed
            SetQuestions([...Questions]); // Ensure questions are saved
            setSettings({ ...settings }); // Ensure settings (title, description) are saved
            if (validateGameContent()) {
                setStep(newStep);
            }
        } else {
            setStep(newStep);
        }
    };
    return (
        <div>
            <GameNavBar currentStep={step} onStepChange={handleStepChange} />
            
            {step === 0 && <GameContent Questions={Questions}SetQuestions={SetQuestions}
            settings={settings}setSettings={setSettings} gameTitle={gameTitle}
            setGameTitle={setGameTitle}onNext={() => handleStepChange(1)} />}
            {step === 1 && <GameSettings settings={settings}setSettings={setSettings} onNext={() => handleStepChange(2)}/>} {/* Replace with actual Settings component */}
            {step === 2 && <GamePreview Questions={Questions}settings={settings} onNext={() => handleStepChange(3)}/>}  {/* Replace with actual Preview component */}
            {step === 3 && <div>Share Section</div>}    {/* Replace with actual Share component */}
    
            {/* Render other sections based on step value */}
        </div>
    );
};

export default GamePage;