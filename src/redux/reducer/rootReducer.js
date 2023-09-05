import { combineReducers } from 'redux';
import FormSearchReducer from './FormSearchReducer';
import PassengersReducer from './PassengersReducer';
import SelectFightReducer from './SelectFightReducer';

const rootReducer = combineReducers({
    formsearch: FormSearchReducer,
    passengers: PassengersReducer,
    selectfight: SelectFightReducer
});

export default rootReducer;