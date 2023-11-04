import axios from '../utils/awiosCustomize'

const getAirports = () => {
    return axios.get('api/v1/airport/all')
}
const getTickets = () => {
    return axios.get('api/v1/seat/all')
}
const putPassenger = (data) => {
    return axios.put('api/v1/passenger/update', data)
}

export { getAirports, getTickets, putPassenger }
