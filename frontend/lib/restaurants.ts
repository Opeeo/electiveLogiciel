import restaurants from '../products/products.json';
import axios from 'axios';
var restaurantscp = restaurants

export interface IRestaurant {
    _id: string;
    name: string;
    img: string;
    rate: string;
    fav: string;
    offer: string;
}


//Get all restaurants with axios typescript
export const getRestaurants = async () => {
    console.log('here');

    const response = await axios.get('http://localhost:8080/api/restaurant/');
    const data: IRestaurant[] = response.data;
    return data;
}

//Get one restaurant with axios typescript
export const getRestaurant = async (id: string | string[] | undefined) => {
    //If id is undefined, return error
    if (!id) {
        throw new Error('No id provided');
    }
    const response = await axios.get(`http://localhost:8080/api/restaurant/${id}`);
    return response.data;
}

//Get all restaurants id with axios typescript
export const getRestaurantsId = async () => {
    const response = await axios.get('http://localhost:8080/api/restaurant/');
    const data: IRestaurant[] = response.data;
    return data.map((restaurant: IRestaurant) => {
        return {
            params: {
                id: restaurant._id,
            },
        };
    });
}

//Delete a restaurant with axios typescript
export const deleteRestaurant = async (id: string): Promise<IRestaurant> => {
    const response = await axios.delete(`http://localhost:8080/api/restaurant/${id}`);
    return response.data;
}

//Update a restaurant with axios typescript
export const updateRestaurant = async (id: string, restaurant: IRestaurant): Promise<IRestaurant> => {
    const response = await axios.put(`http://localhost:8080/api/restaurant/${id}`, restaurant);
    return response.data;
}
