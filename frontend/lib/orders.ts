import axios from 'axios';

import { useDispatch, useSelector } from '../store/store';
import { getUserState, setEmail, setName, setToken } from '../store/slices/userSlice';
const { io } = require("socket.io-client");

export interface IOrder {
    _id: string;
    purchase_date: Date;
    price: number;
    adress: string;
    articles: string[];
    menu: string[];
    delivered: boolean;
    id_restaurant: string;
    id_consumer: number;
    id_deliveryman:  number;
    accepted: boolean;
    received_by_deliveryman: boolean;
}

export const socket = io("http://localhost:3002");

//Get all orders by restaurant id with axios and typescript
export const getOrdersByRestaurant = async (id: string, token: string) => {

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    console.log(config);

    const response = await axios.get(`http://localhost:8080/api/order/restaurant/${id}`, config);
    const data: IOrder[] = response.data;
    return data;
}


//Accept an order with axios and typescript
export const acceptOrder = async (id: string, token: string) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    const response = await axios.put(`http://localhost:8080/api/order/${id}`, { accepted: true }, config);
    const data: IOrder = response.data;
    return data;
}

//Delete an order with axios and typescript
export const deleteOrder = async (id: string, token: string) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    const response = await axios.delete(`http://localhost:8080/api/order/${id}`, config);
    const data: IOrder = response.data;
    return data;
}

//Put received_by_deliverylman to true with axios and typescript
export const receiveOrder = async (id: string, token: string) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    const response = await axios.put(`http://localhost:8080/api/order/${id}`, { received_by_deliveryman: true }, config);
    const data: IOrder = response.data;
    return data;
}



