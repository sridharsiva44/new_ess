import React, { useEffect } from 'react'
import { Typography } from '@mui/material'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import KeyIcon from '@mui/icons-material/Key';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {  useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Logoutdata } from '../Redux/Action';
function Header(HeaderName) {
    const navigate = useNavigate()
    const dispatch=useDispatch()
    const { logoutpayload } = useSelector((state) => state.validate)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    
    const fetchUserDetails = useSelector((state) => state.data)
    const empdetails = fetchUserDetails.payload.empDet;
   
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
   const changePassword=()=>{
    navigate('/changepassword')
   }
    useEffect(() => {
        if (logoutpayload === '/Login') {
            navigate('/');
        }
    }, [navigate, logoutpayload])
    return (
        <React.Fragment>
            <Typography
                component="h1"
                variant="h6"
                noWrap
                sx={{ flexGrow: 1, color: '#34383F' }}
            >
                {HeaderName.headerContent === null ? empdetails?.employeeName === undefined ? 'Hello! ' : `Hello ${empdetails?.employeeName} !` : HeaderName.headerContent}
            </Typography>

            <Tooltip title="Profile">
                <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                >
                    <AccountCircleIcon sx={{ width: 32, height: 32 }}></AccountCircleIcon>
                </IconButton>
            </Tooltip>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={changePassword}>
                    <ListItemIcon >
                        <KeyIcon fontSize="small" />
                    </ListItemIcon>
                    Change Password
                </MenuItem>
                <MenuItem onClick={() => dispatch(Logoutdata())}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </React.Fragment>
    )
}

export default Header
