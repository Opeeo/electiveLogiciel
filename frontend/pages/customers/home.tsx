import Grid from '@mui/material/Grid';
import Item from '@mui/material/Grid';
import Layout from '../../components/layout';
import styles from "../../styles/Home.module.css";
import { IRestaurant, getRestaurants } from '../../lib/restaurants';
import RestaurantCard from '../../components/restaurantCard';
import Categories from '../../components/categories';
import { log } from 'console';
import { GetStaticProps } from 'next';

interface IRestaurant_list {
    restaurant_list: IRestaurant[];
}

const CustomerHome: React.FC<IRestaurant_list> = ({ restaurant_list }) => {
    return (
        <Layout authentified>
            <div >
                <main>
                    <div className={styles.categories}>
                        <Categories />
                    </div>

                    <Grid container spacing={1}>
                        <Grid item xs={2}>
                            <Item>xs=6 md=4</Item>
                        </Grid>
                        <Grid item xs={10}>
                            <div className={styles.global}>
                                {
                                    restaurant_list.map(({ _id, name, rate, fav, img, offer }: IRestaurant) => (
                                        <RestaurantCard id={_id} name={name} rate={rate} fav={fav} img={img} offer={offer} />
                                    ))
                                }
                            </div>
                        </Grid>
                    </Grid>

                </main>
            </div>
        </Layout>

    );
}


export const getStaticProps: GetStaticProps = async () => {
    const restaurant_list = await getRestaurants();
    return {
        props: {
            restaurant_list,
        },
    };
}

export default CustomerHome;