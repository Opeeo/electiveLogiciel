import axios from 'axios';
import { IArticle } from './articles';

export interface IOrder {
    articles: string[];
    id_restaurant: string;
    id_consumer: number;
    price: number;
    adress: string;
}

//create an order with axios typescript
export const createOrder = async (order: IOrder, token: string) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    const response = await axios.post('http://localhost:8080/api/order/', order, config);
    const createdOrder: IOrder = response.data;
    return createdOrder;

}