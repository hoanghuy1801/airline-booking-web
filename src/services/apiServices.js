
import axios from "../utils/awiosCustomize";

const postLogin = (email, password) => {
    return axios.post('api/v1/login', { email, password });
}


export {
    postLogin,
}