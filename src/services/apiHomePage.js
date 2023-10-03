
import axios from "../utils/awiosCustomize";

const getAirports = () => {
    return axios.get('api/v1/airport/all');
}
const getTickets = () => {
    return axios.get('api/v1/seat/all');
}


export {
    getAirports, getTickets
}