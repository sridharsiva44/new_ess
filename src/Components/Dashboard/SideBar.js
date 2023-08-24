import React, { useState } from 'react'
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import PollOutlinedIcon from '@mui/icons-material/PollOutlined';
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import StickyNote2OutlinedIcon from '@mui/icons-material/StickyNote2Outlined';
import { Divider, Grid, Typography } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import List from '@mui/material/List';
import Collapse from '@mui/material/Collapse';
import CPTLogo from './assets/changepond-logo.svg';
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function SideMenu() {
  const navigate = useNavigate();
  const router = useLocation();
  const [pageUpdated, setPageUpdated] = useState(false);
  const [selectedOption, setSelectedOption] = useState('dashboard');
  const [backGroundColors, setBackGroundColors] = useState(null);
 

  const fetchUserDetails = useSelector((state) => state.data)
  const roleCheck = fetchUserDetails.payload.empDet;
 
  const dashboardPage = () => {
    fetchUserDetails.selectedOption = 'dashboard';
    setPageUpdated(false);
    fetchUserDetails.request = false;
    fetchUserDetails.report = false;
    fetchUserDetails.manageEmployee = false;
    navigate('/dashboard')
  }

  const reportsOnClick = () => {
    setPageUpdated(!pageUpdated);
    setSelectedOption('report');
    fetchUserDetails.selectedOption = 'report';
    fetchUserDetails.request= false;
    fetchUserDetails.manageEmployee = false;
    fetchUserDetails.report = !(fetchUserDetails.report);
    setBackGroundColors(null)
  }

  const requestOnClick = () => {
    setPageUpdated(!pageUpdated);
    setSelectedOption("request");
    fetchUserDetails.selectedOption = 'request';
    fetchUserDetails.request = !(fetchUserDetails.request);
    fetchUserDetails.report = false;
    fetchUserDetails.manageEmployee = false;
    setBackGroundColors(null)
  }

  const manageEmployee = () => {
    setPageUpdated(!pageUpdated);
    setSelectedOption("manageemployee");
    fetchUserDetails.selectedOption = 'manageemployee';
    fetchUserDetails.manageEmployee = !(fetchUserDetails.manageEmployee);
    fetchUserDetails.report = false;
    fetchUserDetails.request = false;
    setBackGroundColors(null)
  }


  const setBackgroundColorForReport = (optionSelectedInTheDashboard) => {
    setBackGroundColors(null);
    fetchUserDetails.selectedOption = optionSelectedInTheDashboard;
    setPageUpdated(!pageUpdated);
  }



  const employeeAttendenceDetails = () => {
    fetchUserDetails.report = true;
    navigate('/employeeattendancedetails')
  }

  const employeeLeaveDetails = () => {
    navigate('/employeeLeaveDetails')
  }
  const ShortfallDetails = () => {
    navigate('/shortfalltable')
  }

  const leaveRequest = () => {
    navigate('/leaverequestpage')
  }

  const odRequest = () => {
    navigate('/odrequestpage')
  }

  const missedPunch = () => {
    navigate('/missedpunch')
  }
  const compOffRequest = () => {
    navigate('/compoffpage')
  }

  const missedPunchSup = () => {
    navigate('/missedpunchadmin')
  }

  const MyEmployee = () => {
    navigate('/myemployee')
  }

  const HolidayList = () => {
    navigate('/holidaylist')
  }
  const ReferralScheme = () => {
    navigate('/referralscheme')
  }




  return (
    <React.Fragment>

      <ListItemButton onClick={() => { dashboardPage() }} sx={{ my: 0.75 }}
        selected={router.pathname === 'dashboard' ? true : false}
        style={router.pathname === '/dashboard' ? { backgroundColor: '#0257F5' } : { backgroundColor: ' #00205B' }}>
        <ListItemIcon>
          <DashboardOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" primaryTypographyProps={{ fontSize: '14px', fontWeight: '500' }} />
      </ListItemButton>
      <ListItemButton
        onBlur={() => { setBackGroundColors('#00205B'); fetchUserDetails.selectedOption = null }}
        onClick={() => { reportsOnClick() }} sx={{ my: 0.75 }}
        selected={fetchUserDetails.selectedOption=== 'report' ? true : false}
        style={fetchUserDetails.selectedOption === 'report' && backGroundColors === null ? { backgroundColor: '#0257F5' } : { backgroundColor: '#00205B' }} >
        <ListItemIcon>
          <PollOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Reports" primaryTypographyProps={{ fontSize: '14px', fontWeight: '500' }} />
        {fetchUserDetails.report ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={fetchUserDetails.report} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 2.5 }}
            onFocus={() => { setBackgroundColorForReport('report') }}
            onBlur={() => { setBackGroundColors('#00205B'); fetchUserDetails.selectedOption = null }}
            onClick={() => { employeeAttendenceDetails() }}
            selected={router.pathname === '/employeeattendancedetails' ? true : false}
            style={router.pathname === '/employeeattendancedetails' ? { backgroundColor: '#002B79' } : { backgroundColor: '#001948' }} >
            <ListItemText primary="Attendance Report" primaryTypographyProps={{ fontSize: '13px', whiteSpace: 'normal' }} />
          </ListItemButton>

          <ListItemButton sx={{ pl: 2.5 }}
            onFocus={() => { setBackgroundColorForReport('report') }}
            onBlur={() => { setBackGroundColors('#00205B'); fetchUserDetails.selectedOption = null }}
            onClick={() => { employeeLeaveDetails() }}
            selected={router.pathname === '/employeeLeaveDetails' ? true : false}
            style={router.pathname === '/employeeLeaveDetails' ? { backgroundColor: '#002B79' } : { backgroundColor: '#001948' }}>
            <ListItemText primary="Leave Report" primaryTypographyProps={{ fontSize: '13px', whiteSpace: 'normal' }} />
          </ListItemButton>

          <ListItemButton sx={{ pl: 2.5 }}
            onFocus={() => { setBackgroundColorForReport('report') }}
            onBlur={() => { setBackGroundColors('#00205B'); fetchUserDetails.selectedOption = null }}
            onClick={() => { ShortfallDetails() }}
            selected={router.pathname === '/shortfalltable' ? true : false}
            style={router.pathname === '/shortfalltable' ? { backgroundColor: '#002B79' } : { backgroundColor: '#001948' }}>
            <ListItemText primary="Shortfall Report" primaryTypographyProps={{ fontSize: '13px', whiteSpace: 'normal' }} />
          </ListItemButton>
        </List>
      </Collapse>

      <ListItemButton
        onBlur={() => { setBackGroundColors('#00205B'); fetchUserDetails.selectedOption = null }}
        onClick={() => { requestOnClick() }} sx={{ my: 0.75 }}
        selected={fetchUserDetails.selectedOption === 'request' ? true : false}
        style={fetchUserDetails.selectedOption === 'request' && backGroundColors === null ? { backgroundColor: '#0257F5' } : { backgroundColor: ' #00205B' }} >
        <ListItemIcon >
          <FactCheckOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Requests" primaryTypographyProps={{ fontSize: '14px', fontWeight: '500' }} />
        {fetchUserDetails.request ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={fetchUserDetails.request} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 2.5 }}
            onFocus={() => { setBackgroundColorForReport('request') }}
            onBlur={() => { setBackGroundColors('#00205B'); fetchUserDetails.selectedOption = null }}
            onClick={() => { leaveRequest() }}
            selected={router.pathname === '/leaverequestpage' | router.pathname === '/leavehistory' ? true : false}
            style={router.pathname === '/leaverequestpage' | router.pathname === '/leavehistory' ? { backgroundColor: '#002B79' } : { backgroundColor: '#001948' }} >
            <ListItemText primary="Leave Request" primaryTypographyProps={{ fontSize: '13px', whiteSpace: 'normal' }} />
          </ListItemButton>

          <ListItemButton sx={{ pl: 2.5 }}
            onFocus={() => { setBackgroundColorForReport('request') }}
            onBlur={() => { setBackGroundColors('#00205B'); fetchUserDetails.selectedOption = null }}
            onClick={() => { odRequest() }}
            selected={router.pathname === '/odrequestpage' ? true : false}
            style={router.pathname === '/odrequestpage' ? { backgroundColor: '#002B79' } : { backgroundColor: '#001948' }}>
            <ListItemText primary="OD Request" primaryTypographyProps={{ fontSize: '13px', whiteSpace: 'normal' }} />
          </ListItemButton>

          <ListItemButton sx={{ pl: 2.5 }}
            onFocus={() => { setBackgroundColorForReport('request') }}
            onBlur={() => { setBackGroundColors('#00205B'); fetchUserDetails.selectedOption = null }}
            onClick={() => { missedPunch() }}
            selected={router.pathname === '/missedpunch' ? true : false}
            style={router.pathname === '/missedpunch' ? { backgroundColor: '#002B79' } : { backgroundColor: '#001948' }}
          >
            <ListItemText primary="Missed Punch Request" primaryTypographyProps={{ fontSize: '13px', whiteSpace: 'normal' }} />
          </ListItemButton>

          <ListItemButton sx={{ pl: 2.5 }}
            onFocus={() => { setBackgroundColorForReport('request') }}
            onBlur={() => { setBackGroundColors('#00205B'); fetchUserDetails.selectedOption = null }}
            onClick={() => { compOffRequest() }}
            selected={router.pathname === '/compoffpage' ? true : false}
            style={router.pathname === '/compoffpage' ? { backgroundColor: '#002B79' } : { backgroundColor: '#001948' }}
          >
            <ListItemText primary="Comp Off Request" primaryTypographyProps={{ fontSize: '13px', whiteSpace: 'normal' }} />
          </ListItemButton>

        </List>
      </Collapse>

      {/* manage employee dropdown */}
      {
        roleCheck?.role === "ROLE_ADMIN"  ? <ListItemButton
          onBlur={() => { setBackGroundColors('#00205B'); fetchUserDetails.selectedOption = null }}
          onClick={() => { manageEmployee() }} sx={{ my: 0.75 }}
          selected={fetchUserDetails.selectedOption === 'manageemployee' ? true : false}
          style={fetchUserDetails.selectedOption === 'manageemployee' && backGroundColors === null ? { backgroundColor: '#0257F5' } : { backgroundColor: ' #00205B' }} >
          <ListItemIcon >
            <FactCheckOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Manage Employee" primaryTypographyProps={{ fontSize: '14px', fontWeight: '500' }} />
          {fetchUserDetails.manageEmployee ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton> : null
      }


      <Collapse in={fetchUserDetails.manageEmployee} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>


        <ListItemButton sx={{ pl: 2.5 }}
            onFocus={() => { setBackgroundColorForReport('manageemployee') }}
            onBlur={() => { setBackGroundColors('#00205B'); fetchUserDetails.selectedOption = null }}
            onClick={() => { MyEmployee() }}
            selected={router.pathname === '/myemployee' ? true : false}
            style={router.pathname === '/myemployee' ? { backgroundColor: '#002B79' } : { backgroundColor: '#001948' }} >
            <ListItemText primary="My Employee" primaryTypographyProps={{ fontSize: '13px', whiteSpace: 'normal' }} />
          </ListItemButton>


          <ListItemButton sx={{ pl: 2.5 }}
            onFocus={() => { setBackgroundColorForReport('request') }}
            onBlur={() => { setBackGroundColors('#00205B'); fetchUserDetails.selectedOption = null }}
            onClick={() => { leaveRequest() }}
            selected={router.pathname === '/leaverequestpag' | router.pathname === '/leavehistory' ? true : false}
            style={router.pathname === '/leaverequestpag' | router.pathname === '/leavehistory' ? { backgroundColor: '#002B79' } : { backgroundColor: '#001948' }} >
            <ListItemText primary="OD" primaryTypographyProps={{ fontSize: '13px', whiteSpace: 'normal' }} />
          </ListItemButton>

          <ListItemButton sx={{ pl: 2.5 }}
            onFocus={() => { setBackgroundColorForReport('request') }}
            onBlur={() => { setBackGroundColors('#00205B'); fetchUserDetails.selectedOption= null }}
            onClick={() => { odRequest() }}
            selected={router.pathname === '/odrequestpage' ? true : false}
            style={router.pathname === '/odrequestpage' ? { backgroundColor: '#002B79' } : { backgroundColor: '#001948' }}>
            <ListItemText primary="Leave  " primaryTypographyProps={{ fontSize: '13px', whiteSpace: 'normal' }} />
          </ListItemButton>

          <ListItemButton sx={{ pl: 2.5 }}
            onFocus={() => { setBackgroundColorForReport('manageemployee') }}
            onBlur={() => { setBackGroundColors('#00205B'); fetchUserDetails.selectedOption = null }}
            onClick={() => { missedPunchSup() }}
            selected={router.pathname === '/missedpunchadmin' ? true : false}
            style={router.pathname === '/missedpunchadmin' ? { backgroundColor: '#002B79' } : { backgroundColor: '#001948' }}
          >
            <ListItemText primary="MissedPunch " primaryTypographyProps={{ fontSize: '13px', whiteSpace: 'normal' }} />
          </ListItemButton>

          <ListItemButton sx={{ pl: 2.5 }}
            onFocus={() => { setBackgroundColorForReport('request') }}
            onBlur={() => { setBackGroundColors('#00205B'); fetchUserDetails.selectedOption = null }}
            onClick={() => { compOffRequest() }}
            selected={router.pathname === '/compoffpage' ? true : false}
            style={router.pathname === '/compoffpage' ? { backgroundColor: '#002B79' } : { backgroundColor: '#001948' }}
          >
            <ListItemText primary="Comp Off" primaryTypographyProps={{ fontSize: '13px', whiteSpace: 'normal' }} />
          </ListItemButton>

        </List>
      </Collapse>
      <ListItemButton sx={{ my: 0.75 }}>
        <ListItemIcon>
          <LocalPhoneOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Phone Extensions" primaryTypographyProps={{ fontSize: '14px', fontWeight: '500' }} />
      </ListItemButton>
      <ListItemButton sx={{ my: 0.75 }}
      // onFocus={() => { setBackgroundColorForReport('request') }}
      onBlur={() => { setBackGroundColors('#00205B'); fetchUserDetails.selectedOption = null }}
      onClick={() => { HolidayList() }}
      selected={router.pathname === '/holidaylist' ? true : false}
      style={router.pathname === '/holidaylist' ? { backgroundColor: '#0257F5' } : { backgroundColor: ' #00205B' }}>
        <ListItemIcon>
          <CalendarTodayOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Holiday List" primaryTypographyProps={{ fontSize: '14px', fontWeight: '500' }} />
      </ListItemButton>
      <ListItemButton sx={{ my: 0.75 }}
      onBlur={() => { setBackGroundColors('#00205B'); fetchUserDetails.selectedOption = null }}
      onClick={() => { ReferralScheme() }}
      selected={router.pathname === '/referralscheme' ? true : false}
      style={router.pathname === '/referralscheme' ? { backgroundColor: '#0257F5' } : { backgroundColor: ' #00205B' }}>
        
        <ListItemIcon>
          <GroupOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Referral Scheme" primaryTypographyProps={{ fontSize: '14px', fontWeight: '500' }} />
      </ListItemButton>
      <Divider sx={{ my: 1 }} />
      <ListSubheader component="div" sx={{ pl: 2.5, color: '#C4C7CD' }}>
        Finance
      </ListSubheader>
      <ListItemButton sx={{ my: 0.75 }}>
        <ListItemIcon>
          <StickyNote2OutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Tax Declration" primaryTypographyProps={{ fontSize: '14px', fontWeight: '500' }} />
      </ListItemButton>
      <Grid item sx={{ marginLeft: 2.5, marginTop: 8 }}>
        <img src={CPTLogo} alt="Changepond" />
        <Typography sx={{ fontSize: '11px', color: '#6F85AC' }}>Version 2.0</Typography>
      </Grid>

    </React.Fragment>
  )
}

export default SideMenu