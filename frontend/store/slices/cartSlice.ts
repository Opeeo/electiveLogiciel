import { Article } from '@mui/icons-material';
import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';
import { log } from 'console';
import { IArticle } from '../../lib/articles';

export interface CartState {
    articles: IArticle[];
    restaurantId: string;
}

/**
 * Default state object with initial values.
 */
var initialState: any = {
    articles: [],
    restaurantId: '',
};

/**
 * Create a slice as a reducer containing actions.
 *
 * In this example actions are included in the slice. It is fine and can be
 * changed based on your needs.
 */
export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addArticle: (
            state: Draft<typeof initialState>,
            action: PayloadAction<typeof initialState.articles>
        ) => {
            state.articles.push(action.payload);
        },
        deleteAllArticle: (
            state: Draft<typeof initialState>,
        ) => {
            state.articles = [];
        },
        deleteArticle: (
            state: Draft<typeof initialState>,
            action: PayloadAction<typeof initialState.articles>
        ) => {
            //find index of article
            console.log(action.payload);
            state.articles.splice(action.payload, 1);
        },
        setRestaurant: (
            state: Draft<typeof initialState>,
            action: PayloadAction<typeof initialState.restaurantId>
        ) => {
            if (action.payload !== state.restaurantId) {
                state.articles = [];
            }
            state.restaurantId = action.payload;
        },
    },
});

// A small helper of user state for `useSelector` function.
export const getCartState = (state: { cart: CartState }) => state.cart;

// Exports all actions
export const { addArticle, deleteAllArticle, deleteArticle, setRestaurant } = cartSlice.actions;

export default cartSlice.reducer;