import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    bookingDetails: null
}
const myFlight = createSlice({
    name: 'myFlight',
    initialState,
    reducers: {
        setBookingDetail: (state, action) => {
            state.bookingDetails = action.payload
        }
    }
})

export const { setBookingDetail } = myFlight.actions
// Export reducer
export default myFlight.reducer
