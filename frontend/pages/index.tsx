import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';
import Layout from '../components/layout';
import RestaurantCard from '../components/restaurantCard';

const UnconnectedHome: NextPage = () => {
  return (
    <Layout authentified={false} home={true}>
      <div className={styles.container}>
        <main className={styles.main}>
        </main>
      </div>
    </Layout>
  )
}

export default UnconnectedHome
