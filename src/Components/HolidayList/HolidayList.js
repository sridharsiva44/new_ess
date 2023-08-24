import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid';
import { Card, CardContent, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { fetchHolidayDetails } from '../Redux/Action';


function HolidayList() {
  const [Holiday, setHoliday] = useState([]);
  const HolidayDetails = useSelector((state) => state.data)
  const { ans, logoutpayload } = useSelector((state) => state.validate)
  const dispatch = useDispatch();
  useEffect(() => {
    function EmployeeHolidayDetails(HolidayList) {
      var holidays = [];
      for (let i = 0; i < HolidayList.length; i++) {
        var Holidaydate = new Date(HolidayList[i].holidayDate)
        const month = moment(Holidaydate).format("MMMM");
        const date = moment(Holidaydate).format("DD");
        const day = moment(Holidaydate).format("dddd");
        holidays.push({ month, date, day, reason: HolidayList[i].reason });
      }
      setHoliday(holidays)
      return holidays
    }
    if (((ans === true) &&
      Object.keys(HolidayDetails.holidaypayload).length === 1) &&
      (logoutpayload !== '/Login')) {
      dispatch(fetchHolidayDetails());
    }
    if (Object.keys(HolidayDetails.holidaypayload).length > 1) {
      const jsonData = JSON.stringify(HolidayDetails.holidaypayload);
      var HolidayList = JSON.parse(jsonData);
      EmployeeHolidayDetails(HolidayList);
    }
  }, [HolidayDetails.holidaypayload, ans, dispatch, logoutpayload])



  var items = Holiday;

  return (

    <Grid container component="main" spacing={2} justifyContent="flex-start" alignItems="stretch">
      {items.map((item, i) => (
        <Grid item xs={12} sm={4} md={3}>

          <Card sx={{ minWidth: 20 + "%", }}>

            <CardContent>

              <Typography gutterBottom variant="h6" component="div" key={i}
                sx={{
                  color: 'white',
                  backgroundColor: 'blue',
                  textAlign: 'center'
                }}>
                {item.month}
              </Typography>

              <Typography gutterBottom variant="h6" component="div"
                sx={{
                  textAlign: 'center',
                  fontSize: '20px',
                  fontWeight: '20px'
                }}>
                {item.date}
              </Typography>
              <Typography gutterBottom variant="h5" component="div"
                sx={{
                  textAlign: 'center'
                }}>
                {item.day}
              </Typography>
              <Typography gutterBottom variant="h7" component="div"
                sx={{
                  textAlign: 'center'
                }}>
                {item.reason}
              </Typography>


            </CardContent>


          </Card>
        </Grid>
      ))}
    </Grid>








  )
}

export default HolidayList
