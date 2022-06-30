//Page to see a specific order of a deliveryman


import { NextPage } from "next";
import Layout from "../../../components/layout";


const Order: NextPage = () => {
    return (
        <Layout authentified={true} home={false}>
            <div>
                <h1>Order</h1>
            </div>
        </Layout>

    );
}


export default Order;
