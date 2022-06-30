import Grid from '@mui/material/Grid';
import Item from '@mui/material/Grid';
import Layout from '../../components/layout';
import styles from "../../styles/Home.module.css";
import { IRestaurant, getRestaurants } from '../../lib/restaurants';
import RestaurantCard from '../../components/restaurantCard';
import Categories from '../../components/categories';
import { GetStaticProps } from 'next';
import { Divider, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from '../../store/store';
import { getUserState, setEmail, setName, setToken } from '../../store/slices/userSlice';


const CustomerHome: React.FC = () => {

    const dispatch = useDispatch();
    const { name, email, token } = useSelector(getUserState);

    console.log(token)



    const [restaurantList, setRestaurantList] = useState<IRestaurant[]>([]);

    useEffect(() => {
        getRestaurants(token).then(res => {
            setRestaurantList(res);
        }
        )
    }, []);

    return (
        <Layout authentified>
            <main suppressHydrationWarning>
                <div className={styles.categories}>
                    <Categories />

                </div>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <div className={styles.global}>

                            <section suppressHydrationWarning>
                                <Typography variant="h4" className={styles.sectionTitle}>
                                    Offers
                                </Typography>
                                {
                                    restaurantList.map(({ _id, name, img, offer }: IRestaurant) => {
                                        if (offer === 'true') {
                                            return (
                                                <RestaurantCard key={_id} id={_id} name={name} img={img} offer={offer} />
                                            )
                                        }
                                    })
                                }
                            </section>
                            <Divider />
                            <section suppressHydrationWarning>
                                <Typography variant="h4" className={styles.sectionTitle}>
                                    Restaurants
                                </Typography>
                                {
                                    restaurantList.map(({ _id, name, img, offer }: IRestaurant) => {
                                        if (offer === 'false') {
                                            return (
                                                <RestaurantCard key={_id} id={_id} name={name} img={img} offer={offer} />
                                            )
                                        }
                                    })
                                }
                            </section>

                        </div>
                    </Grid>
                </Grid>
            </main>
        </Layout>
    );
}



export default CustomerHome;