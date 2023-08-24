import * as React from 'react';
import Title from './Title';
import { Grid, List, ListItem, ListItemText } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmpDetails } from '../Redux/Action';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProfileSummary() {
  const dispatch = useDispatch();
  const fetchUserDetails = useSelector((state) => state.data)
  const [emprole, setEmprole] = React.useState('');
  const { ans, logoutpayload } = useSelector((state) => state.validate)
  const empdetails = fetchUserDetails.payload.empDet;
  useEffect(() => {
    if (((ans === true) &&
      (Object.keys(fetchUserDetails.payload).length === 0)) &&
      (logoutpayload !== '/Login')) {
      dispatch(fetchEmpDetails());
    }
    if (empdetails?.role === "ROLE_EMPLOYEE") {
      setEmprole("Employee")
      console.log(emprole)
    } else if (empdetails?.role === "ROLE_ADMIN") {
      setEmprole("Admin")
      console.log(emprole)
    } else if (empdetails?.role === "ROLE_TRAINEE") {
      setEmprole("Traniee")
      console.log(emprole)
    } else if (empdetails?.role === "ROLE_SUPERVISOR") {
      setEmprole("Supervisor")
      console.log(emprole)
    }
  }, [ans, dispatch, fetchUserDetails.payload, logoutpayload, empdetails, emprole])




  return (
    <React.Fragment>
      <Title>Profile Summary</Title>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6} md={6} lg={2}>
          <List sx={{ p: 0 }}>
            <ListItem sx={{ p: 0 }}>
              <ListItemText primary="Employee ID" secondary={empdetails?.empId} primaryTypographyProps={{ fontSize: '12px', fontWeight: '600', color: '#34383F', lineHeight: 2 }} secondaryTypographyProps={{ color: '#5C5C5C' }} />
            </ListItem>
            <ListItem sx={{ p: 0 }}>
              <ListItemText primary="Date of Joining" secondary={''} primaryTypographyProps={{ fontSize: '12px', fontWeight: '600', color: '#34383F', lineHeight: 2 }} secondaryTypographyProps={{ color: '#5C5C5C' }} />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={3}>
          <List sx={{ p: 0 }}>
            <ListItem sx={{ p: 0 }}>
              <ListItemText primary="Role" secondary={emprole} primaryTypographyProps={{ fontSize: '12px', fontWeight: '600', color: '#34383F', lineHeight: 2 }} secondaryTypographyProps={{ color: '#5C5C5C' }} />
            </ListItem>
            <ListItem sx={{ p: 0 }}>
              <ListItemText primary="Department" secondary={empdetails?.designation} primaryTypographyProps={{ fontSize: '12px', fontWeight: '600', color: '#34383F', lineHeight: 2 }} secondaryTypographyProps={{ color: '#5C5C5C' }} />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={4}>
          <List sx={{ p: 0 }}>
            <ListItem sx={{ p: 0 }}>
              <ListItemText primary="Email ID" secondary={empdetails?.mailId} primaryTypographyProps={{ fontSize: '12px', fontWeight: '600', color: '#34383F', lineHeight: 2 }} secondaryTypographyProps={{ color: '#5C5C5C' }} />
            </ListItem>
            <ListItem sx={{ p: 0 }}>
              <ListItemText primary="Reporting Manager" secondary={empdetails?.reportingPerson} primaryTypographyProps={{ fontSize: '12px', fontWeight: '600', color: '#34383F', lineHeight: 2 }} secondaryTypographyProps={{ color: '#5C5C5C' }} />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={3}>
          <List sx={{ p: 0 }}>
            <ListItem sx={{ p: 0 }}>
              <ListItemText primary="Contact Number" secondary={empdetails?.mobileNumber} primaryTypographyProps={{ fontSize: '12px', fontWeight: '600', color: '#34383F', lineHeight: 2 }} secondaryTypographyProps={{ color: '#5C5C5C' }} />
            </ListItem>
            <ListItem sx={{ p: 0 }}>
              <ListItemText primary="Project" secondary={empdetails?.projectName} primaryTypographyProps={{ fontSize: '12px', fontWeight: '600', color: '#34383F', lineHeight: 2 }} secondaryTypographyProps={{ color: '#5C5C5C' }} />
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}