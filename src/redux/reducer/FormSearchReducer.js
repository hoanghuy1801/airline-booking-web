
import { DATA_BOOKING } from '../action/FormSearch';
const INITIAL_STATE = {
    data_booking: {
        roundTrip: '',
        sourceAirport: '',
        destinationAirport: '',
        departureDate: '',
        seatClass: '',
        adult: '',
        children: '',
        baby: '',
        destinationAirportCity: '',
        sourceAirportCity: '',
        returnDate: '',
    }
};
const HomePageReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case DATA_BOOKING:
            return {
                ...state,
                data_booking: {
                    roundTrip: action?.payload?.roundTrip,
                    sourceAirport: action?.payload?.sourceAirport,
                    destinationAirport: action?.payload?.destinationAirport,
                    departureDate: action?.payload?.departureDate,
                    seatClass: action?.payload?.seatClass,
                    adult: action?.payload?.adult,
                    children: action?.payload?.children,
                    baby: action?.payload?.baby,
                    destinationAirportCity: action?.payload?.destinationAirportCity,
                    sourceAirportCity: action?.payload?.sourceAirportCity,
                    returnDate: action?.payload?.returnDate

                }

            };

        default: return state;
    }
};

export default HomePageReducer;