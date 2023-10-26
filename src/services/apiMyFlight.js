import axios from '../utils/awiosCustomize'

const getBookingDetails = (bookingCode, firstName, lastName) => {
    return axios.get(`api/v1/booking?bookingCode=${bookingCode}&firstName=${firstName}&lastName=${lastName}`)
}
const postAddService = (data) => {
    return axios.post('/api/v1/booking/add-service', data)
}

export { getBookingDetails, postAddService }
