import { combineReducers } from '@reduxjs/toolkit'
import homePageReducer from './reducers/homePageSlice'
import languageRducer from './reducers/languageSlice'
import booking from './reducers/booking'
import Auth from './reducers/Auth'

// Store
const rootReducer = combineReducers({
    homePage: homePageReducer,
    language: languageRducer,
    flightSelect: booking,
    Auth: Auth
})

// Export
export default rootReducer
