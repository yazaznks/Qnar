import React, { useEffect, useState } from 'react';
import './Styles.css'; // Import your CSS file
import videoSrc from '../Assets/sample.mp4'


const GameWithZoom = () => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [isGameVisible, setIsGameVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsZoomed(true); // Trigger zoom after a delay
    }, 2000); // Adjust the delay as needed

    const zoomCompleteTimer = setTimeout(() => {
      setIsGameVisible(true); // Show the game after the zoom effect
    }, 4000); // Adjust this timing to match the zoom duration

    return () => {
      clearTimeout(timer);
      clearTimeout(zoomCompleteTimer);
    }; // Cleanup timers
  }, []);

  return (
    <div className="zoom-container">
      <video className={`background-video ${isZoomed ? 'zoom-in' : ''}`} autoPlay loop muted>
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {isGameVisible && (
        <div className="game-container">
          {/* Your game component goes here */}
          <h1>Your Game</h1>
        </div>
      )}
    </div>
  );
};

export default GameWithZoom;