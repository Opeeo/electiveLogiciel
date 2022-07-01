import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
//import order from '../lib/order';
import { getOrdersByRestaurant, acceptOrder, IOrder } from '../lib/orders';
import { GetStaticProps } from 'next';
import { idText } from 'typescript';
import Moment from 'moment';
import { useDispatch, useSelector } from '../store/store';
import { getUserState, setEmail, setName, setToken } from '../store/slices/userSlice';


interface IOrders_list {
    restaurantId: string;
}


const OrderListAccepted: React.FC<IOrders_list> = ({ restaurantId }) => {

    const { name, email, token } = useSelector(getUserState);

    const [data, setData] = React.useState<IOrder[]>([]);

    React.useEffect(() => {
        getOrdersByRestaurant(restaurantId, token).then(res => {
            setData(res);
        });
    }, []);

    return (
        <React.Fragment>
            <Title>Recent Orders</Title>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Order n°</TableCell>
                        <TableCell align="center">Date</TableCell>
                        <TableCell align="center">Ship To</TableCell>
                        <TableCell align="center">Accepted</TableCell>
                        <TableCell align="center">Received by deliveryman</TableCell>
                        <TableCell align="center">Delivered</TableCell>
                        <TableCell align="right">Sale Amount</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((order: IOrder) => (order.accepted && order.received_by_deliveryman ?
                        <TableRow key={order._id}>
                            <TableCell>{order._id.slice(-5).toUpperCase()}</TableCell>
                            <TableCell>{Moment(order.purchase_date).format('dddd Do h:mm:ss a')}</TableCell>
                            <TableCell align="center">{order.adress}</TableCell>
                            <TableCell align="center">{order.accepted ? "Accepted" : "Waiting"}</TableCell>
                            <TableCell align="center">{order.received_by_deliveryman ? "Yes" : "No"}</TableCell>
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