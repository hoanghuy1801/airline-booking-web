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
const postVerifyPhoneOTPUpdate = (id, otp) => {
    return axios.post(`api/v1/auth/verify-opt-booking/update?bookingId=${id}&otp=${otp}`)
}
const postVerifyPhoneOTPCancel = (id, otp) => {
    return axios.post(`api/v1/auth/verify-opt-booking/cancel?bookingId=${id}&otp=${otp}`)
}
const postChangePassword = (data) => {
    return axios.post('api/v1/auth/change-password', data)
}

export {
    getCountries,
    postRegister,
    postVerifyOTP,
    postSendOTP,
    postLogin,
    getInforUser,
    postVerifyPhoneOTPUpdate,
    postVerifyPhoneOTPCancel,
    postSendPhoneOTP,
    postChangePassword
}
