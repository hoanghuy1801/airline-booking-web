
import axios from "../utils/awiosCustomize";

const postLogin = (email, password) => {
    return axios.post('api/v1/login', { email, password });
}
const getAirports = () => {
    return axios.get('api/v1/airport/all');
}
const getTickets = () => {
    return axios.get('api/v1/ticket/all');
}

export {
    postLogin, getAirports, getTickets
}