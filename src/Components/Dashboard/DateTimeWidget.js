import * as React from 'react';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import Title from './Title';

export default function CurrentDateTime({temperature,locationname}) {
  const [currentTime, setCurrentTime] = useState()
  const [currentDate, setCurrentDate] = useState()
  useEffect(() => {
    CurrentTime();
    CurrentDate();
  }, [])

  const CurrentTime = () => {
    const getCurrentTime = () => {
      const now = new Date();
      const formattedTime = now.toLocaleTimeString();
      setCurrentTime(formattedTime);
    };
    const interval = setInterval(getCurrentTime); // Update every second

    return () => {
      clearInterval(interval);
    };
  }

  const CurrentDate = () => {
    const options = {
      weekday: 'long',
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    };
    const getCurrentDate = () => {
      const today = new Date();
      const formattedDate = today.toLocaleDateString('en-US', options);
      setCurrentDate(formattedDate);
      
    };
    getCurrentDate();
  }
 return (
    <React.Fragment>
      <Title>Date & Time</Title>
      <Typography component="p" variant="p" sx={{ marginTop: 3 }}>
        {currentDate}
      </Typography>
      <Typography component="p" variant="h5" sx={{ fontWeight: 600 }}>
        {currentTime}
      </Typography>
      <Typography component="p" variant="h5" sx={{ fontWeight: 600 }}>
        {temperature+'°C'} {locationname}
      </Typography>
    </React.Fragment>
  );
}