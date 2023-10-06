import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    flightSelect: '',
    flightSelectReturn: '',
    totalflight: 0,
};
const booking = createSlice({
    name: 'flightSelect',
    initialState,
    reducers: {
        setflightSelect: (state, action) => {
            state.flightSelect = action.payload;
        },
        setflightSelectReturn: (state, action) => {
            state.flightSelectReturn = action.payload;
        },
        settotalflight: (state, action) => {
            state.totalflight = action.payload;
        },
    },

})

export const { setflightSelect, setflightSelectReturn, settotalflight } = booking.actions;
// Export reducer
export default booking.reducer;
