import { apiSlice } from './apiSlice';
import { ORDERS_URL } from '../constants';

// Injecting the enpoints into the apiSLice, which is connected to store in apislice reducerPth
export const orderApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (order) => ({
                url: ORDERS_URL,
                method: 'POST',
                body: {...order}
            }),
        }),
        getOrderDetails: builder.query({
            query: (orderId) => ({
                url: `${ORDERS_URL}/${orderId}`,
            }),
            keepUnusedDataFor: 5,
        }),
    }),
});

export const { useCreateOrderMutation, useGetOrderDetailsQuery } = orderApiSlice;