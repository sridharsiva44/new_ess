import React, { useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts'
import Title from './Title';
import { CanActive } from '../Redux/Action';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import axios from 'axios';

function ShortfallReport() {


    //     const fetchShortfallReport = useSelector((state) => state.data)
    //    const weeklypayload = fetchShortfallReport.weeklypayload
    //    console.log(weeklypayload)

    const [percentage, setPercentage] = useState([])
    const [WorkedHours, SetWorkedHours] = useState([])
    const [actualHours, setActualHours] = useState(null);
    const [fromDate1, setFromDate1] = useState(getNextMonday()); // Weekly report state variable
    const [workinghoursweekly, setWorkingWeeeklyHours] = useState(''); // working hours weekly report
    const [weeklypercentage, setPercentageforWeeklyReport] = useState('');
    const [actualworkinghoursweekly, setActualWorkingHoursWeekly] = useState('');
    const [mothlyworkedhours, setMonthlyWorkedHours] = useState('');
    const [monthlyworkedhoursreport, setMonthWorkedHoursReport] = useState('');

    useEffect(() => {
        fetchShortFallReportsHours();
    }, [])

    const dispatch = useDispatch()
    // dispatch(FetchShortFallReportsHours())
    const { ans, logoutpayload } = useSelector((state) => state.validate)

    const toDate = new Date()
    const curMonth = toDate.getMonth();
    const curYear = toDate.getFullYear()
    toDate.setMonth(curMonth - 3);
    toDate.setFullYear(curYear)
    console.log(toDate)
    const finaltoDate = moment(toDate).format("YYYY-M-D");
    console.log(toDate)
    const fromDate = toDate;
    fromDate.setDate(26);
    fromDate.setMonth(curMonth - 4);
    fromDate.setFullYear(curYear)
    console.log(fromDate)
    const finalfromDate = moment(fromDate).format("YYYY-M-D");
    console.log(finalfromDate)
    console.log(finaltoDate)


    // Weekly Report monday to friday 

    function getNextMonday() {
        const currentDate = new Date();
        console.log(currentDate.getDay())
        const daysUntilMonday = (7 + 1 - currentDate.getDay()) % 7;  // sunday-0, 1 -monday,2-tuesday....
        console.log(daysUntilMonday)
        console.log(daysUntilMonday)
        console.log(currentDate.getDate())
        const totalDaysUntillMonday = currentDate.getDate() + daysUntilMonday
        console.log(totalDaysUntillMonday)
        const currentmondaydate = daysUntilMonday === 0 ? totalDaysUntillMonday : totalDaysUntillMonday - 7  //totalnumberofdays
        console.log(currentmondaydate)           // daysUntilMonday = (7 + 1 - 3) % 7 = 5 % 7 , daysUntilMonday = (7 + 1 - 1) % 7 = 7 % 7 = 0
        // const monthstarting =26;
        // if (monthstarting === 26) {
        //     currentDate.setDate(monthstarting);
        //     console.log(currentDate)
        // }
        currentDate.setDate(currentmondaydate);
        return currentDate;
    }



    console.log(fromDate1)
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
    const previoustodatevalue = todateweekly.getDate()
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




    const maymonthtodate = '2023-5-28'


    const fetchShortFallReportsHours = async () => {
        await axios.request({
            url: `/ESS-Java/api/emplyee/shortfallReportHours?fromDate=${formatedprefromdate}&toDate=${maymonthtodate}`,
            method: "get",
            headers: {
                'Authorization': 'bearer ' + localStorage.getItem("AccessToken"),
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(response => {
            console.log(response.data)
            const jsonData = JSON.stringify(response.data);
            var shortFallHours = JSON.parse(jsonData);
            console.log(shortFallHours)
            const workedhoursWeekly = shortFallHours[0].totalEssWokingHours
            console.log(workedhoursWeekly)
            const workedHoursSplit = workedhoursWeekly.split(":")
            console.log(workedHoursSplit)
            const WorkedHouresUnix = parseInt(workedHoursSplit[0]) * 3600 + parseInt(workedHoursSplit[1]) * 60 + parseInt(workedHoursSplit[2])
            const workedhoursWeeklySplitup = workedHoursSplit[0] + "h" + ":" + workedHoursSplit[1] + "m"
            setWorkingWeeeklyHours(workedhoursWeeklySplitup)
            console.log(WorkedHouresUnix)
            const actualWorkingHoursWeekly = shortFallHours[0].actualWorkingHours
            setActualWorkingHoursWeekly(actualWorkingHoursWeekly + 'h')
            const actualWorkingHoursUnix = actualWorkingHoursWeekly * 3600
            console.log(actualWorkingHoursUnix)
            const percentageValue1 = (WorkedHouresUnix / actualWorkingHoursUnix) * 100
            console.log(percentageValue1)
            const percentageforWeekly = parseFloat(percentageValue1).toFixed(2)
            console.log(percentageforWeekly)
            setPercentageforWeeklyReport(percentageforWeekly)

        }).catch((error) => {
            console.log('shortfalldayserror', error);

        })
    };

    useEffect(() => {
        const token = localStorage.getItem('AccessToken');
        axios.request({
            url: `/ESS-Java/api/emplyee/shortfallReportDays?fromDate=${finalfromDate}&toDate=${finaltoDate}`,
            method: "get",
            headers: {
                'Authorization': 'bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(res => {
            console.log(res.data);
            const jsonData = JSON.stringify(res.data);
            var shortFallDays = JSON.parse(jsonData);
            const presentDays = shortFallDays[0].presentDays;
            const leaveapplied = shortFallDays[0].leavesCount;
            const odApplied = shortFallDays[0].odWorkingDays;
            const shortfallDays = shortFallDays[0].shortFallOfDays;

            console.log("presentDays -" + presentDays,
                "leaveapplied -" + leaveapplied,
                "odApplied -" + odApplied,
                "shortfallDays -" + shortfallDays);

            axios.request({
                url: `/ESS-Java/api/emplyee/shortfallReportHours?fromDate=${finalfromDate}&toDate=${finaltoDate}`,
                method: "get",
                headers: {
                    'Authorization': 'bearer ' + token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(res => {
                console.log(res.data);
                const jsonData = JSON.stringify(res.data);
                var shortFallHours = JSON.parse(jsonData);
                const workedHours = shortFallHours[0].totalEssWokingHours;
                const workedHoursSplit = workedHours.split(":")
                const WorkedHouresUnix = parseInt(workedHoursSplit[0]) * 3600 + parseInt(workedHoursSplit[1]) * 60
                const workedhoursSplitup = workedHoursSplit[0] + "h" + ":" + workedHoursSplit[1] + "m"
                SetWorkedHours(workedhoursSplitup)
                console.log(WorkedHours)
                const actualWorkingHours = shortFallHours[0].actualWorkingHours
                setMonthlyWorkedHours(workedhoursSplitup)
                const actualWorkingHoursUnix = actualWorkingHours * 3600
                setActualHours(actualWorkingHours)
                const percentageValue = (WorkedHouresUnix / actualWorkingHoursUnix) * 100
                const Finalcurrentworkingtime = parseFloat(percentageValue).toFixed(2)
                setPercentage(Finalcurrentworkingtime)
                setMonthWorkedHoursReport(mothlyworkedhours)

            })
        })
            .catch((error) => {
                dispatch(CanActive())
            });


    }, [ans, logoutpayload, dispatch, finalfromDate, finaltoDate, WorkedHours])

    console.log(percentage)

    console.log(monthlyworkedhoursreport)

    const shortfall =
    {
        options: {
            series: [percentage, weeklypercentage],
            colors: ['#51BCF0', '#E2A3E6'],
            chart: {
                height: 550,
                type: 'radialBar',
            },
            legend: {
                show: true,
                position: 'bottom'
            },
            plotOptions: {
                radialBar: {
                    dataLabels: {
                        name: {
                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                            fontSize: '16px',
                            fontWeight: '500'
                        },
                        value: {
                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                            fontSize: '13px',
                            fontWeight: '500'
                        },
                        total: {
                            show: true,
                            label: 'This Week',
                            formatter: function (w) {
                                return workinghoursweekly + '/' + actualworkinghoursweekly
                            }
                        },
                    }
                }
            },
            labels: ['This Month', 'This Week']
        }
    }

    return (
        <React.Fragment>
            <Title>Shortfall Report</Title>
            <ReactApexChart options={shortfall.options} series={shortfall.options.series} width='100%' height={350} type="radialBar" />
        </React.Fragment>
    )
}

export default ShortfallReport
