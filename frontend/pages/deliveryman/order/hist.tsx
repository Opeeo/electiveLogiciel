//Page to see all the orders of a deliveryman


import { NextPage } from "next";
import Layout from "../../../components/layout";


const Hist: NextPage = () => {
    return (
        <Layout authentified={true} home={false}>
            <div>
                <h1>Hist</h1>
            </div>
        </Layout>

    );
}


export default Hist;