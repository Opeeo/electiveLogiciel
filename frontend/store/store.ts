import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';
import {
    useDispatch as useDispatchBase,
    useSelector as useSelectorBase,
} from 'react-redux';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import cartSlice from './slices/cartSlice';

const reducers = combineReducers({
    user: userSlice,
    cart: cartSlice,
});

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk],
});


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: { users: UsersState}
type AppDispatch = typeof store.dispatch;

// Since we use typescript, lets utilize `useDispatch`
export const useDispatch = () => useDispatchBase<AppDispatch>();

// And utilize `useSelector`
export const useSelector = <TSelected = unknown>(
    selector: (state: RootState) => TSelected
): TSelected => useSelectorBase<RootState, TSelected>(selector);