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

    return { getToken, setToken, getUserId }
}

export default JWTManager()
