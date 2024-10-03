import React from 'react';
import { Button, ButtonGroup } from '@mui/material';
import { borderColor } from '@mui/system';
// import { borderColor } from '@mui/system';

const GameNavBar = ({ currentStep, onStepChange }) => {
    const navbarStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F4DADA',
        padding: '10px 20px'
    };

    const buttonStyle = {
        margin: '0 10px',
        fontWeight: 'bold',
        borderColor: 'white',
    };

    return (
        <div style={navbarStyle}>
            <ButtonGroup  >
                <Button 
                    onClick={() => onStepChange(0)} 
                    disabled={currentStep === 0} 
                    style={buttonStyle}
                    sx={{ backgroundColor: currentStep === 0 ? '#EB8576': 'white',...buttonStyle,
                         color: currentStep === 0 ? 'white !important': '#4B7857'}} // Background color          
                    
                >
                    Content
                </Button>
                <Button 
                    onClick={() => onStepChange(1)} 
                    disabled={currentStep === 1} 
                    style={buttonStyle}
                    sx={{ backgroundColor: currentStep === 1 ? '#EB8576': 'white',...buttonStyle, color: currentStep === 1 ? 'white !important': '#4B7857'}} // Background color 
                >
                    Settings
                </Button>
                <Button 
                    onClick={() => onStepChange(2)} 
                    disabled={currentStep === 2} 
                    style={buttonStyle}
                    sx={{ backgroundColor: currentStep === 2 ? '#EB8576': 'white', color: currentStep === 2 ? 'white !important': '#4B7857',...buttonStyle}} // Background color 
                >
                    Preview
                </Button>
                <Button 
                    onClick={() => onStepChange(3)} 
                    disabled={currentStep === 3} 
                    style={buttonStyle}
                    sx={{ backgroundColor: currentStep === 3 ? '#EB8576': 'white', color: currentStep === 3 ? 'white !important': '#4B7857',...buttonStyle}} // Background color 
                >
                    Share
                </Button>
            </ButtonGroup>
        </div>)}

export default GameNavBar;