import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    token: 'abc',
};
const Auth = createSlice({
    name: 'Token',
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
        },
    },

})

export const { setToken } = Auth.actions;
// Export reducer
export default Auth.reducer;
