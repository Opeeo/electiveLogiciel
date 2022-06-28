//Home page for restaurer
import { NextPage } from "next";
import Layout from "../../components/layout";


const Home: NextPage = () => {
    return (
        <Layout authentified={true} home={true}>
            <div>
                <h1>Home</h1>
            </div>
        </Layout>

    );
}


export default Home;