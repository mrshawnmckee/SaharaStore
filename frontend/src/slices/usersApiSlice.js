import { USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/auth`,
                method: 'POST',
                body: data,
            }),
        }),
        // THis communicates with the server side for logout
        logout: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: 'POST',
            }),
        }),
    }),
});

export const { useLoginMutation, useLogoutMutation } = usersApiSlice;