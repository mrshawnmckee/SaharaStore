// round the num to two decimal places
export const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
}


export const updateCart = (state) =>{
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

    return state;

}