import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    bookingDetails: null,
    selectChangeFly: null,
    dataChangeFly: null,
    selectedFlyChange: null,
    totalChange: 0
}
const myFlight = createSlice({
    name: 'myFlight',
    initialState,
    reducers: {
        setBookingDetail: (state, action) => {
            state.bookingDetails = action.payload
        },
        setSelectChangeFly: (state, action) => {
            state.selectChangeFly = action.payload
        },
        setDataChangeFly: (state, action) => {
            state.dataChangeFly = action.payload
        },
        setSelectedFlyChange: (state, action) => {
            state.selectedFlyChange = action.payload
        },
        setTotalChange: (state, action) => {
            state.totalChange = action.payload
        }
    }
})

export const { setBookingDetail, setSelectChangeFly, setDataChangeFly, setTotalChange, setSelectedFlyChange } =
    myFlight.actions
// Export reducer
export default myFlight.reducer
