import axios from "axios";


import { useDispatch, useSelector } from '../store/store';
import { getUserState, setEmail, setName, setToken } from '../store/slices/userSlice';

export interface IUser { 
    profileId?: number;
    email: string;
    name: string;
    password: string;
    address: string;
    phone: string;
}

//Create a new user with email, name and password and return the user with axios typescript and JsonWebToken
 export function register(user: IUser): Promise<IUser> {
     return axios.post("/api/users", user)
         .then(response => response.data);
 }

//Login with email and password and return the user with axios typescript and JsonWebToken
export function login(email: string, password: string): Promise<IUser> {
    return axios.post("/api/users/login", { email, password })
        .then(response => response.data);
}