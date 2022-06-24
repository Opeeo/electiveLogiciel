import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';
import { Button } from '@mui/material';
import { getAllRestaurants } from '../lib/restaurants';
import Layout from '../components/layout';

const Home: NextPage = () => {
    return (
        <Layout authentified home>
            <div className={styles.container}>
                <main className={styles.main}>
                    <Button variant="contained" onClick={getAllRestaurants}>Test button</Button>
                </main>
            </div>
        </Layout>

    )
}

export default Home
