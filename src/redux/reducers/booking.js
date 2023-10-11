import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit'

const initialState = {
    flightSelect: '',
    flightSelectReturn: '',
    totalflight: 0,
    infoPassengers: '',
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
        setInfoPassengers: (state, action) => {
            state.infoPassengers = action.payload;
        },
    },

})

export const { setflightSelect, setflightSelectReturn, settotalflight, setInfoPassengers } = booking.actions;
// Export reducer
export default booking.reducer;
