//Page to see the basket of a customer
import { getUserState, setEmail, setName, setToken } from '../../store/slices/userSlice';
import ArticleCard from "../../components/articleCard";
import { getCartState, addArticle, deleteAllArticle, setRestaurant } from "../../store/slices/cartSlice";
import { useDispatch, useSelector } from '../../store/store';

import { NextPage } from "next";
import Layout from "../../components/layout";
import { getRestaurant, IRestaurant } from '../../lib/restaurants';
import { useEffect, useState } from 'react';
import { Button, Grid, Typography } from '@mui/material';
import Link from 'next/link';
import styles from "../../styles/Restaurants.module.css";
import Image from 'next/image';
import { IOrder, createOrder } from '../../lib/order';


const Basket: NextPage = () => {

    const [data, setData] = useState<IRestaurant>({
        _id: "",
        name: "",
        img: "",
        offer: ""
    }
    );

    const dispatch = useDispatch();



    const { token, id } = useSelector(getUserState);
    const { articles, restaurantId } = useSelector(getCartState);


    useEffect(() => {

        getRestaurant(restaurantId, token).then(res => {
            console.log(res);
            setData(res);
        }
        )
    }, []);

    const handleOrder = () => {
        const total = articles.reduce((acc, cur) => acc + cur.price, 0);

        const listArticlesIds = articles.map(article => article._id);

        const order: IOrder = {
            articles: listArticlesIds,
            id_restaurant: restaurantId,
            id_consumer: id,
            price: total,
            adress: "10 rue de la detresse"
        }

        createOrder(order, token).then(res => {
            console.log(res);
        });
    }

    return (
        <Layout authentified={true} home={false}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <div className={styles.divPhotoHeader}>
                        <Image layout='fill' objectFit="cover" src={data.img ? data.img : 'https://d1ralsognjng37.cloudfront.net/6865c39c-39cb-416a-82bd-a7a597a3aeb7.jpeg'} />
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h2"> You are currently ordering to : <br></br> {data.name}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <div className={styles.global}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>

                                <Typography variant="h2" style={{ color: '#59BD5A' }}>Cart : </Typography>

                                {articles.length > 0 &&
                                    articles.map((article, i) => {
                                        return <ArticleCard key={article._id} name={article.name} price={article.price} id={article._id} isCart={true} positionInMap={i} cardClass={'smCard'} />

                                    })
                                }
                            </Grid>
                            <Grid item xs={12}>
                                {articles.length > 0 ?
                                    <Button variant="contained" color="primary" onClick={() => {
                                        dispatch(deleteAllArticle());
                                    }
                                    }>Delete all</Button>
                                    : <Typography variant="h4">
                                        No articles in cart go to
                                        <Link
                                            href={restaurantId ? '/customers/restaurant/' + restaurantId : '/customers/home'}
                                        >
                                            <Typography
                                                variant="h3"
                                                style={{ color: '#59BD5A', cursor: 'pointer', textDecoration: 'underline' }}
                                            >
                                                {data.name}
                                            </Typography>
                                        </Link>
                                    </Typography>
                                }
                            </Grid>
                            <Grid item xs={12}>
                                {articles.length > 0 &&
                                    <Button variant="contained" color="primary" onClick={handleOrder}>Order</Button>

                                }
                            </Grid>
                        </Grid>
                    </div>
                </Grid >
            </Grid >
        </Layout >

    );
}

export default Basket;

