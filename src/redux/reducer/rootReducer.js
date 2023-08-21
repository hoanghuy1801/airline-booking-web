import { combineReducers } from 'redux';
import HomePageReducer from './HomePageReducer';
import PassengersReducer from './passengersReducer';

const rootReducer = combineReducers({
    homepage: HomePageReducer,
    passengers: PassengersReducer
});

export default rootReducer;