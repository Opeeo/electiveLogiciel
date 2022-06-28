import { NextPage } from "next";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import Typography from '@mui/material/Typography';
import styles from '../styles/Restaurants.module.css'
interface IRestaurantCard {
    id: string,
    name: string,
    img: string,
    rate: String,
    fav: string,
    offer: string
}

const RestaurantCard: NextPage<IRestaurantCard> = ({ id, name, img, rate, fav, offer }) => {

    return (
        <Card className={styles.restaurantCard} >
            <CardActionArea href={'/customers/restaurant/' + id}>
                <CardMedia
                    component="img"
                    height="140"
                    image={img}
                    alt={id}
                />
                <CardContent>
                    <Typography className={styles.typoTitle}>
                        {name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {rate}, {fav}, {offer}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default RestaurantCard