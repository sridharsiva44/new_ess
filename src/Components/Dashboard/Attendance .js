import * as React from 'react';
import Typography from '@mui/material/Typography';
import Title from './Title';
import { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { List, ListItem, ListItemText } from '@mui/material';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';

export default function Attendance() {

  const [date, setDate] = useState();
  const [currentdate, setCurrentDate] = useState();

  useEffect(() => {
    CurrentDate();
  }, [])

  const CurrentDate = () => {

    const getCurrentDate = () => {
      const today = new Date();
      const date = today.getDate();
      const month = today.getMonth();
      const year = today.getFullYear();
      const day = today.getDay();
      const monthconversion = new Date(year, month).toLocaleString('default', { month: 'short' });
      const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const dayName = daysOfWeek[day];
      const convertformat = dayName + ", " + date + " " + monthconversion + " " + year
      const currentdateformatted = date + " " + monthconversion + " " + year;
      setDate(convertformat)
      setCurrentDate(currentdateformatted)
    };
    getCurrentDate();
  }

  return (
    <React.Fragment>
        <Title>Attendance</Title>
        <Typography component="span" variant="span" sx={{ backgroundColor: '#E8F0FF', fontSize: '14px', fontWeight: '600', color: '#0043BF', padding: '10px 20px', margin: '0 -16px 10px' }}><CalendarTodayOutlinedIcon sx={{ fontSize: '18px', mr: 1, verticalAlign: 'text-top' }} /> {date}</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} lg={6}>
            <List sx={{ p: 0 }}>
              <ListItem xs={12} md={6} lg={6} sx={{ p: 0 }}>
                <ListItemText primary="Day-In" secondary={currentdate} primaryTypographyProps={{ fontSize: '12px', fontWeight: '600', color: '#34383F', lineHeight: 2 }} secondaryTypographyProps={{ color: '#5C5C5C' }} />
              </ListItem>
              <ListItem sx={{ p: 0 }}>
                <ListItemText primary="Time-In" secondary="10:30" primaryTypographyProps={{ fontSize: '12px', fontWeight: '600', color: '#34383F', lineHeight: 2 }} secondaryTypographyProps={{ color: '#5C5C5C' }} />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <List sx={{ p: 0 }}>
              <ListItem sx={{ p: 0 }}>
                <ListItemText primary="Day-Out" secondary={currentdate} primaryTypographyProps={{ fontSize: '12px', fontWeight: '600', color: '#34383F', lineHeight: 2 }} secondaryTypographyProps={{ color: '#5C5C5C' }} />
              </ListItem>
              <ListItem sx={{ p: 0 }}>
                <ListItemText primary="Time-Out" secondary="07:00" primaryTypographyProps={{ fontSize: '12px', fontWeight: '600', color: '#34383F', lineHeight: 2 }} secondaryTypographyProps={{ color: '#5C5C5C' }} />
              </ListItem>
            </List>
          </Grid>
        </Grid>
    </React.Fragment>
  );
}