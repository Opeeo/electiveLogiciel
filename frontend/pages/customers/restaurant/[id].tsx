import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { getRestaurant, getRestaurantsId, IRestaurant } from "../../../lib/restaurants";
import Layout from "../../../components/layout";
import { Button, Grid, Typography } from "@mui/material";
import Item from "@mui/material/Grid";
import styles from "../../../styles/Restaurants.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getArticlesByRestaurant, IArticle } from "../../../lib/articles";

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

    const [articles, setArticles] = useState<IArticle[]>([]);

    useEffect(() => {
        getArticlesByRestaurant(restaurantId).then(res => {
            setArticles(res);
        }
        )
        getRestaurant(restaurantId).then(res => {
            console.log(res);
            setData(res);
        }
        )
    }, []);


    return (
        <Layout authentified>
            <div >
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
                                        <Typography variant="h4">Articles</Typography>
                                        {
                                            articles.map(({ _id, name, price }: IArticle) => {
                                                return (
                                                    <Typography>{_id}, {name}, {price}</Typography>
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
            </div>
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


