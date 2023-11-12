import axios from '../utils/awiosCustomize'

const getListAircraft = (data) => {
    return axios.get('/api/v1/aircraft', {
        params: data
    })
}
const getInforEmployee = () => {
    return axios.get('/api/v1/employee/info')
}
const createEmpolyee = (data) => {
    return axios.post('/api/v1/employee', data)
}
const getListEmployee = (data) => {
    return axios.get('/api/v1/employee', {
        params: data
    })
}
const getListFlight = (status, data) => {
    return axios.get(`/api/v1/flight/${status}`, {
        params: data
    })
}
const createFlight = (data) => {
    return axios.post('/api/v1/flight', data)
}
const actEmployee = (id) => {
    return axios.patch(`api/v1/employee/open/${id}`)
}
const penEmployee = (id) => {
    return axios.patch(`/api/v1/employee/${id}`)
}
const delEmployee = (id) => {
    return axios.delete(`/api/v1/employee/${id}`)
}
const getEmployeeId = (id) => {
    return axios.get(`/api/v1/employee/${id}`)
}
const editEmployee = (id, data) => {
    return axios.put(`/api/v1/employee/${id}`, data)
}
const changeStatusFlight = (id, status) => {
    return axios.patch(`/api/v1/flight/${id}?status=${status}`)
}
const getFlightId = (id) => {
    return axios.get(`/api/v1/flight/id/${id}`)
}
const editFlight = (id, data) => {
    return axios.put(`/api/v1/flight/${id}`, data)
}

export {
    getListAircraft,
    getInforEmployee,
    createEmpolyee,
    getListEmployee,
    createFlight,
    getListFlight,
    actEmployee,
    penEmployee,
    delEmployee,
    getEmployeeId,
    editEmployee,
    changeStatusFlight,
    getFlightId,
    editFlight
}
