import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./Loading.scss";

const Loading = () => {
  const quotes = [
    "The waiting is the hardest part. Good things will come",
    "Patience is to keep a good attitude while waiting",
    "Great things take time, be patient",
    "The best things in life are worth waiting for",
    "Good things take time",
    "Your patience will be rewarded",
  ];

  const [loadingText, setLoadingText] = useState(
    quotes[Math.floor(Math.random() * quotes.length)]
  );
  useEffect(() => {
    let isMounted = true; // To prevent state updates if the component is unmounted

    const updateLoadingText = async () => {
      for (let i = 0; i < quotes.length; i++) {
        if (!isMounted) break; // Exit the loop if the component is unmounted

        setLoadingText((prev) => {
          if (prev.endsWith("...")) {
            return quotes[Math.floor(Math.random() * quotes.length)];
          } else {
            return prev + ".";
          }
        });

        await new Promise((resolve) => setTimeout(resolve, 300));
      }
    };

    updateLoadingText();

    return () => {
      isMounted = false; // Cleanup function to set isMounted to false
    };
  }, []);

  return (
    <div className="loading-container">
      <div className="loading_content">
        <div className="loading">
          <CircularProgress sx={{ color: "#1c1c1c" }} />
        </div>
        <p>{loadingText}</p>
      </div>
    </div>
  );
};

export default Loading;
