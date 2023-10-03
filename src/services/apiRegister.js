import axios from "../utils/awiosCustomize";

const getCountries = () => {
    return axios.get('api/v1/app/countries');
}
const postRegister = (data) => {
    //  const data = new FormData();
    // data.append('firstName', firstName);
    // data.append('lastName', lastName);
    // data.append('dateOfBirth', dateOfBirth);
    // data.append('country', country);
    // data.append('gender', gender);
    // data.append('phoneNumber', phoneNumber);
    // data.append('gender', email);
    // data.append('phoneNumber', password);

    return axios.post('/api/v1/auth/register', data);
}

export {
    getCountries, postRegister
}