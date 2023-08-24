
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
import LockResetIcon from '@mui/icons-material/LockReset';
import Typography from '@mui/material/Typography';
import Loginbg from './login-bg.jpg';
import LogoBlue from './changepond-logo-Blue.svg';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { Container, FormHelperText } from '@mui/material';
function ResetPassword() {
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const registerSchema = yup.object().shape({
        password: yup.string()
            .required("password is required")
            .matches(/^\d{4}$/, 'password should have 4 digits'),
        Cpassword: yup.string()
            .required("password is required")
            .matches(/^\d{4}$/, 'password should have 4 digits')
            .oneOf([yup.ref("password")], "Passwords do not match")
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
                            <LockResetIcon />
                        </Avatar>
                        <Typography component="h5" variant="h5" sx={{ mb: 3, fontWeight: 600, color: '#00205B' }}>
                            Reset Password
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
                                    type='password'
                                    required
                                    fullWidth
                                    id="password"
                                    label="New password"
                                    name="password"
                                    autoComplete="password"
                                    autoFocus
                                    {...register('password')}
                                    error={!!errors['password']}
                                    helperText={errors['password'] ? errors['password'].message : ''}
                                />
                                <FormControl error={errors['Cpassword'] ? true : false} variant="outlined" fullWidth required sx={{ mt: 4 }}>
                                    <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        type={showPassword ? 'text' : 'password'}
                                        name="Cpassword"
                                        error={!!errors['Cpassword']}
                                        {...register('Cpassword')}
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
                                        label="Confirm Password"
                                    />
                                    {!!errors['Cpassword'] ? (
                                        <FormHelperText error id="outlined-adornment-password">{errors['Cpassword'].message}</FormHelperText>
                                    ) : null}
                                </FormControl>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    size="large"
                                    fullWidth
                                    sx={{ mt: 3, mb: 2, pt: 2, pb: 2 }}
                                >
                                    Reset Password
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
    )
}

export default ResetPassword