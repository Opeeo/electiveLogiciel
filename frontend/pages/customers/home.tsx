import Grid from '@mui/material/Grid';
import Item from '@mui/material/Grid';
import Layout from '../../components/layout';
import styles from "../../styles/Home.module.css";
import { IRestaurant, getAllRestaurants } from '../../lib/restaurants';
import RestaurantCard from '../../components/restaurantCard';
import Categories from '../../components/categories';

const data: IRestaurant[] = getAllRestaurants();


const CustomerHome: React.FC = () => {
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

    );
}

export default CustomerHome;