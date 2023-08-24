import React from 'react'
import { Avatar, Grid } from '@mui/material'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import MoreTimeOutlinedIcon from '@mui/icons-material/MoreTimeOutlined';
import { useSelector } from 'react-redux';


function Topcard() {

    const fetchUserDetails = useSelector((state) => state.data)
    const empdetails = fetchUserDetails.payload.empLeaveDet;
    console.log(empdetails?.totalLeave);

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
                                {empdetails?.totalLeave}
                            </Typography>
                            <Typography variant="body2">
                                My Available Leaves
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
                                {empdetails?.clleaveBalance}
                            </Typography>
                            <Typography variant="body2">
                                Casual Leave
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
                                {empdetails?.slleaveBalance}
                            </Typography>
                            <Typography variant="body2">
                                Sick Leave
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
                                {empdetails?.plleaveBalance}
                            </Typography>
                            <Typography variant="body2">
                                Privilege Leave
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
                                {empdetails?.comOffBalance}
                            </Typography>
                            <Typography variant="body2">
                                Comp. Leave
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default Topcard
