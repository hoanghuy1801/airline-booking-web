import actionTypes from './actionTypes'
export const doLogin = (data) => {
    return {
        type: actionTypes.FETCH_USER_LOGIN_SUCCESS,
        payload: data
    }
}