
import { DATA_PASSENGERS } from '../action/PassengersAction';
const INITIAL_STATE = {
    data_passengers: {
        inputLastName: '',
        inputFirstName: '',

    }
};
const PassengersReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case DATA_PASSENGERS:
            return {
                ...state,
                data_passengers: {
                    inputLastName: action?.payload?.inputLastName,
                    inputFirstName: action?.payload?.inputFirstName,
                }

            };

        default: return state;
    }
};

export default PassengersReducer;