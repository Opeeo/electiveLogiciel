//Page to see an specific order

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