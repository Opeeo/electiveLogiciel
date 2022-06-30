import axios from "axios";


import { useDispatch, useSelector } from '../store/store';
import { getUserState, setEmail, setName, setToken } from '../store/slices/userSlice';

export interface IUser { 
    profileId?: number;
    email: string;
    first_name?: string;
    last_name?: string;
    password: string;
    phone_number?: string;
    roleId: number;
    promotionnal_notification?: boolean;
    promotionnal_email?: boolean;
    delivery_notification?: boolean;
    token?: string;
}



//Create a new user with email, name and password and return the user with axios typescript and JsonWebToken
export function register(user: IUser): Promise<IUser> {

    //const dispatch = useDispatch();
    //const { token } = useSelector(getUserState);

    return axios.post("http://localhost:8080/api/profile", user).then(response => {
        //concatenate user with response.data
        const user_created = {
            ...user,
            profileId: response.data.profileId,
            token: response.data.token
        };

        const config = {
            headers: { Authorization: `Bearer ${response.data.token}` }
        };

        switch (user.roleId) {
            case 1:
                return axios.post("http://localhost:8080/api/profile/consumer", user_created, config).then(response => {
                    return user_created;
                })
                    .catch(error => {
                        throw error;
                    });
                break;

            case 2:
                return axios.post("http://localhost:8080/api/profile/restaurator", user_created, config).then(response => {
                    return user_created;
                })
                    .catch(error => {
                        throw error;
                    }
                    );
                break;

            default:
                throw new Error("Role not found");
                break;


        }
    }
    ).catch(error => {
        throw error;
    }
    );


}

//Login with email and password and return the user with axios typescript and JsonWebToken
export function login(email: string, password: string): Promise<IUser> {
    return axios.post("http://localhost:8080/api/users/login", { email, password })
        .then(response => response.data);
}

//Get a user with axios typescript and JsonWebToken
export function getProfile(id: number): Promise<IUser> {
    return axios.get(`http://localhost:8080/api/profile/${id}`)
        .then(response => response.data);
}

//Edit a user with axios typescript and JsonWebToken
export function editProfile(id: number, user: IUser): Promise<IUser> {
    return axios.put(`http://localhost:8080/api/profile/${id}`, user)
        .then(response => response.data);
}

//Delete a user with axios typescript and JsonWebToken
export function deleteProfile(id: number): Promise<any> {
    return axios.delete(`http://localhost:8080/api/profile/${id}`)
        .then(response => response.data);
}
