//Home page for restaurer
import { NextPage } from "next";
import Grid from '@mui/material/Grid';
import Item from '@mui/material/Grid';
import Button from '@mui/material/Button';
import styles from "../../styles/Home.module.css";
import Layout from "../../components/layout";
import Dashboard from '../../components/dashboard';


const Home: NextPage = () => {
    return (
        <Layout authentified={true} home={true}>
            <div>
                <h1>For merchants</h1>
            </div>          
        </Layout>

    );
}


export default Home;