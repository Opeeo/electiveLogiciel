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
const { io } = require("socket.io-client");


interface IOrders_list {
    restaurantId: string;
}

const OrderList : React.FC<IOrders_list> = ({ restaurantId }) => {

    const [data, setData] = React.useState<IOrder[]>([]);

    const socket = io("http://localhost:3002");

    React.useEffect(() => {
        socket.on("new_order", (order : IOrder) => {
            console.log("help");
            setData([...data, order]);
        });
    }, []);  

    React.useEffect(() => {
        getOrdersByRestaurant(restaurantId).then(res => {
            var temp:IOrder[] = [];
            res.forEach(element => {
                if(!element.accepted){
                    temp.push(element);
                }
            });
            setData(temp);
        });
    }, []);         


    return(
    <React.Fragment>
        <Title>Waiting orders</Title>
        {data.length ? <div>
            <img 
                src={'https://cdn-icons-png.flaticon.com/512/66/66165.png'}
                alt="Canvas Logo"
                style={{width: '100px', height: '100px', marginBottom: '100px', margin: 'auto', display: 'block'}}/>
            </div> : <Table>
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
                {data.map((order : IOrder) => (     
                    <TableRow key={order._id}>
                        <TableCell>{Moment(order.purchase_date).format('dddd Do h:mm:ss a')}</TableCell>
                        <TableCell align="center">{order.adress}</TableCell>
                        <TableCell align="center">{order.received_by_deliverylman ? "Yes" : "No"}</TableCell>
                        <TableCell align="center">{order.accepted ? "Accepted" : "Waiting"}</TableCell>
                        <TableCell align="center">{order.delivered ? "Yes" : "No"}</TableCell>
                        <TableCell align="right">{`${order.price}`}</TableCell>
                    </TableRow>))}
            </TableBody>
        </Table>}
    </React.Fragment>
    );
}


export default OrderList;