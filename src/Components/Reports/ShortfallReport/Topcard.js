import React, { useEffect, useState } from 'react'
import { Avatar, Grid } from '@mui/material'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import MoreTimeOutlinedIcon from '@mui/icons-material/MoreTimeOutlined';
import Axios from 'axios';
function Topcard() {
    const [shortfalldays, setShortFallDays] = useState([{}])
    const [shortfallhours, setShortFallHours] = useState([{}])
    useEffect(() => {
        fetchShortFallReportsDays();
        fetchShortFallReportsHours();
    }, [])

    const fetchShortFallReportsDays = async () => {
        await Axios.request({
            url:`/ESS-Java/api/emplyee/shortfallReportDays?fromDate=2023-6-26&toDate=2023-7-25`,
            method: "get",
            headers: {
                'Authorization': 'bearer ' + localStorage.getItem("AccessToken"),
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(response => {
            console.log(response.data)
            setShortFallDays(response.data)
        }).catch((error) => {
            console.log('shortfalldayserror', error);

        })
    };

    const fetchShortFallReportsHours = async () => {
        await Axios.request({
            url:`/ESS-Java/api/emplyee/shortfallReportHours?fromDate=2023-7-26&toDate=2023-8-7`,
            method: "get",
            headers: {
                'Authorization': 'bearer ' + localStorage.getItem("AccessToken"),
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(response => {
            console.log(response.data)
            setShortFallHours(response.data)
        }).catch((error) => {
            console.log('shortfalldayserror', error);

        })
    };

    console.log(shortfalldays[0].empId)
    console.log(shortfalldays[0].totalEssShortfallHours)
    return (
        <React.Fragment>
            <Grid container component="main" spacing={2} justifyContent="flex-start" alignItems="stretch">
                <Grid item xs={12} sm={4} md={2.4}>
                    <Card sx={{ backgroundColor: "#EFE6F6", height: '100%', boxShadow: 'none' }}>
                        <CardContent sx={{ pt: 2 }}>
                            <Avatar sx={{ bgcolor: '#D7BFE9', width: '30px', height: '30px' }}>
                                <CalendarTodayOutlinedIcon sx={{ fontSize: '18px', color: '#7930B1' }} />
                            </Avatar>
                            <Typography gutterBottom variant="h6" component="h6" sx={{ fontWeight: '700', m: 0, mt: 1 }}>
                                {shortfalldays[0].presentDaysplusLeaves}
                            </Typography>
                            <Typography variant="body2">
                                Actual Days
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={4} md={2.4}>
                    <Card sx={{ backgroundColor: "#E0F8EA", height: '100%', boxShadow: 'none' }}>
                        <CardContent sx={{ pt: 2 }}>
                            <Avatar sx={{ bgcolor: '#B3EDCB', width: '30px', height: '30px' }}>
                                <AutoAwesomeOutlinedIcon sx={{ fontSize: '18px', color: '#00C150' }} />
                            </Avatar>
                            <Typography gutterBottom variant="h6" component="h6" sx={{ fontWeight: '700', m: 0, mt: 1 }}>
                                {shortfalldays[0].presentDays}
                            </Typography>
                            <Typography variant="body2">
                                Present Days
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={4} md={2.4}>
                    <Card sx={{ backgroundColor: "#E0F8EA", height: '100%', boxShadow: 'none' }}>
                        <CardContent sx={{ pt: 2 }}>
                            <Avatar sx={{ bgcolor: '#B3EDCB', width: '30px', height: '30px' }}>
                                <AutoAwesomeOutlinedIcon sx={{ fontSize: '18px', color: '#00C150' }} />
                            </Avatar>
                            <Typography gutterBottom variant="h6" component="h6" sx={{ fontWeight: '700', m: 0, mt: 1 }}>
                                {shortfalldays[0].leavesCount}
                            </Typography>
                            <Typography variant="body2">
                                Leave Approved
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={4} md={2.4}>
                    <Card sx={{ backgroundColor: "#E0F4FF", height: '100%', boxShadow: 'none' }}>
                        <CardContent sx={{ pt: 2 }}>
                            <Avatar sx={{ bgcolor: '#B3E4FF', width: '30px', height: '30px' }}>
                                <SentimentVeryDissatisfiedIcon sx={{ fontSize: '18px', color: '#339FDB' }} />
                            </Avatar>
                            <Typography gutterBottom variant="h6" component="h6" sx={{ fontWeight: '700', m: 0, mt: 1 }}>
                                {shortfalldays[0].odWorkingDays}
                            </Typography>
                            <Typography variant="body2">
                                OD Approved
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={4} md={2.4}>
                    <Card sx={{ backgroundColor: "#FFF5E0", height: '100%', boxShadow: 'none' }}>
                        <CardContent sx={{ pt: 2 }}>
                            <Avatar sx={{ bgcolor: '#FFE5B3', width: '30px', height: '30px' }}>
                                <PersonAddAltOutlinedIcon sx={{ fontSize: '18px', color: '#F4A50B' }} />
                            </Avatar>
                            <Typography gutterBottom variant="h6" component="h6" sx={{ fontWeight: '700', m: 0, mt: 1 }}>
                                {shortfalldays[0].odWorkingDays}
                            </Typography>
                            <Typography variant="body2">
                                Comp off Approved
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={4} md={2.4}>
                    <Card sx={{ backgroundColor: "#FCEAE4", height: '100%', boxShadow: 'none' }}>
                        <CardContent sx={{ pt: 2 }}>
                            <Avatar sx={{ bgcolor: '#F7C7B7', width: '30px', height: '30px' }}>
                                <MoreTimeOutlinedIcon sx={{ fontSize: '18px', color: '#E33C05' }} />
                            </Avatar>
                            <Typography gutterBottom variant="h6" component="h6" sx={{ fontWeight: '700', m: 0, mt: 1 }}>
                                {shortfallhours[0].actualWorkingHours}
                            </Typography>
                            <Typography variant="body2">
                                Actual Working hours
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={4} md={2.4}>
                    <Card sx={{ backgroundColor: "#FCEAE4", height: '100%', boxShadow: 'none' }}>
                        <CardContent sx={{ pt: 2 }}>
                            <Avatar sx={{ bgcolor: '#F7C7B7', width: '30px', height: '30px' }}>
                                <MoreTimeOutlinedIcon sx={{ fontSize: '18px', color: '#E33C05' }} />
                            </Avatar>
                            <Typography gutterBottom variant="h6" component="h6" sx={{ fontWeight: '700', m: 0, mt: 1 }}>
                                {shortfallhours[0].totalEssWokingHours}
                            </Typography>
                            <Typography variant="body2">
                                Worked hours
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={4} md={2.4}>
                    <Card sx={{ backgroundColor: "#FCEAE4", height: '100%', boxShadow: 'none' }}>
                        <CardContent sx={{ pt: 2 }}>
                            <Avatar sx={{ bgcolor: '#F7C7B7', width: '30px', height: '30px' }}>
                                <MoreTimeOutlinedIcon sx={{ fontSize: '18px', color: '#E33C05' }} />
                            </Avatar>
                            <Typography gutterBottom variant="h6" component="h6" sx={{ fontWeight: '700', m: 0, mt: 1 }}>
                                {shortfalldays[0].shortFallOfDays}
                            </Typography>
                            <Typography variant="body2">
                                Shortfall days
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={4} md={2.4}>
                    <Card sx={{ backgroundColor: "#FCEAE4", height: '100%', boxShadow: 'none' }}>
                        <CardContent sx={{ pt: 2 }}>
                            <Avatar sx={{ bgcolor: '#F7C7B7', width: '30px', height: '30px' }}>
                                <MoreTimeOutlinedIcon sx={{ fontSize: '18px', color: '#E33C05' }} />
                            </Avatar>
                            <Typography gutterBottom variant="h6" component="h6" sx={{ fontWeight: '700', m: 0, mt: 1 }}>
                                {shortfallhours[0].totalEssShortfallHours}
                            </Typography>
                            <Typography variant="body2">
                                Shortfall Hours
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default Topcard

