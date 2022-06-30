import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Image from 'next/image';
import { useRouter } from 'next/router'
import { useState } from 'react'
import { setId, setToken } from '../store/slices/userSlice';
import { useDispatch, useSelector } from '../store/store';
import { login } from '../lib/auth';

const theme = createTheme();

/**
 * A sign in page.
 * @constructor
 */
export default function SignIn() {

    const router = useRouter()

    const dispatch = useDispatch();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });

        login(String(data.get('email')), String(data.get('password'))).then(res => {
            if (res) {
                dispatch(setToken(res.token ? res.token : ''));
                dispatch(setId(res.profileId ? res.profileId : 0));
                console.log(res);
                switch (res.roleId) {
                    case 1:
                        router.push('/customers/home');
                        break;
                    case 2:
                        router.push('/restorers/home');
                        break;
                    case 3:
                        router.push('/deliveryman/home');
                        break;

                    default:
                        alert('Invalid role');
                        break;
                }
            }
        }).catch(err => {
            alert(err);
        }
        )
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Image
                        src="/images/UberEats-LogoPNG1.png"
                        alt="Uber Eats Logo"
                        width={250}
                        height={45}
                        className=''
                    />
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}

                        >
                            Sign In
                        </Button>


                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2" underline='hover'>
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/register" variant="body2" underline='hover'>
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                        <Grid container justifyContent='flex-end'>
                            <Grid item xs>
                                <Link href="/" variant="body2" underline='hover'>
                                    {"Go back to home page"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}