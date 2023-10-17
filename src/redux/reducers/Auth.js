import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    token: 'abc',
    InfoRegister: '',
    InforUser: '',
    isAuthenticated: false
}
const Auth = createSlice({
    name: 'Token',
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload
        },
        setInfoRegister: (state, action) => {
            state.InfoRegister = action.payload
        },
        setInforUser: (state, action) => {
            state.InforUser = action.payload
        },
        setIsAuthenticated: (state, action) => {
            state.isAuthenticated = action.payload
        }
    }
})

export const { setToken, setInfoRegister, setInforUser, setIsAuthenticated } = Auth.actions
// Export reducer
export default Auth.reducer
