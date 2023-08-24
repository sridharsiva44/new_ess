import Dashboard from './Components/Dashboard/Dashboard';
import Login from './Components/Login/Login';
import ForgotPassword from './Components/Login/Forgotpassword'
import ResetPassword from './Components/Login/resetPassword';
import EmployeeAttendanceDetails from './Components/Reports/EmployeeAttendanceDetails/EmployeeAttendanceDetails';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import EmployeeLeaveDetails from './Components/Reports/EmployeeLeaveDetails/EmployeeLeaveDetails'
import ShortfallDetails from './Components/Reports/ShortfallReport/ShortfallDetails'
import LeaveRequestDetails from './Components/Requests/Leaverequest/LeaveRequestPage'
import OdRequestPage from './Components/Requests/OdRequest/Odregpage'
import MissedPunchDetails from './Components/Requests/MissedPunch/MissedPunchDetails'
import CompOffrequest from './Components/Requests/Compoffrequest/Compoffpage'
import Protectedpage from './Components/TokenValidator';
import HolidayList from './Components/HolidayList/Holiday';
import ReferralScheme from './Components/ReferralScheme/Referral';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import ChangePassword from './Components/Login/ChangePassword';
import WeekFriday from './Components/WeekFriday';
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';

const theme = createTheme({
  typography: {
    "fontFamily": `'Plus Jakarta Sans', sans-serif`,
    "fontSize": 14,
    "fontWeightLight": 300,
    "fontWeightRegular": 400,
    "fontWeightMedium": 500
  }
});
function App() {
  const dispatch = useDispatch()
  const { logoutpayload } = useSelector((state) => state.validate)
  useEffect(() => {
    if (logoutpayload === '/Login') {
      dispatch({ type: 'RESET_INITIAL_STATE' });
      dispatch({ type: 'RESET_VALIDATION' });
    }
  }, [dispatch, logoutpayload])
  return (
    // <ThemeProvider theme={theme}>
    <div className="App">
      <Router>
        <Routes >
          <Route path='/' element={<Login />} />
          <Route path='/dashboard' element={<Protectedpage><Dashboard /></Protectedpage>} />
          <Route path='/forgotpassword' element={<ForgotPassword />} />
          <Route path='/resetpassword' element={<ResetPassword />} />
          <Route path='/employeeattendancedetails' element={<EmployeeAttendanceDetails />} />
          <Route path='/employeeLeaveDetails' element={<EmployeeLeaveDetails />} />
          <Route path='/shortfalltable' element={<ShortfallDetails />} />
          <Route path='/leaverequestpage' element={<LeaveRequestDetails />} />
          <Route path='/odrequestpage' element={<OdRequestPage />} />
          <Route path='/missedpunch' element={<MissedPunchDetails />} />
          <Route path='/compoffpage' element={<CompOffrequest />} />
          <Route path='/holidaylist' element={<HolidayList />} />
          <Route path='/referralscheme' element={<ReferralScheme />} />
          <Route path='/changepassword' element={<ChangePassword />} />
          <Route path='/weekfriday' element={<WeekFriday />} />
        </Routes>
      </Router>
    </div>
    // </ThemeProvider>
  );
}

export default App;
