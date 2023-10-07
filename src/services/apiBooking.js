import axios from "../utils/awiosCustomize";

const getListFlight = (sourceAirportId, destinationAirportId, departureDate, seatClass, numAdults, numChildren, numInfants) => {
    return axios.get(`api/v1/flight/search?sourceAirportId=${sourceAirportId}&destinationAirportId=${destinationAirportId}&departureDate=${departureDate}&seatId=${seatClass}&numAdults=${numAdults}&numChildren=${numChildren}&numInfants=${numInfants}`);
}

export {
    getListFlight
}