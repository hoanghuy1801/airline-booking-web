
import axios from 'axios';



// NProgress.configure({
//     showSpinner: false,
//     trickleSpeed: 100,

//})

const instance = axios.create({
    baseURL: 'http://localhost:8008/',
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