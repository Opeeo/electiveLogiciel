import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { NextPage } from 'next';
import { useDispatch, useSelector } from '../store/store';
import { getCartState, addArticle, deleteAllArticle, deleteArticle } from '../store/slices/cartSlice';
import { isNumberObject } from 'util/types';
import { IArticle } from '../lib/articles';

export interface IArticleCardProps {
    name: string;
    price: number;
    id: string;
    isCart: boolean;
    positionInMap: number;
    cardClass: string;
}

const ArticleCard: NextPage<IArticleCardProps> = ({ name, price, id, isCart, positionInMap, cardClass }) => {


    const { articles } = useSelector(getCartState);
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        console.log('add to cart ' + id);
        const article: IArticle = {
            _id: id,
            name: name,
            price: price,
        }
        dispatch(addArticle(article));
    }

    const handleDeletefromCart = () => {
        console.log('add to cart ' + id);
        dispatch(deleteArticle(positionInMap));
    }

    return (
        <Card style={{ width: cardClass == 'smCard' ? 200 : 345, height: cardClass == 'smCard' ? 160 : 285, display: 'inline-block', margin: '10px' }}>
            <CardMedia
                component="img"
                height={cardClass == 'smCard' ? 50 : 140}
                image="https://mui.com/static/images/cards/paella.jpg"
                alt="paella"
            />
            <CardContent style={{ height: cardClass == 'smCard' ? 60 : 100 }}>
                {cardClass == 'smCard' && <Typography gutterBottom variant="subtitle2" component="div">{name}</Typography>}
                {cardClass == 'xlCard' && <Typography gutterBottom variant="h5" component="h2">{name}</Typography>}
                <Typography variant="body2" color="text.secondary">
                    {price}
                </Typography>
            </CardContent>
            <CardActions>
                {!isCart && <Button style={{ width: cardClass == 'smCard' ? 30 : 50, fontSize: 10, backgroundColor: '#59BD5A' }} variant='contained' onClick={handleAddToCart}>Add +</Button>}
                {isCart && <Button style={{ width: cardClass == 'smCard' ? 30 : 50, fontSize: 10, backgroundColor: '#59BD5A' }} variant='contained' onClick={handleDeletefromCart}>Delete</Button>}
            </CardActions>
        </Card>
    );
}

export default ArticleCard;