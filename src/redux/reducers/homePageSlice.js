import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit'
import axios from 'axios'

// export const getTodos = createAsyncThunk('todos/todosFetched', async () => {
// 	const res = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5');
// 	return res.data
// })

// export const addTodo = createAsyncThunk('todos/add', async title => {
// 	const newTodo = {
// 		id: nanoid(),
// 		title,
// 		completed: false
// 	}
// 	await axios.post('https://jsonplaceholder.typicode.com/todos?', newTodo);

// 	return newTodo
// })
// export const deleteTodo = createAsyncThunk('todos/delete', async todoId => {
// 	await axios.delete(`https://jsonplaceholder.typicode.com/todos/${todoId}`);
// 	return todoId
// })
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
	// extraReducers: {
	// 	//get all
	// 	[getTodos.pending]: (state, action) => {
	// 		console.log("fectch")
	// 	},
	// 	[getTodos.fulfilled]: (state, action) => {
	// 		console.log('done')
	// 		state.allTodos = action.payload
	// 	},
	// 	[getTodos.rejected]: (state, action) => {
	// 		console.log('fail')
	// 	},
	// 	// add todo
	// 	[addTodo.fulfilled]: (state, action) => {
	// 		console.log('done')
	// 		state.allTodos.unshift(action.payload)
	// 	},

	// 	//delete
	// 	[deleteTodo.fulfilled]: (state, action) => {
	// 		const todoId = action.payload
	// 		state.allTodos = state.allTodos.filter(todo => todo.id !== todoId)
	// 	},
	// }
})
// Reducer
// const todosReducer = todosSlice.reducer

// // Selector
// export const todosSelector = state => state.todosReducer.allTodos

// //action
// export const { markComplete } = todosSlice.actions

export const { setHomPageInfor } = homePageSlice.actions;
// Export reducer
export default homePageSlice.reducer;
