import axios from '../utils/awiosCustomize'

const getListAircraft = (data) => {
    return axios.get('/api/v1/aircraft', {
        params: data
    })
}

export { getListAircraft }
