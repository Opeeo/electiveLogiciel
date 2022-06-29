import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Image from 'next/image';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import { FormGroup } from '@mui/material';
import { IUser, register } from '../lib/auth';
import { setToken } from '../store/slices/userSlice';
import { useDispatch, useSelector } from '../store/store';

const theme = createTheme();
/**
 * A register.
 * @constructor
 */
export default function Register() {

    const dispatch = useDispatch();

    const [showCustomer, setShowCustomer] = React.useState(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();
        const data = new FormData(event.currentTarget);


        switch (Number(data.get('role'))) {
            case 1:
                const userConsumer: IUser = {
                    email: String(data.get('email')),
                    password: String(data.get('password')),
                    first_name: String(data.get('first_name')),
                    last_name: String(data.get('last_name')),
                    phone_number: String(data.get('phone_number')),
                    roleId: Number(data.get('role')),
                    promotionnal_notification: data.get('promotionnal_notification') === 'on',
                    promotionnal_email: data.get('promotionnal_email') === 'on',
                    delivery_notification: data.get('delivery_notification') === 'on',
                }

                console.log(userConsumer);
                register(userConsumer).then((res) => {
                    if (res) {
                        dispatch(setToken(res.token ? res.token : ''));
                        window.location.href = '/customers/home';
                    }
                }
                )

                break;
            case 2:
                const userRestaurateur: IUser = {
                    email: String(data.get('email')),
                    password: String(data.get('password')),
                    first_name: String(data.get('first_name')),
                    last_name: String(data.get('last_name')),
                    phone_number: String(data.get('phone_number')),
                    roleId: Number(data.get('role')),
                }

                console.log(userRestaurateur);
                register(userRestaurateur).then((res: any) => {
                    if (res) {
                        dispatch(setToken(res.token ? res.token : ''));
                        window.location.href = '/restorers/home';
                    }
                }
                );

                break;

            default:
                alert('Veuillez choisir un role');
                break;
        }
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
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="first_name"
                                    required
                                    fullWidth
                                    id="first_name"
                                    label="First Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="last_name"
                                    label="Last Name"
                                    name="last_name"
                                    autoComplete="family-name"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    name="phone_number"
                                    label="Phone number"
                                    type="text"
                                    id="phone_number"
                                    autoComplete="phone"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <RadioGroup
                                    aria-labelledby="radio-buttons-group-label"
                                    defaultValue="consumer"
                                    name="role"
                                >
                                    <FormControlLabel onClick={() => { setShowCustomer(true); }} value="1" control={<Radio />} label="Consumer" />
                                    <FormControlLabel onClick={() => { setShowCustomer(false); }} value="2" control={<Radio />} label="Restaurator" />
                                </RadioGroup>
                            </Grid>
                            {showCustomer && (
                                <>
                                    <Grid item xs={12} sm={6}>
                                        <FormGroup>
                                            <FormControlLabel control={<Checkbox />} label="Promotionnal Notif" name='promotionnal_notification' />
                                        </FormGroup>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormGroup>
                                            <FormControlLabel control={<Checkbox />} label="Promotionnal Email" name='promotionnal_email' />
                                        </FormGroup>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormGroup>
                                            <FormControlLabel control={<Checkbox />} label="Delivery notif" name='delivery_notification' />
                                        </FormGroup>
                                    </Grid>
                                </>

                            )}

                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Register
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/login" variant="body2" underline='hover'>
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
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