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
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ESSLogo from './ess-logo-White.png';
import SideMenu from '../Dashboard/SideBar';
import Header from '../Dashboard/ProfileHeader';
import ReferralScheme from './ReferralScheme';


function Copyright(props) {
    return (
        <Typography variant="caption" color="text.secondary" align="center" sx={{ mt: 3 }}>
            {'Copyright © '}
            {new Date().getFullYear()}{' '}
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
   
    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <Grid container component="main" className='dashboard'>
            <Box sx={{ display: 'flex', width: '100%' }}>
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
                        <Header headerContent={
                            <Typography
                                component="h1"
                                variant="h6"
                                noWrap
                                sx={{ color: '#34383F' }}>
                                <span className='breadcrumb'>Refferral Scheme</span> 
                            </Typography>
                        } />
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open} className='side-menu'>
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
                        <SideMenu/>
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
                        
                        <Grid container sx={{ width: '100%', pt: 2 }}>
                        
                            <ReferralScheme />
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
