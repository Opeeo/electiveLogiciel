//Page to see all the orders of a restaurer
import { NextPage } from "next";
import Dashboard from "../../../components/dashboard";
import Layout from "../../../components/layout";
import OrderListAccepted from "../../../components/order_accpeted";
import OrderList from "../../../components/order";


const Hist: NextPage = () => {
    return (
        <Layout authentified={true} home={false}>
            <Dashboard>
                <div>
                    <h1>Commandes</h1>
                </div>
                <OrderList restaurantId={"62b95b73b5595196811d0901"}/>
                <OrderListAccepted restaurantId={"62b95b73b5595196811d0901"}/>
            </Dashboard>

        </Layout>

    );
}


export default Hist;