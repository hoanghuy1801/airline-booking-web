import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    InforEmployee: '',
    isAuthenticatedEmployee: false,
    employeeById: null
}
const Admin = createSlice({
    name: 'Admin',
    initialState,
    reducers: {
        setInforEmployee: (state, action) => {
            state.InforEmployee = action.payload
        },
        setIsAuthenticatedEmployee: (state, action) => {
            state.isAuthenticatedAdmin = action.payload
        },
        setEmployeeById: (state, action) => {
            state.employeeById = action.payload
        }
    }
})

export const { setInforEmployee, setIsAuthenticatedEmployee, setEmployeeById } = Admin.actions
// Export reducer
export default Admin.reducer
