import axios from 'axios';

import { useDispatch, useSelector } from '../store/store';
import { getUserState, setEmail, setName, setToken } from '../store/slices/userSlice';


export interface IRestaurant {
    _id: string;
    name: string;
    img: string;
    offer: string;
}


//Get all restaurants with axios typescript
export const getRestaurants = async (token: string) => {

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    const response = await axios.get('http://localhost:8080/api/restaurant/', config);
    const data: IRestaurant[] = response.data;
    return data;
}

//Get one restaurant with axios typescript
export const getRestaurant = async (id: string | string[] | undefined, token: string) => {
    //If id is undefined, return error
    if (!id) {
        throw new Error('No id provided');
    }
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    const response = await axios.get(`http://localhost:8080/api/restaurant/${id}`, config);
    return response.data;
}

//Get all restaurants id with axios typescript
export const getRestaurantsId = async () => {
    const response = await axios.get('http://localhost:8080/api/restaurant/');
    const data: IRestaurant[] = response.data;
    return data.map((restaurant: IRestaurant) => {
        return {
            params: {
                id: restaurant._id,
            },
        };
    });
}

//Delete a restaurant with axios typescript
export const deleteRestaurant = async (id: string): Promise<IRestaurant> => {
    const response = await axios.delete(`http://localhost:8080/api/restaurant/${id}`);
    return response.data;
}

//Update a restaurant with axios typescript
export const updateRestaurant = async (id: string, restaurant: IRestaurant): Promise<IRestaurant> => {
    const response = await axios.put(`http://localhost:8080/api/restaurant/${id}`, restaurant);
    return response.data;
}