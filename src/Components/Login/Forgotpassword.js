import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LoginIcon from '@mui/icons-material/Login';
import KeyIcon from '@mui/icons-material/Key';
import Typography from '@mui/material/Typography';
import Loginbg from './login-bg.jpg';
import LogoBlue from './changepond-logo-Blue.svg';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { Container } from '@mui/material';
function ForgotPassword() {
    const registerSchema = yup.object().shape({
        email: yup.string()
            .required("email is required")
            .matches(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, 'email should be correct'),
    });
    const { register, handleSubmit, reset, formState: { errors }, } = useForm({
        resolver: yupResolver(registerSchema)
    });
    const onSubmitHandler = (data) => {
        console.log(data);
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
                            <KeyIcon />
                        </Avatar>
                        <Typography component="h5" variant="h5" sx={{ mb: 3, fontWeight: 600, color: '#00205B' }}>
                            Forgot Password
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
                                    id="email"
                                    label="Official Email"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    {...register('email')}
                                    error={!!errors['email']}
                                    helperText={errors['email'] ? errors['email'].message : ''}
                                />
                                <Button
                                    type="submit"
                                    variant="contained"
                                    size="large"
                                    fullWidth
                                    sx={{ mt: 3, mb: 2, pt: 2, pb: 2 }}
                                >
                                    Send Email
                                </Button>
                            </Box>
                            <Grid item sx={{ my: 2 }}>
                                <Link href="login" variant="body2" underline="hover" color="primary" sx={{ display: 'flex', alignItems: 'center' }}>
                                    <LoginIcon sx={{ mr: 0.5, fontSize: '20px' }} /> Back to login
                                </Link>
                            </Grid>
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

export default ForgotPassword