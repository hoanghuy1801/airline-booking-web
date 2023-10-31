import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    selectFlightCheckIn: null,
    selectPassengers: null,
    seatCheckin: null,
    dataCheckIn: null
}
const checkIn = createSlice({
    name: 'checkIn',
    initialState,
    reducers: {
        setSelectFlightCheckIn: (state, action) => {
            state.selectFlightCheckIn = action.payload
        },
        setSelectPassengers: (state, action) => {
            state.selectPassengers = action.payload
        },
        setSeatCheckin: (state, action) => {
            state.seatCheckin = action.payload
        },
        setDataCheckIn: (state, action) => {
            state.dataCheckIn = action.payload
        }
    }
})

export const { setSelectFlightCheckIn, setSelectPassengers, setSeatCheckin, setDataCheckIn } = checkIn.actions
// Export reducer
export default checkIn.reducer
