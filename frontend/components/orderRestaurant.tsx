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
import { getOrdersByRestaurant, acceptOrder, IOrder, deleteOrder, receiveOrder, socket } from '../lib/orders';
import { GetStaticProps } from 'next';
import { idText } from 'typescript';
import Moment from 'moment';
import { useDispatch, useSelector } from '../store/store';
import { getUserState, setEmail, setName, setToken } from '../store/slices/userSlice';
import Button from '@mui/material/Button';
import { arrayBuffer } from 'node:stream/consumers';
import { Refresh } from '@mui/icons-material';


interface IOrders_list {
    restaurantId: string;
}

const OrderList : React.FC<IOrders_list> = ({ restaurantId }) => {

    const { name, email, token } = useSelector(getUserState);

    const [data, setData] = React.useState<any[]>([]);
    

    React.useEffect(() => {
        socket.on("NewOrder"+restaurantId, () => {
            getOrdersByRestaurant(restaurantId, token).then(res => {
            var temp:IOrder[] = [];
            res.forEach(element => {
                if(!element.delivered){
                    temp.push(element);
                }
            });
            setData(temp);
        });});
    }, []);   

    React.useEffect(() => {
        getOrdersByRestaurant(restaurantId, token).then(res => {
            var temp:IOrder[] = [];
            res.forEach(element => {
                if(!element.delivered){
                    temp.push(element);
                }
            });
            setData(temp);
        });
    }, []); 

function refreshPage() {
    window.location.reload();
}

    return(
    <React.Fragment>
        <Title>Waiting orders</Title>
        {data.length == 0 ? <div>
            <img 
                src={'https://cdn-icons-png.flaticon.com/512/66/66165.png'}
                alt="Canvas Logo"
                style={{width: '100px', height: '100px', marginBottom: '100px', margin: 'auto', display: 'block'}}/>
            </div> : <Table>
            <TableHead>
            <TableRow>
                <TableCell>Order n°</TableCell>
                <TableCell align="center">Date</TableCell>
                <TableCell align="center">Ship To</TableCell>
                <TableCell align="center">Accepted</TableCell>
                <TableCell align="center">Sale Amount</TableCell>                
            </TableRow>
            </TableHead>
            <TableBody>
                {data.map((order : any) => {
                    return <TableRow key={order._id}>
                        <TableCell>{order._id.slice(-5).toUpperCase()}</TableCell>
                        <TableCell align="center">{Moment(order.purchase_date).format('dddd Do h:mm:ss a')}</TableCell>
                        <TableCell align="center">{order.adress}</TableCell>
                        <TableCell align="center">{order.accepted ? "Accepted" : "Waiting"}</TableCell>
                        <TableCell align="center">{`${order.price}`}</TableCell>
                        {!order.accepted ? 
                        (<div>
                            <TableCell align="right"><Button variant="contained" onClick={() => {acceptOrder(order._id, token).then(res => refreshPage())}}>Accept</Button></TableCell>
                            <TableCell align="right"><Button variant="contained" onClick={() => {deleteOrder(order._id, token).then(res => refreshPage())}}>Decline</Button></TableCell>
                        </div>)
                        : (order.received_by_deliveryman ? <TableCell align="right">
                    <img 
                        src={'../public/images/delivery_image/fast-delivery.png'}
                        style={{width: '4em', height: '4em'}}/>
                    </TableCell> 
                    : <TableCell align="right"><Button variant="contained" onClick={() => {receiveOrder(order._id, token).then(res => refreshPage())}}>Give to deliveryman</Button></TableCell>)}
                    </TableRow>})}
            </TableBody>
        </Table>}
    </React.Fragment>
    );
}


export default OrderList;