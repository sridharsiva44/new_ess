import React from 'react'
import ReactApexChart from 'react-apexcharts'
import Title from './Title';
import {useSelector } from 'react-redux';

function LeaveDetails() {

    
    const fetchUserDetails = useSelector((state) => state.data)
    const empdetails = fetchUserDetails.payload.empLeaveDet;

    const leavedata = [empdetails?.clleaveBalance, empdetails?.plleaveBalance, empdetails?.slleaveBalance, empdetails?.comOffBalance];
    const leaveDetailsChart =
    {
        options: {
            labels: ['Casual Leave', 'Sick Leave', 'Privilege Leave', 'Comp. Leave'],
            series: leavedata,
            colors: ['#51BCF0', '#E2A3E6', '#E8CCA9', '#ABE880'],
            chart: {
                type: 'donut',
                width: "100%",
                height: 380
            },
            legend: {
                position: 'bottom'
            },
            plotOptions: {
                pie: {
                    expandOnClick: false,
                    donut: {
                        labels: {
                            show: true,
                            name: {
                                show: true,
                                fontFamily: "'Plus Jakarta Sans', sans-serif",
                                fontSize: '13px',
                                fontWeight: '500',
                                offsetY: -5
                            },
                            value: {
                                show: true,
                                fontFamily: "'Plus Jakarta Sans', sans-serif",
                                fontSize: '24px',
                                fontWeight: '500',

                            },
                            total: {
                                show: true,
                                label: 'Total Leaves',
                                color: '#A9A9A9',

                                formatter: function (w) {
                                    return w.globals.seriesTotals.reduce((a, b) => {
                                        return a + b
                                    }, 0)
                                }
                            }
                        }
                    }
                }
            },
            dataLabels: {
                enabled: false
            },
            responsive: [{
                breakpoint: 1199.98,
                options: {
                    chart: {
                        width: "100%"
                    },
                    plotOptions: {
                        pie: {
                            donut: {
                                labels: {
                                    show: true,
                                    name: {
                                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                                        fontSize: '12px',
                                        fontWeight: '500',
                                    },
                                    value: {
                                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                                        fontSize: '18px',
                                        fontWeight: '500',
                                    }
                                }
                            }
                        }
                    }
                }
            }]
        }
    }
    return (
        <React.Fragment>
            <Title>LeaveDetails</Title>
            <ReactApexChart options={leaveDetailsChart.options} series={empdetails !== undefined ? leavedata : [0, 0, 0, 0]} colors={leaveDetailsChart.options.colors} width='100%' height={350} type='donut' />
        </React.Fragment>
    )
}

export default LeaveDetails
