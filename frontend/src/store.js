// THis is the entry point of redux
// Files concerning redux: store.js, constants.js, Provider in Index.js, slices folder, apiSlice.js
import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './slices/apiSlice';

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
});

export default store;