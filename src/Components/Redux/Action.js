import Axios from 'axios'
import * as types from './ActionTypes'
import moment from 'moment';
import { useState } from 'react';
const logoutusers = (logout_data) =>
(
    {
        type: types.Logout,
        payload: logout_data
    }
)

const Authusers = (ans) =>
(
    {

        type: types.AuthGuard,
        data: ans
    }
)

const EmployeeData = (Emp_data) =>
(
    {
        type: types.EmpDetails,
        payload: Emp_data
    }
)


const BirthdayData = (Bday_Details) =>
(
    {
        type: types.BirthdayData,
        birthdaypayload: Bday_Details
    }
)

const HolidayData = (Holiday_Details) => (
    {
        type: types.HOLIDAYLIST,
        holidaypayload: Holiday_Details
    }
)

const WeeklyReport = (weekly_report) => (
{
        
        type: types.WeeklyReport,
        weeklypayload: weekly_report
    }
)


export const fetchEmpDetails = () => {
    return (dispatch) => {
        const userId = localStorage.getItem('UserID')
        Axios.request({
            url:'/ESS-Java/api/emplyee/dashboard/' + userId,
            method: "get",
            headers: {
                'Authorization': 'bearer ' + localStorage.getItem("AccessToken"),
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(response => {
            if (response.status === 200) {
                dispatch(EmployeeData(response.data))
            } else {

            }
        }).catch(error => {
            dispatch(CanActive())
        })
    };
};

export const fetchHolidayDetails = () => {
    return (dispatch) => {
        Axios.request({
            url:'/ESS-Java/api/emplyee/getEmpHolidayDates/',
            method: "get",
            headers: {
                'Authorization': 'bearer ' + localStorage.getItem("AccessToken"),
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(response => {
            dispatch(HolidayData(response.data))
        }).catch((error) => {
            console.log('HolidayError', error);
            dispatch(CanActive());
        })
    }
};


export const fetchBirthdayDetails = () => {

    return (dispatch) => {
        Axios.request({
            url:'/ESS-Java/api/emplyee/getEmployeeBirthdayDetails/',
            method: "get",
            headers: {
                'Authorization': 'bearer ' + localStorage.getItem("AccessToken"),
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(response => {
            dispatch(BirthdayData(response.data))
        }).catch((error) => {
            console.log('BirthdayError', error);
            dispatch(CanActive());
        })
    }
};

export const Logoutdata = () => {
    return function (dispatch) {
        Axios.request({
            url:'/ESS-Java/log/logout',
            method: "get",
            headers: {
                'Authorization': 'bearer ' + localStorage.getItem("AccessToken"),
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(response => {
            localStorage.removeItem("AccessToken");
            localStorage.removeItem("RefreshToken");
            localStorage.removeItem("UserID");
            dispatch(logoutusers(response.data))
        })
            .catch((error) => {

            });
    }
}



export const CanActive = () => {
    return async function (dispatch) {
        let value;
        try {
            await Axios.request({
                url:'/ESS-Java/api/emplyee/validateOauthToken',
                method: "get",
                headers: {
                    'Authorization': 'bearer ' + localStorage.getItem("AccessToken"),
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(response => {
                if (response.status === 200) {
                    value = true;
                }
            })
        } catch (error) {
            try {
                await Axios.request({
                    url:'/ESS-Java/oauth/token',
                    method: 'post',
                    headers: {
                        'Authorization': 'Basic bXktdHJ1c3RlZC1jbGllbnQ6c2VjcmV0',
                        'Accept': 'application/json',
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    data: {
                        grant_type: "refresh_token",
                        refresh_token: localStorage.getItem("RefreshToken")
                    }
                }).then(response => {
                    value = true;
                    if (response.status === 200) {
                        localStorage.setItem("AccessToken", response.data.access_token);
                        localStorage.setItem("RefreshToken", response.data.refresh_token);
                    }
                })
            } catch (error) {
                dispatch(Logoutdata())
                value = false;
            }
        }
        dispatch(Authusers(value))
        return value;
    }
}

export const FetchShortFallReportsHours = async () => {
    
    const [fromDate1, setFromDate1] = useState(getNextMonday());

    function getNextMonday() {
        const currentDate = new Date();
        console.log(currentDate.getDay())
        const daysUntilMonday = (7 + 1 - currentDate.getDay()) % 7;  // sunday-0, 1 -monday,2-tuesday....
        console.log(daysUntilMonday)
        console.log(currentDate.getDate())
        const totalDaysUntillMonday = currentDate.getDate() + daysUntilMonday
        console.log(totalDaysUntillMonday)
        const currentmondaydate = daysUntilMonday === 0 ? totalDaysUntillMonday : totalDaysUntillMonday - 7  //totalnumberofdays
        console.log(currentmondaydate)           // daysUntilMonday = (7 + 1 - 3) % 7 = 5 % 7 , daysUntilMonday = (7 + 1 - 1) % 7 = 7 % 7 = 0
        currentDate.setDate(currentmondaydate);
        return currentDate;
    }
    const fromdateWeekly = new Date(fromDate1);
    const formatedfromdate = moment(fromdateWeekly).format('yyyy-M-D');
    const todateweekly = new Date();
    const formatedtodate = moment(todateweekly).format('yyyy-M-D');
    console.log(formatedfromdate)
    console.log(formatedtodate)
    
    // checking purpose fromdate previous month 
    const tomonth = todateweekly.getMonth();
    console.log(tomonth)
    todateweekly.setMonth(tomonth - 3);
    console.log(todateweekly)
    const previoustodatevalue = todateweekly.getDate() - 1
    const previoustodate = todateweekly.setDate(previoustodatevalue)
    console.log(previoustodate)
    const formatedpretodate = moment(previoustodate).format('yyyy-M-D');
    console.log(formatedpretodate)
    // formatedpretodate.setDate()
    // checking purpose todate previous month 
    const frommonth = fromdateWeekly.getMonth();
    console.log(frommonth)
    fromdateWeekly.setMonth(frommonth - 3);
    console.log(fromdateWeekly)
    const formatedprefromdate = moment(fromdateWeekly).format('yyyy-M-D');
    
    console.log(formatedprefromdate)
    console.log(formatedpretodate)
    
    return (dispatch) => {
        Axios.request({
            url:`/ESS-Java/api/emplyee/shortfallReportHours?fromDate=${formatedprefromdate}&toDate=${formatedpretodate}`,
            method: "get",
            headers: {
                'Authorization': 'bearer ' + localStorage.getItem("AccessToken"),
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(response => {
            dispatch(WeeklyReport(response.data))
        }).catch((error) => {
            console.log('weekreporterrormessage', error);
            dispatch(CanActive());
        })
    }
};