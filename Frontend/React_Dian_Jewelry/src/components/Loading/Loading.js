import React, { useState, useEffect } from 'react';
import { CircularProgress } from '@mui/material';
import './Loading.scss';

const Loading = () => {
  const [loadingText, setLoadingText] = useState("The waiting is the hardest part. Good things come to those who wait");

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingText(prev => {
        if (prev.endsWith("...")) {
          return "The waiting is the hardest part. Good things come to those who wait";
        } else {
          return prev + ".";
        }
      });
    }, 500);

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
