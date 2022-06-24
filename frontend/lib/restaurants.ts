import restaurants from '../products/products.json';

var restaurantscp = restaurants

export interface IRestaurant {
    id: string;
    name: string;
    img: string;
    rate: string;
    fav: string;
    offer: string;
}

//Get all restaurants with axios typescript
export function getAllRestaurants(): IRestaurant[] {
    return restaurantscp;
    //return axios.get("/api/restaurants")
    //    .then(response => response.data);
}

//Get one restaurant with axios typescript
export function getRestaurantById(id: string): IRestaurant | undefined {
    return restaurants.find(restaurant => restaurant.id === id);
    //return axios.get(`/api/restaurants/${id}`)
    //    .then(response => response.data);
}

//Delete a restaurant with axios typescript
export function deleteRestaurantById(id: string): void {
    restaurantscp = restaurants.filter(restaurant => restaurant.id !== id);
    //axios.delete(`/api/restaurants/${id}`);
}

//Update a restaurant with axios typescript
export function updateRestaurantById(id: string, restaurant: IRestaurant): void {
    restaurantscp = restaurants.map(restaurant => restaurant.id === id ? restaurant : restaurant);
    //axios.put(`/api/restaurants/${id}`, restaurant);
}