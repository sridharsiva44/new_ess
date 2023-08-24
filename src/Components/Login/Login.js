import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import KeyIcon from '@mui/icons-material/Key';
import Typography from '@mui/material/Typography';
import Loginbg from './login-bg.jpg';
import LogoBlue from './changepond-logo-Blue.svg';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Container, FormHelperText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const loginForm = async (data) => {
        var bearer = 'Basic bXktdHJ1c3RlZC1jbGllbnQ6c2VjcmV0';
        await axios.request({
            url: "/ESS-Java/oauth/token",
            method: "post",
            headers: {
                'Authorization': bearer,
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: {
                grant_type: "password",
                username: data.empid,
                password: data.password
            }
        }).then(res => {
            if (res.status === 200) {
                console.log(res)
                localStorage.setItem('AccessToken', res.data.access_token);
                localStorage.setItem('RefreshToken', res.data.refresh_token);
                localStorage.setItem('UserID', data.empid);
                navigate('./dashboard');
            }
        }).catch(error => {

        })
    }
    const registerSchema = yup.object().shape({
        empid: yup.string()
            .required("Employee ID is required")
            .matches(/^\d{4}$/, 'Employee ID should have 4 digits'),
        password: yup.string()
            .required("Password is required")
            .matches(/^\d{4,20}$/, 'Password should have min 4 digits max 20 digits'),
    });
    const { register, handleSubmit, formState: { errors }, } = useForm({
        resolver: yupResolver(registerSchema)
    });
    const onSubmitHandler = (data) => {
        loginForm(data);
    };
    return (
        <Container maxWidth="lg">
            <Grid container component="main" alignItems="center" sx={{ height: '100vh' }} className='login'>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={false}
                    md={8}
                    sx={{
                        backgroundImage: `url(${Loginbg})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) => t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        height: '100vh'
                    }}
                />
                <Grid item xs={12} sm={12} md={4}>
                    <Box
                        sx={{
                            my: 3,
                            mx: 3,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <img src={LogoBlue} alt="Changepond" />
                        <Avatar sx={{ m: 2, bgcolor: 'primary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h5" variant="h5" sx={{ mb: 3, fontWeight: 600, color: '#00205B' }}>
                            ESS Login
                        </Typography>
                        <Paper elevation={3}
                            sx={{
                                px: 3,
                                py: 3,
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            <Box component="form" noValidate onSubmit={handleSubmit(onSubmitHandler)} sx={{ mt: 1 }}>
                                <TextField
                                    margin="normal"
                                    type='text'
                                    required
                                    fullWidth
                                    id="empid"
                                    label="Employee ID"
                                    name="empid"
                                    autoComplete="empid"
                                    autoFocus
                                    {...register('empid')}
                                    error={!!errors['empid']}
                                    helperText={errors['empid'] ? errors['empid'].message : ''}
                                    sx={{ backgroundColor: '#FBFBFB' }}
                                />
                                <FormControl error={errors['password'] ? true : false} variant="outlined" fullWidth required sx={{ mt: 4 }}>
                                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        error={!!errors['password']}
                                        {...register('password')}
                                        fullWidth
                                        autoComplete="current-password"
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Password"
                                        sx={{ backgroundColor: '#FBFBFB' }}
                                    />
                                    {!!errors['password'] ? (
                                        <FormHelperText error id="outlined-adornment-password">{errors['password'].message}</FormHelperText>
                                    ) : null}
                                </FormControl>
                                <Grid item sx={{ my: 2 }}>
                                    <Link href="ForgotPassword" variant="body2" underline="hover" color="primary" sx={{ display: 'flex', alignItems: 'center' }}>
                                        <KeyIcon sx={{ mr: 0.5, fontSize: '20px' }} /> Forgot Password?
                                    </Link>
                                </Grid>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    size="large"
                                    fullWidth
                                    sx={{ mt: 3, mb: 2, pt: 2, pb: 2 }}
                                >
                                    Login
                                </Button>
                            </Box>
                        </Paper>
                        <Typography variant="caption" color="text.secondary" align="center" sx={{ mt: 3 }}>
                            {'Copyright © '}
                            {new Date().getFullYear()}{' '}
                            <Link color="inherit" href="https://www.changepond.com/">
                                Changepond
                            </Link>
                            {'. All Rights Reserved.'}
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Login

