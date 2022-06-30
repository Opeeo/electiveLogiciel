import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { getRestaurant, getRestaurantsId, IRestaurant } from "../../../lib/restaurants";
import Layout from "../../../components/layout";
import { Button, Grid, Typography } from "@mui/material";
import Item from "@mui/material/Grid";
import styles from "../../../styles/Restaurants.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getArticlesByRestaurant, IArticle } from "../../../lib/articles";
import { useDispatch, useSelector } from '../../../store/store';
import { getUserState, setEmail, setName, setToken } from '../../../store/slices/userSlice';
import ArticleCard from "../../../components/articleCard";
import { getCartState, addArticle, deleteAllArticle, setRestaurant } from "../../../store/slices/cartSlice";
import Link from "next/link";



interface IRestaurantProps {
    restaurantId: string;
}



const Restaurant: NextPage<IRestaurantProps> = ({ restaurantId }) => {

    const [data, setData] = useState<IRestaurant>({
        _id: "",
        name: "",
        img: "",
        offer: ""
    }
    );

    const dispatch = useDispatch();



    const { token } = useSelector(getUserState);
    const { articles } = useSelector(getCartState);

    const [articlesLocal, setArticles] = useState<IArticle[]>([]);

    useEffect(() => {

        dispatch(setRestaurant(restaurantId));

        getArticlesByRestaurant(restaurantId, token).then(res => {
            setArticles(res);
        }
        )
        getRestaurant(restaurantId, token).then(res => {
            console.log(res);
            setData(res);
        }
        )
    }, []);


    return (
        <Layout authentified>
            <main>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <div className={styles.divPhotoHeader}>
                            <Image layout='fill' objectFit="cover" src={data.img ? data.img : 'https://d1ralsognjng37.cloudfront.net/6865c39c-39cb-416a-82bd-a7a597a3aeb7.jpeg'} />
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h2">{data.name}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <div className={styles.global}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    {
                                        articles.length > 0 &&
                                        <Link href='/customers/basket'><Typography variant="h4">Cart</Typography></Link>

                                    }{articles.length > 0 &&
                                        articles.map((article, i) => {
                                            return <ArticleCard key={article._id} name={article.name} price={article.price} id={article._id} isCart={true} positionInMap={i} cardClass={'smCard'} />

                                        })
                                    }
                                    <Typography variant="h4">Articles</Typography>
                                    <div style={{ display: 'inline-block' }}></div>
                                    {
                                        articlesLocal.map(({ _id, name, price }: IArticle, i: number) => {
                                            return (
                                                <ArticleCard id={_id} name={name} price={price} isCart={false} positionInMap={i} cardClass={'xlCard'} />
                                            )
                                        }
                                        )
                                    }
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
                </Grid>
            </main>
        </Layout>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = await getRestaurantsId();
    return {
        paths,
        fallback: false,
    };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    // Fetch necessary data for the blog post using params.id
    return {
        props: {
            restaurantId: params?.id
        },
    };
}

export default Restaurant;


