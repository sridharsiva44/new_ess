import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { Avatar, Button, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material'
import { useEffect } from 'react'
import { useState } from 'react'
import Title from './Title';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBirthdayDetails } from '../Redux/Action';

function BirthdayWishes() {

  const dispatch = useDispatch();
  const [birthday, setBirthdayWishes] = useState([]);

  const Birthdaydata = useSelector((state) => state.data)
  const { ans, logoutpayload } = useSelector((state) => state.validate)

  useEffect(() => {
    function EmployeeBirthdayDetails(employeeList) {
      var birthdayData = [];
      var date = new Date();
      var j = 0;
      var empgender = ''
      if (employeeList.length > 0) {
        for (var i = 0; i < employeeList.length; i++) {
          var dt = new Date(employeeList[i].dob);
          if (date.getDate() === dt.getDate() && dt.getMonth() === date.getMonth()) {
            if (employeeList[i].sex === "Male") {
              empgender = "his";
            } else if (employeeList[i].sex === "Female") {
              empgender = "her";
            } else {
              empgender = "";
            }
            birthdayData[j] = { "sex": empgender, "empId": employeeList[i].empId, "employeeName": employeeList[i].employeeName }
            j++;
          }
        }
      }
      setBirthdayWishes(birthdayData);
      return birthdayData;
    }
    if (((ans === true) &&
      Object.keys(Birthdaydata.birthdaypayload).length === 1) &&
      (logoutpayload !== '/Login')) {
      dispatch(fetchBirthdayDetails());
    }
    if (Object.keys(Birthdaydata.birthdaypayload).length > 1) {
      const jsonData = JSON.stringify(Birthdaydata.birthdaypayload);
      var employeeList = JSON.parse(jsonData);
      EmployeeBirthdayDetails(employeeList);
    }
  }, [Birthdaydata.birthdaypayload, ans, dispatch, logoutpayload])



  var items = birthday;

  return (
    <React.Fragment>
      <Title>Birthday Wishes</Title>
      <Carousel navButtonsAlwaysInvisible>
        {
          items.map((item, i) =>
            <List key={i} sx={{ m: 0, p: 0 }}>
              <ListItem alignItems="flex-start" sx={{ m: 0, p: 0 }}>
                <ListItemAvatar>
                  <Avatar alt="" src={item.profileImage} />
                </ListItemAvatar>
                <ListItemText
                  primary={item.employeeName}
                  primaryTypographyProps={{ fontSize: '14px', fontWeight: '500' }}
                  secondary={
                    <React.Fragment>
                      {item.designation}
                      <Typography
                        sx={{ display: 'block' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        celebrating {item.sex} birthday
                      </Typography>
                    </React.Fragment>
                  }
                  secondaryTypographyProps={{ fontSize: '12px' }}
                />
              </ListItem>
              <Button variant="contained" size="small" sx={{ backgroundColor: '#0257F5', ml: 7, mt: 1, textTransform: 'none', boxShadow: 'none' }}>
                Send Greetings
              </Button>
            </List>
          )}
      </Carousel>
    </React.Fragment>
  )
}

export default BirthdayWishes
