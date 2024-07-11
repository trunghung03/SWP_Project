import React, { useState, useEffect } from 'react';
import { CircularProgress } from '@mui/material';
import './Loading.scss';

const Loading = () => {
  const quotes = [
    "The waiting is the hardest part. Good things will come",
    "Patience is to keep a good attitude while waiting",
    "Great things take time, be patient",
    "The best things in life are worth waiting for",
    "Good things take time",
    "Your patience will be rewarded"
  ];

  const [loadingText, setLoadingText] = useState(quotes[Math.floor(Math.random() * quotes.length)]);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingText(prev => {
        if (prev.endsWith("...")) {
          return quotes[Math.floor(Math.random() * quotes.length)];
        } else {
          return prev + ".";
        }
      });
    }, 900);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loading-container">
      <div className='loading_content'>
        <div className='loading'>
          <CircularProgress sx={{ color: '#1c1c1c' }} />
        </div>
        <p>{loadingText}</p>
      </div>
    </div>
  );
};

export default Loading;
