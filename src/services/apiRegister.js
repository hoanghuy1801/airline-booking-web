import axios from "../utils/awiosCustomize";

const getCountries = () => {
    return axios.get('api/v1/app/countries');
}
const postRegister = (data) => {
    return axios.post('/api/v1/auth/register', data);
}
const postVerifyOTP = (otp) => {
    return axios.post(`/api/v1/auth/verify?otp=${otp}`);
}

export {
    getCountries, postRegister, postVerifyOTP
}