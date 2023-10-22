import axios from '../utils/awiosCustomize'

const getCountries = () => {
    return axios.get('api/v1/app/countries')
}
const postRegister = (data) => {
    return axios.post('api/v1/auth/register', data)
}
const postVerifyOTP = (otp) => {
    return axios.post(`api/v1/auth/verify?otp=${otp}`)
}
const postSendOTP = () => {
    return axios.post('api/v1/auth/send-otp')
}
const postLogin = (data) => {
    return axios.post('api/v1/auth/login', data)
}
const getInforUser = () => {
    return axios.get('api/v1/auth/info')
}
const postSendPhoneOTP = (id, phone) => {
    return axios.post(`api/v1/auth/send-opt-booking?bookingId=${id}&phoneNumber=${phone}`)
}
const postVerifyPhoneOTP = (id, otp) => {
    return axios.post(`api/v1/auth/verify-opt-booking?bookingId=${id}&otp=${otp}`)
}

export {
    getCountries,
    postRegister,
    postVerifyOTP,
    postSendOTP,
    postLogin,
    getInforUser,
    postVerifyPhoneOTP,
    postSendPhoneOTP
}
