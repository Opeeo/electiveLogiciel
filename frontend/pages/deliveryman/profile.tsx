//Profile page for deliveryman


import { NextPage } from "next";
import Layout from "../../components/layout";


const Profile: NextPage = () => {
    return (
        <Layout authentified={true} home={false}>
            <div>
                <h1>Profile</h1>
            </div>
        </Layout>
    );
}


export default Profile;