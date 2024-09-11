import React from 'react';
import { Button, ButtonGroup } from '@mui/material';
import { borderColor } from '@mui/system';

const GameNavBar = ({ currentStep, onStepChange }) => {
    const navbarStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3B5D44',
        padding: '10px 20px'
    };

    const buttonStyle = {
        margin: '0 10px',
        color: 'black',
        fontWeight: 'bold',
        borderColor: 'black'
    };

    return (
        <div style={navbarStyle}>
            <ButtonGroup  >
                <Button 
                    onClick={() => onStepChange(0)} 
                    disabled={currentStep === 0} 
                    sx={{ backgroundColor: currentStep === 0 ? '#FFFFFF': '#3B5D44'}} // Background color          
                    style={buttonStyle}
                >
                    Content
                </Button>
                <Button 
                    onClick={() => onStepChange(1)} 
                    disabled={currentStep === 1} 
                    style={buttonStyle}
                    sx={{ backgroundColor: currentStep === 1 ? '#FFFFFF': '#3B5D44'}} // Background color 
                >
                    Settings
                </Button>
                <Button 
                    onClick={() => onStepChange(2)} 
                    disabled={currentStep === 2} 
                    style={buttonStyle}
                    sx={{ backgroundColor: currentStep === 2 ? '#FFFFFF': '#3B5D44'}} // Background color 
                >
                    Preview
                </Button>
                <Button 
                    onClick={() => onStepChange(3)} 
                    disabled={currentStep === 3} 
                    style={buttonStyle}
                    sx={{ backgroundColor: currentStep === 3 ? '#FFFFFF': '#3B5D44'}} // Background color 
                >
                    Share
                </Button>
            </ButtonGroup>
        </div>)}

export default GameNavBar;