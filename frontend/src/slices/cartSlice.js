// Since the requests are not asychronous, we dont need apiSLice, we use createSlice
import { createSlice } from '@reduxjs/toolkit'

// Items will be stored in local storage, so that if we leave the site and come back, they will still be in the cart
// The localStorage.getItem("cart") checks for items in the cart, if not, it is an object cartitems with an empty array
const initialState = localStorage.getItem("cart") ? JSON.parse (localStorage.getItem("cart")) : {cartItems: []}

// round the num to two decimal places
const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
}

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

            //Calculate items price, acc set to zero after the acc+itemprice* qty item
            state.itemsPrice = addDecimals(state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0))

            //Calculate shipping price --if order > $100, shipping free, else shipping = $10
            state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);

            //Calculate tax price (15% tax)
            state.taxPrice = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2)));

            //Calculate total price
            state.totalPrice = (
                Number(state.itemsPrice) + 
                Number(state.shippingPrice) +
                Number(state.taxPrice)
            ).toFixed(2);

            // Save the total to local storage
            localStorage.setItem('cart', JSON.stringify(state));
        }
    },       //Any functions that have to do with the cart, ex add to cart, remove, etc

})

// import this to product screen
export const { addToCart } = cartSlice.actions;

// inport this into store
export default cartSlice.reducer;