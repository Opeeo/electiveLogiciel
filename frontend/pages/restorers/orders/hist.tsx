//Page to see all the orders of a restaurer
import { NextPage } from "next";
import Dashboard from "../../../components/dashboard";
import Layout from "../../../components/layoutDashboard";
import OrderListAccepted from "../../../components/orderHistRestaurant";
import OrderList from "../../../components/orderRestaurant";


const Hist: NextPage = () => {
    return (
        <Layout authentified={true} home={false}>
            <div>
                <h1>Commandes</h1>
            </div>
            <OrderList restaurantId={"62b95b73b5595196811d0901"}/>
            <OrderListAccepted restaurantId={"62b95b73b5595196811d0901"}/>
        </Layout>

    );
}


export default Hist;