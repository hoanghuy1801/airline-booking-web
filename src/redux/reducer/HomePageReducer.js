
import { DATA_BOOKING } from '../action/HomePageAction';
const INITIAL_STATE = {
    data_booking: {
        roundTrip: '',
        adult: '',
        children: '',
        baby: ''
    }
};
const HomePageReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case DATA_BOOKING:
            return {
                ...state,
                data_booking: {
                    roundTrip: action?.payload?.roundTrip,
                    adult: action?.payload?.adult,
                    children: action?.payload?.children,
                    baby: action?.payload?.baby
                }

            };

        default: return state;
    }
};

export default HomePageReducer;