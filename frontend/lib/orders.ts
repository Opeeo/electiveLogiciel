import axios from 'axios';

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
    received_by_deliverylman: boolean;
}




//Get all orders by restaurant id with axios and typescript
export const getOrdersByRestaurant = async (id: string) => {
    const response = await axios.get(`http://localhost:8080/api/order/restaurant/${id}`);
    const data: IOrder[] = response.data;
    return data;
}


//Accept an order with axios and typescript
export const acceptOrder = async (id: string) => {
    const response = await axios.put(`http://localhost:8080/api/orders/${id}`, { accepted: true });
    const data: IOrder = response.data;
    return data;
}
    



