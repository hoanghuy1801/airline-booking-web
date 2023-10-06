import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit'


const languageSlice = createSlice({
    name: 'languageSlice',
    initialState: {
        language: 'vi',
    },
    reducers: {
        setLanguage: (state, action) => {
            state.language = action.payload;
        },
    },
});



export const { setLanguage } = languageSlice.actions;

export default languageSlice.reducer;
