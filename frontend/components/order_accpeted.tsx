import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import mongoose from 'mongoose';
import Title from './Title';
//import order from '../lib/order';
import { getOrdersByRestaurant, acceptOrder, IOrder } from '../lib/orders';
import { GetStaticProps } from 'next';
import { idText } from 'typescript';
import Moment from 'moment';


interface IOrders_list {
    restaurantId: string;
}


const OrderListAccepted : React.FC<IOrders_list> = ({ restaurantId }) => {

    const [data, setData] = React.useState<IOrder[]>([]);

    React.useEffect(() => {
        getOrdersByRestaurant(restaurantId).then(res => {
            setData(res);
        });
    }, []);

    return(
    <React.Fragment>
        <Title>Recent Orders</Title>
        <Table>
            <TableHead>
            <TableRow>
                <TableCell>Date</TableCell>
                <TableCell align="center">Ship To</TableCell>
                <TableCell align="center">Accepted</TableCell>
                <TableCell align="center">Received by deliveryman</TableCell>
                <TableCell align="center">Delivered</TableCell>
                <TableCell align="right">Sale Amount</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {data.map((order : IOrder) => ( order.accepted ?      
                <TableRow key={order._id}>
                <TableCell>{Moment(order.purchase_date).format('dddd Do h:mm:ss a')}</TableCell>
                <TableCell align="center">{order.adress}</TableCell>
                <TableCell align="center">{order.accepted ? "Accepted" : "Waiting"}</TableCell>
                <TableCell align="center">{order.received_by_deliverylman ? "Yes" : "No"}</TableCell>                
                <TableCell align="center">{order.delivered ? "Yes" : "No"}</TableCell>
                <TableCell align="right">{`${order.price}`}</TableCell>
                </TableRow>
            : " "))}
            </TableBody>
        </Table>
    </React.Fragment>
    );
}


export default OrderListAccepted;