import type { NextPage } from 'next';
import Grid from '@mui/material/Grid';
import Item from '@mui/material/Grid';
import Layout from '../../../components/layout';
import { getAllRestaurants, IRestaurant } from '../../../lib/restaurants';
import styles from '../../../styles/Restaurants.module.css'
import RestaurantCard from '../../../components/restaurantCard';

const AllRestaurants: NextPage = () => {

    const data: IRestaurant[] = getAllRestaurants();

    return (
        <Layout authentified>
            <div >
                <main>
                    <Grid container spacing={1}>
                        <Grid item xs={2}>
                            <Item>xs=6 md=4</Item>
                        </Grid>
                        <Grid item xs={10}>
                            <div className={styles.global}>
                                {data.map(({ id, img, fav, rate, name, offer }: IRestaurant) => (
                                    <RestaurantCard id={id} img={img} fav={fav} rate={rate} name={name} offer={offer} />
                                )
                                )}
                            </div>
                        </Grid>
                    </Grid>

                </main>
            </div>
        </Layout>
    )
}

export default AllRestaurants;
