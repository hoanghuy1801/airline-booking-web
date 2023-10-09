import axios from "../utils/awiosCustomize";

const getListFlight = (sourceAirportId, destinationAirportId, departureDate, seatClass, numAdults, numChildren, numInfants) => {
    return axios.get(`api/v1/flight/search?sourceAirportId=${sourceAirportId}&destinationAirportId=${destinationAirportId}&departureDate=${departureDate}&seatId=${seatClass}&numAdults=${numAdults}&numChildren=${numChildren}&numInfants=${numInfants}`);
}
const getServiceAirline = (flightId, airlineId, seatId) => {
    return axios.get(`api/v1/service-option?flightId=${flightId}&airlineId=${airlineId}&seatId=${seatId}`);
}

export {
    getListFlight,
    getServiceAirline
}