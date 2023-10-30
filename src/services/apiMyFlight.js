import axios from '../utils/awiosCustomize'

const getBookingDetails = (bookingCode, firstName, lastName) => {
    return axios.get(`api/v1/booking?bookingCode=${bookingCode}&firstName=${firstName}&lastName=${lastName}`)
}
const postAddService = (data) => {
    return axios.post('/api/v1/booking/add-service', data)
}
const posstCheckIn = (data) => {
    return axios.post('/api/v1/check-in', data)
}

export { getBookingDetails, postAddService, posstCheckIn }
