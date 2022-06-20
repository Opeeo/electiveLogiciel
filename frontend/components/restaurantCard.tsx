import { NextPage } from "next";

interface IRestaurantCard {
    data: {
        id: number,
        name: String,
        img: String,
        rate: String,
        fav: boolean,
        offer: boolean
    }

}

const RestaurantCard: NextPage<IRestaurantCard> = ({ data }) => {

    return (<div> ... </div>);
}