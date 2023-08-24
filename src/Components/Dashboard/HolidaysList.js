import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHolidayDetails } from '../Redux/Action';
import { useEffect } from 'react';
import { useState } from 'react';
import moment from 'moment';

export default function HolidaysList() {
  const [Holiday, setHoliday] = useState([]);
  const HolidayDetails = useSelector((state) => state.data)
  const { ans, logoutpayload } = useSelector((state) => state.validate)
  const dispatch = useDispatch();

  useEffect(() => {
    function EmployeeHolidayDetails(HolidayList) {
      var holidays = [];
      for (let i = 0; i < HolidayList.length; i++) {
        var Holidaydate = new Date(HolidayList[i].holidayDate)
        const date = moment(Holidaydate).format("ddd DD MMM");
        holidays.push({ date, reason: HolidayList[i].reason });
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
    <React.Fragment>
      <Title>Holidays List {new Date().getFullYear()}</Title>
      <Table size="small" sx={{ width: 'inherit', margin: '-6px -16px 0' }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ pl: 2, pr: 0, py: 1, fontSize: '12px', fontWeight: '600', backgroundColor: '#FBFBFB' }}>Date</TableCell>
            <TableCell sx={{ pr: 2, pl: 0, py: 1, fontSize: '12px', fontWeight: '600', backgroundColor: '#FBFBFB' }}>Event</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item, i) => (
            <TableRow key={i}>
              <TableCell sx={{ pl: 2, pr: 0, py: 1, fontSize: '12px' }}>{item.date}</TableCell>
              <TableCell sx={{ pr: 2, pl: 0, py: 1, fontSize: '12px', color: '#8A8A8A' }}>{item.reason}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}