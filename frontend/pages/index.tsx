import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Navbar from '../components/navbar';
import { Button } from '@mui/material';
import { getAllRestaurants } from '../lib/restaurants';
import Layout from '../components/layout';
import RestaurantCard from '../components/restaurantCard';

const UnconnectedHome: NextPage = () => {
  return (
    <Layout home>
      <div className={styles.container}>
        <main className={styles.main}>
        </main>
      </div>
    </Layout>

  )
}

export default UnconnectedHome
