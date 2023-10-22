import axios from '../utils/awiosCustomize'

const getListFlight = (
    sourceAirportId,
    destinationAirportId,
    departureDate,
    seatClass,
    numAdults,
    numChildren,
    numInfants
) => {
    return axios.get(
        `api/v1/flight/search?sourceAirportId=${sourceAirportId}&destinationAirportId=${destinationAirportId}&departureDate=${departureDate}&seatId=${seatClass}&numAdults=${numAdults}&numChildren=${numChildren}&numInfants=${numInfants}`
    )
}
const getServiceAirline = (flightId, airlineId, seatId) => {
    return axios.get(`api/v1/service-option?flightId=${flightId}&airlineId=${airlineId}&seatId=${seatId}`)
}
const postVnPay = (data) => {
    return axios.post('/api/v1/payment/vnpay', data)
}
const postBooking = (data) => {
    return axios.post('/api/v1/booking', data)
}
const patchBooking = (data) => {
    return axios.patch('/api/v1/booking', data)
}

export { getListFlight, getServiceAirline, postVnPay, postBooking, patchBooking }
