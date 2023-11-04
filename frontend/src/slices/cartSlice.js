// Since the requests are not asychronous, we dont need apiSLice, we use createSlice
import { createSlice } from '@reduxjs/toolkit'
import { updateCart } from '../utils/cartUtils';

// Items will be stored in local storage, so that if we leave the site and come back, they will still be in the cart
// The localStorage.getItem("cart") checks for items in the cart, if not, it is an object cartitems with an empty array
const initialState = localStorage.getItem("cart") 
  ? JSON.parse (localStorage.getItem("cart")) 
: {cartItems: [], shippingAddress: {}, paymentMethod: 'PayPal'}



const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        // This will take two things: current state and action, data inside of a payload(action.payload)
        addToCart: (state, action) => {
            const item = action.payload;

            // Check to see if the item already exists in the cart
            const existItem = state.cartItems.find((x) => x._id === item._id);

            if (existItem) {
                state.cartItems = state.cartItems.map((x) => x._id === existItem._id ? item : x)
            } else {
                state.cartItems = [...state.cartItems, item];       //Adding the new item to the array
            }

            return updateCart(state)        //Update cart is in the utils file
           
        },
        removeFromCart: (state, action) => {
            // Returning the cart items that dont equal the one we want to delete
            state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);

            // Update local storage
            return updateCart(state);
        },
        saveShippingAddress: (state, action) => {
            state.shippingAddress = action.payload; 
            return updateCart(state);
        },
        savePaymentMethod: (state, action) => {
            state.paymentMethod = action.payload;
            return updateCart(state);
        },
        // Clear the cart after the order is created
        clearCartItems: (state, action) => {
            state.cartItems = [];       //set cartItems to empty array(clearing it), then update cart to that empty array
            return updateCart(state);
        }

    },       //Any functions that have to do with the cart, ex add to cart, remove, etc

})

// import this to product screen
export const { addToCart, 
    removeFromCart, 
    saveShippingAddress, 
    savePaymentMethod, 
    clearCartItems 
} = cartSlice.actions;

// inport this into store
export default cartSlice.reducer;