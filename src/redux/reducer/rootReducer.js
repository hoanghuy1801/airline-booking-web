import { combineReducers } from 'redux';
import FormSearchReducer from './FormSearchReducer';
import PassengersReducer from './PassengersReducer';

const rootReducer = combineReducers({
    formsearch: FormSearchReducer,
    passengers: PassengersReducer
});

export default rootReducer;