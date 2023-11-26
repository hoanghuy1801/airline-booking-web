import axios from '../utils/awiosCustomize'

const getBookingDetails = (data) => {
    return axios.get('api/v1/booking', {
        params: data
    })
}
const postAddService = (data) => {
    return axios.post('/api/v1/booking/add-service', data)
}
const posstCheckIn = (data) => {
    return axios.post('/api/v1/check-in', data)
}
const getMyBooking = (status, data) => {
    return axios.get(`api/v1/booking/my-booking/${status}`, {
        params: data
    })
}
export { getBookingDetails, postAddService, posstCheckIn, getMyBooking }
