import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
	homePageInfor: null,
};
const homePageSlice = createSlice({
	name: 'homePage',
	initialState,
	reducers: {
		setHomPageInfor: (state, action) => {
			state.homePageInfor = action.payload;
		},
	},

})


export const { setHomPageInfor } = homePageSlice.actions;
// Export reducer
export default homePageSlice.reducer;
