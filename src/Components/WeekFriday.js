import React, { useState } from 'react';
import { startOfWeek, addDays, format } from 'date-fns';

const WeekFriday = () => {
const [todate,setTodate]=useState(WeekDays());

  function WeekDays() {
  const dateobj = new Date();
  const weekdays = [];
  const dayofWeek = dateobj.getDay();
  console.log(dayofWeek)
  if (dayofWeek >= 1 && dayofWeek <= 5) {
    weekdays.push(new Date(dateobj)); // Add a copy of the current date
    console.log(weekdays)
    return weekdays;
  }

  console.log('weekend')

}

return (
  <div>
    <h2>Current Weekdays</h2>
    <ul>
      {/* {weekdays.map((day, index) => (
          <li key={index}>{format(day, 'yyyy-MM-dd')}</li>
        ))} */}
    </ul>
  </div>
);
};

export default WeekFriday;
