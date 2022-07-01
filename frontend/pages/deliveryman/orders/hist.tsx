//Page to see all the orders of a deliveryman


import { NextPage } from "next";
import Layout from "../../../components/layoutDeliveryman";
import OrderListAccepted from "../../../components/orderHistDelivery";
import OrderList from "../../../components/orderDelivery";


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