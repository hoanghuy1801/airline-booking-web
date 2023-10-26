import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    bookingDetails: null,
    selectChangeFly: null,
    dataChangeFly: null,
    selectedFlyChange: null,
    totalChange: 0,
    dataPassengersService: null,
    dataPassengersServiceReturn: null,
    changeService: false
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
        },
        setDataPassengersService: (state, action) => {
            state.dataPassengersService = action.payload
        },
        setDataPassengersServiceReturn: (state, action) => {
            state.dataPassengersServiceReturn = action.payload
        },
        setChangeService: (state, action) => {
            state.changeService = action.payload
        }
    }
})

export const {
    setBookingDetail,
    setSelectChangeFly,
    setDataChangeFly,
    setTotalChange,
    setSelectedFlyChange,
    setDataPassengersService,
    setDataPassengersServiceReturn,
    setChangeService
} = myFlight.actions
// Export reducer
export default myFlight.reducer
