import axios from '../utils/awiosCustomize'

const getBookingDetails = (bookingCode, firstName, lastName) => {
    return axios.get(`api/v1/booking?bookingCode=${bookingCode}&firstName=${firstName}&lastName=${lastName}`)
}

export { getBookingDetails }
