// Setting the user creds to local storage, and a logout that will clear local storage
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    // Is there user info in the local storage, than use it. If not, set it to null
    // Using pasre because it will be saved as a string, we need to parse it back to json object
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.userInfo = action.payload;
            // To string for local storage
            localStorage.setItem('userInfo', JSON.stringify(action.payload));
        }
    }
})

// Want to export this as an action so that we can call it/use it
export const { setCredentials } = authSlice.actions;

export default authSlice.reducer;

// Then we have to add this to store.js