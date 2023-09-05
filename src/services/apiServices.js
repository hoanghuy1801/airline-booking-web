
import axios from "../utils/awiosCustomize";

const postLogin = (email, password) => {
    return axios.post('api/v1/login', { email, password });
}
const getAirports = () => {
    return axios.get('api/v1/airport/all');
}
const getTickets = () => {
    return axios.get('api/v1/seat/all');
}
const getListByCondition = (sourceAirportId, destinationAirportId, departureDate, seatClass, numAdults, numChildren, numInfants) => {
    return axios.get(`api/v1/flight/search?sourceAirportId=${sourceAirportId}&destinationAirportId=${destinationAirportId}&departureDate=${departureDate}&seatClass=${seatClass}&numAdults=${numAdults}&numChildren=${numChildren}&numInfants=${numInfants}`);
}

export {
    postLogin, getAirports, getTickets, getListByCondition
}