const JWTManager = () => {
    let inMemoryToken = null
    let userId = ''

    const getToken = () => inMemoryToken
    const getUserId = () => userId

    const setToken = (accessToken) => {
        inMemoryToken = accessToken
        // decode and set countdown to refresh
        // const decoded = jwtDecode(accessToken)
        // userId = decoded._id
        // //  setRefreshTokenTimeOut(Number(decoded.exp) - Number(decoded.iat));
        localStorage.setItem('accessToken', inMemoryToken)
    }
    const deleteToken = () => {
        // decode and set countdown to refresh
        // const decoded = jwtDecode(accessToken)
        // userId = decoded._id
        // //  setRefreshTokenTimeOut(Number(decoded.exp) - Number(decoded.iat));
        localStorage.removeItem('accessToken') // Th
    }

    return { getToken, setToken, getUserId, deleteToken }
}

export default JWTManager()
