import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    token: 'abc',
    InfoRegister: ''
};
const Auth = createSlice({
    name: 'Token',
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
        },
        setInfoRegister: (state, action) => {
            state.InfoRegister = action.payload;
        },
    },

})

export const { setToken, setInfoRegister } = Auth.actions;
// Export reducer
export default Auth.reducer;
