import { combineReducers } from '@reduxjs/toolkit'
import homePageReducer from './reducers/homePageSlice'
import languageRducer from './reducers/languageSlice'
import booking from './reducers/booking'

// Store
const rootReducer = combineReducers({
    homePage: homePageReducer,
    language: languageRducer,
    flightSelect: booking
})

// Export
export default rootReducer
