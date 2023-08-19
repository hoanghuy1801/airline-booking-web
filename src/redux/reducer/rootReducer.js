import { combineReducers } from 'redux';

import userReducer from './userReducer';
import HomePage from '../../component/Home/HomePage';
import HomePageReducer from './HomePageReducer';

const rootReducer = combineReducers({
    homepage: HomePageReducer
});

export default rootReducer;