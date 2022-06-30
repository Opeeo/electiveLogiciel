//Profile page for customer

import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import { NextPage } from "next";
import { useState, useEffect, SetStateAction } from "react";
import Layout from "../../components/layout";
import { getProfile, deleteProfile, IUser, editProfile } from "../../lib/auth";
import { getUserState } from "../../store/slices/userSlice";
import { useDispatch, useSelector } from "../../store/store";

const Profile: NextPage = () => {
    
    const dispatch = useDispatch();
    const { name, email, token } = useSelector(getUserState);

    const [data, setData] = useState<IUser>({} as IUser);

    useEffect(() => {
        getProfile(1).then((res: SetStateAction<IUser>) => {
            setData(res);
        }
        )
    }, []);

    const [open, setOpen] = useState(false);

    const handleDeleteUser = () => {
        deleteProfile(data.profileId ? data.profileId : 0).then((res: { deletedAt: any; }) => {
            if (res.deletedAt) {
                window.location.href = "/";
            }
        }
        )
    }


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const target = e.target as HTMLFormElement;

        const data = {
            profileId: 1,
            email: target.email.value,
            first_name: target.first_name.value,
            last_name: target.last_name.value,
            password: target.password.value,
            phone_number: target.phone_number.value,
            roleId: 0,
            token: token

        }
        console.log(data);

        editProfile(1, data);

    }

    return (
        <Layout authentified={true} home={false}>
            <div>
                <h1>Profile</h1>
                <div>
                    <p>
                        <strong>First name:</strong> {data.first_name}
                    </p>
                    <p>
                        <strong>Last name:</strong> {data.last_name}
                    </p>
                    <p>
                        <strong>Email:</strong> {data.email}
                    </p>
                    <p>
                        <strong>Phone:</strong> {data.phone_number}
                    </p>
                </div>

                <div style={{ display: 'inline-block' }}>
                    <Button style={{ display: 'inline-block', margin: '10px' }} variant="contained" color='primary' onClick={handleClickOpen}>Edit informations</Button>
                    <Button style={{ display: 'inline-block', margin: '10px' }} variant="contained" color='error' onClick={handleDeleteUser}>Delete account</Button>
                </div>

                <Dialog open={open} onClose={handleClose}>
                    <form onSubmit={handleSubmit}>
                        <DialogTitle>Edit profile</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                You can update the informations of your profile here.
                            </DialogContentText>

                            <TextField
                                autoFocus
                                margin="dense"
                                id="email"
                                name="email"
                                label="Email Address"
                                type="email"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                            />

                            <TextField
                                autoFocus
                                margin="dense"
                                id="password"
                                name="password"
                                label="Password"
                                type="password"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                            />

                            <TextField
                                autoFocus
                                margin="dense"
                                id="first_name"
                                name="first_name"
                                label="First name"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                            />

                            <TextField
                                autoFocus
                                margin="dense"
                                id="last_name"
                                name="last_name"
                                label="Last name"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                            />

                            <TextField
                                autoFocus
                                margin="dense"
                                id="phone_number"
                                name="phone_number"
                                label="Phone number"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                            />

                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button type="submit">Subscribe</Button>
                        </DialogActions>
                    </form>
                </Dialog>

            </div>
        </Layout>
    );
}

export default Profile;
