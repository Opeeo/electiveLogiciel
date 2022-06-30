//Page to see the basket of a customer

import { NextPage } from "next";
import Layout from "../../components/layout";

const Basket: NextPage = () => {
    return (
        <Layout authentified={true} home={false}>
            <div>
                <h1>Basket</h1>
            </div>
        </Layout>

    );
}

export default Basket;