import axios from "../utils/awiosCustomize";

const getCountries = () => {
    return axios.get('api/v1/app/countries');
}
const postRegister = (data) => {
    return axios.post('/api/v1/auth/register', data);
}

export {
    getCountries, postRegister
}