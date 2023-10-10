
import axios from 'axios';
import { useSelector } from 'react-redux';
import jwt from './jwt';


// NProgress.configure({
//     showSpinner: false,
//     trickleSpeed: 100,

//})

const instance = axios.create({
    baseURL: 'http://localhost:8008/',
});

instance.interceptors.request.use(config => {
    // Lấy ngôn ngữ từ localStorage hoặc từ ngôn ngữ mặc định
    const language = localStorage.getItem('language') || 'vi';

    // Thêm header 'Accept-Language'
    config.headers['Accept-Language'] = language;

    if (!config.headers['Content-Type']) {
        config.headers['Content-Type'] = 'application/json';
    }
    config.headers['X-Request-Source'] = 'web'; // Thay 'your-source-value' bằng giá trị thích hợp

    // Thêm header "Authorization"
    config.headers['Authorization'] = `Bearer ${jwt.getToken()}`;

    return config;
});

// instance.interceptors.request.use(function (config) {
//     // Do something before request is sent

//     const access_token = store?.getState().user.account.access_token;
//     config.headers.Authorization = `Bearer ${access_token}`;
//     NProgress.start();

//     return config;
// }, function (error) {
//     // Do something with request error
//     return Promise.reject(error);
// });

// // Add a response interceptor
// instance.interceptors.response.use(function (response) {
//     // Any status code that lie within the range of 2xx cause this function to trigger
//     // Do something with response data
//     NProgress.done();
//     return response && response.data ? response.data : response;
// }, function (error) {
//     // Any status codes that falls outside the range of 2xx cause this function to trigger
//     // Do something with response error
//     return error && error.response && error.response.data ? error.response.data : Promise.reject(error);
// });

export default instance;