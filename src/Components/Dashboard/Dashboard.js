import * as React from 'react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ESSLogo from './assets/ess-logo-White.png';
import SideMenu from './SideBar';
import LeaveDetails from './LeaveDetails';
import ShortfallReport from './ShortfallReport';
import Attendance from './Attendance ';
import HolidaysList from './HolidaysList';
import ProfileSummary from './ProfileSummary';
import CurrentDateTime from './DateTimeWidget';
import BirthdayWishes from './BirthdayWidget';
import { useEffect } from 'react'
import Header from './ProfileHeader';
import { useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import sunriseImage from './assets/morning-6-12.png'
import sunnyImage from './assets/noon-12-6.png'
import moonImage from './assets/moonimage.png'
import axios from 'axios';
function Copyright(props) {
    return (
        <Typography variant="caption" color="text.secondary" align="center" sx={{ mt: 3 }}>
            {'Copyright © '}
            {new Date().getFullYear()}{''}
            <Link color="inherit" href="https://www.changepond.com/">
                Changepond
            </Link>
            {'. All Rights Reserved.'}
        </Typography>
    );
}

const drawerWidth = 250;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            height: '100vh',
            overflow: 'hidden auto',
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(0),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(0),
                },
            }),
        },
    }),
);

function DashboardContent() {
    const [open, setOpen] = React.useState(true);
    const isMobile = useMediaQuery("(max-width: 600px)");
    const [currentTime, setCurrentTime] = React.useState(new Date().getHours());
    const [backgroundImage, setBackGroundImage] = React.useState('');
    const [cityname, setCityName] = React.useState("Chennai")
    const [weatherData, setWeatherData] = React.useState({
        celcius: '',
        name: '',
        icon: '',
    });
    const apiKey = "4619e60149533aeb8ea5c5d1c8e7205c";
    const navigate = useNavigate()
    const { ans } = useSelector((state) => state.validate)
    const userid = localStorage.getItem('UserID');

    useEffect(() => {
        if (isMobile) {
            setOpen(false);
        } else {
            setOpen(true);
        }
        TimeBasedImage();
        weatherReport();
    }, [isMobile])

    useEffect(() => {
        // Update current time every minute
        const interval = setInterval(() => {
            setCurrentTime(new Date().getHours());
        }, 60000);
        return () => clearInterval(interval);
    }, []);

    const TimeBasedImage = () => {
        // Define time ranges in hours
        const morningStart = 6;
        const afternoonStart = 12;
        const eveningStart = 18;

        if (currentTime >= morningStart && currentTime < afternoonStart) {
            setBackGroundImage(`${sunriseImage}`)
        } else if (currentTime >= afternoonStart && currentTime < eveningStart) {
            setBackGroundImage(`${sunnyImage}`)
        } else {
            setBackGroundImage(`${moonImage}`)
        }
    }

    const weatherReport = () => {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${apiKey}&units=metric`;
        console.log(apiUrl);
        axios.request({
            url:apiUrl,
            method:"get",
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/x-www-form-urlencoded'
            }
        }).then(res=>{
            console.log(res.data);
            setWeatherData({...weatherData, celcius: res.data.main.temp, name: res.data.name, icon: res.data.weather[0].icon});

        });

    }
    console.log(weatherData);

    useEffect(() => {
        if (ans === '' && userid === null) {
            navigate('/');
        }
    }, [ans, navigate, userid])

    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <Grid container component="main" className='dashboard'>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="absolute" open={open}>
                    <Toolbar
                        sx={{ pr: '14px', backgroundColor: '#FFF', boxShadow: '6px 2px 10px #EEF1F7' }}>
                        <IconButton
                            edge="start"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: '16px',
                                ...(open && { display: 'none' }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Header headerContent={null} />
                    </Toolbar>
                </AppBar>
                <Drawer open={open} className='side-menu' variant='permanent' >
                    <Toolbar
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            py: [1],
                            px: [2]
                        }}
                    >
                        <img src={ESSLogo} alt="ESS Changepond" />
                        <IconButton onClick={toggleDrawer} sx={{
                            ml: 'auto',
                            p: 0.5,
                            backgroundColor: '#FFF',
                            color: '#00205B'
                        }}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </Toolbar>
                    <List component="nav">
                        <SideMenu />
                    </List>
                </Drawer>
                <Box
                    component="main"
                    sx={{
                        backgroundColor: '#FBFBFB',
                        flexGrow: 1,
                        width: '100%',
                        height: '100vh',
                        overflow: 'auto'
                    }}
                >
                    <Toolbar />
                    <Container maxWidth='xl' sx={{ mt: 2, mb: 2 }}>
                        <Grid container spacing={2}>
                            {/* Profile Summary */}
                            <Grid item xs={12} md={8} lg={9}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: '100%',
                                        border: '1px solid #E7EFFF',
                                        borderRadius: '8px',
                                        boxShadow: '0px 2px 10px #EEF1F7'
                                    }}
                                >
                                    <ProfileSummary />
                                </Paper>
                            </Grid>

                            {/* Current Date & Time */}
                            <Grid item xs={12} md={4} lg={3}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        backgroundImage: `url(${backgroundImage})`,
                                        backgroundRepeat: 'no-repeat',
                                        backgroundPosition: '90% 70%',
                                        backgroundSize: '110px',
                                        height: '100%',
                                        border: '1px solid #E7EFFF',
                                        borderRadius: '8px',
                                        boxShadow: '0px 2px 10px #EEF1F7'
                                    }}
                                >
                                    <CurrentDateTime temperature={weatherData.celcius} locationname={weatherData.name} />
                                </Paper>
                            </Grid>

                            {/* Leave Details */}
                            <Grid item xs={12} md={4} lg={3}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: '100%',
                                        border: '1px solid #E7EFFF',
                                        borderRadius: '8px',
                                        boxShadow: '0px 2px 10px #EEF1F7'
                                    }}
                                >
                                    <LeaveDetails />
                                </Paper>
                            </Grid>

                            {/* Holidays List */}
                            <Grid item xs={12} md={4} lg={3}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: '100%',
                                        border: '1px solid #E7EFFF',
                                        borderRadius: '8px',
                                        boxShadow: '0px 2px 10px #EEF1F7'
                                    }}
                                >
                                    <HolidaysList />
                                </Paper>
                            </Grid>

                            {/* Shortfall Report */}
                            <Grid item xs={12} md={4} lg={3}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: '100%',
                                        border: '1px solid #E7EFFF',
                                        borderRadius: '8px',
                                        boxShadow: '0px 2px 10px #EEF1F7'
                                    }}
                                >
                                    <ShortfallReport />
                                </Paper>
                            </Grid>

                            <Grid item xs={12} md={12} lg={3}>
                                {/* Attendance */}
                                <Grid item xs={12} md={6} lg={12}>
                                    <Paper
                                        sx={{
                                            p: 2,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            height: '100%',
                                            border: '1px solid #E7EFFF',
                                            borderRadius: '8px',
                                            boxShadow: '0px 2px 10px #EEF1F7'
                                        }}
                                    >
                                        <Attendance />
                                    </Paper>
                                </Grid>
                                {/* Birthday Wishes */}
                                <Grid item xs={12} md={6} lg={12}>
                                    <Paper
                                        sx={{
                                            p: 2, mt: 2,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            height: '100%',
                                            border: '1px solid #E7EFFF',
                                            borderRadius: '8px',
                                            boxShadow: '0px 2px 10px #EEF1F7'
                                        }}
                                    >
                                        <BirthdayWishes />
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item sx={{ textAlign: 'center', pt: 2 }}>
                            <Copyright />
                        </Grid>
                    </Container>
                </Box>
            </Box>
        </Grid>
    );
}

export default function Dashboard() {

    return <DashboardContent />;
}
