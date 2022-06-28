import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { getRestaurant, getRestaurantsId, IRestaurant } from "../../../lib/restaurants";
import Layout from "../../../components/layout";
import { Button, Grid, Typography } from "@mui/material";
import Item from "@mui/material/Grid";
import styles from "../../../styles/Restaurants.module.css";

interface IRestaurant_datas {
    restaurantData: IRestaurant;
    articles: string[];
}

const Restaurant: NextPage<IRestaurant_datas> = ({ restaurantData, articles }) => {
    return (
        <Layout authentified>
            <div >
                <main>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <div className={styles.headerPhoto} />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h2">{restaurantData.name}</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Item>xs=6 md=4</Item>
                        </Grid>
                        <Grid item xs={10}>
                            <div className={styles.global}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>

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
    console.log(params?.id);
    const restaurantData = await getRestaurant(params?.id);
    const articles = await getRestaurantsId();
    return {
        props: {
            restaurantData,
            articles
        },
    };
}

export default Restaurant;


