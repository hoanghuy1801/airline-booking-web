import axios from 'axios'
import jwt from './jwt'

// NProgress.configure({
//     showSpinner: false,
//     trickleSpeed: 100,

//})

const instance = axios.create({
    baseURL: 'http://localhost:8008'
})

instance.interceptors.request.use((config) => {
    // Lấy ngôn ngữ từ localStorage hoặc từ ngôn ngữ mặc định
    const language = localStorage.getItem('language') || 'vi'

    // Thêm header 'Accept-Language'
    config.headers['Accept-Language'] = language

    if (!config.headers['Content-Type']) {
        config.headers['Content-Type'] = 'application/json'
    }
    config.headers['X-Request-Source'] = 'web' // Thay 'your-source-value' bằng giá trị thích hợp

    // Thêm header "Authorization"
    if (jwt.getToken()) {
        config.headers['Authorization'] = `Bearer ${jwt.getToken()}`
    }

    return config
})

export default instance
