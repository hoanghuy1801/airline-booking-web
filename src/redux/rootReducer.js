import { combineReducers } from '@reduxjs/toolkit'
import homePageReducer from './reducers/homePageSlice'
import languageRducer from './reducers/languageSlice'
import booking from './reducers/booking'
import Auth from './reducers/Auth'
import myFlight from './reducers/myFlight'
import checkIn from './reducers/checkIn'

// Store
const rootReducer = combineReducers({
    homePage: homePageReducer,
    language: languageRducer,
    flightSelect: booking,
    Auth: Auth,
    myFlight: myFlight,
    checkIn: checkIn
})

// Export
export default rootReducer
