

import actionTypes from './actionTypes'
const initialSate = {
    started: true,
    language: 'vi'

};
const appReducer = (state = initialSate, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_LANGUAE:

            return {
                ...state,
                language: action.language,
            };


        default: return state;
    }
};

export default appReducer;