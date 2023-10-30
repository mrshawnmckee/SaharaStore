// THis is the entry point of redux
// Files concerning redux: store.js, constants.js, Provider in Index.js, slices folder, apiSlice.js, productsApiSlice
// cartSlice.js, authSLice
//Taking productsapi slice into homescreen

import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './slices/apiSlice';
import cartSliceReducer from './slices/cartSlice'
import authSliceReducer from './slices/authSlice';

const store = configureStore({
    // Global reducer
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        cart: cartSliceReducer,
        auth: authSliceReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
});

export default store;