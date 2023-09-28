import { configureStore } from '@reduxjs/toolkit'
import homePageReducer from './reducers/homePageSlice'

// Store
const store = configureStore({
    reducer: {
        homePage: homePageReducer
    }
})

// Export
export default store
