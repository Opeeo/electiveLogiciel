import axios from 'axios';

export interface IArticle {
    _id: string;
    name: string;
    price: number;
}


//Get all articles with axios typescript
export const getArticles = async () => {
    const response = await axios.get('http://localhost:8080/api/article/');
    const data: IArticle[] = response.data;
    return data;
}

//Get all articles with restaurant id with axios typescript
export const getArticlesByRestaurant = async (id: string) => {
    const response = await axios.get(`http://localhost:8080/api/restaurant/article/${id}`);
    const data: IArticle[] = response.data;
    return data;
}

