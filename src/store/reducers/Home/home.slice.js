import { createSlice } from "@reduxjs/toolkit"
import { homeTodo } from "./home.actions"

const initialState = {
    todos: [],
    loading: false
}

export const HomeSlice = createSlice({
    name: "todos",
    initialState,

    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(homeTodo.pending, state => {
                state.loading = true
            })
            .addCase(homeTodo.fulfilled, (state, action) => {
                state.todos = action.payload,
                state.loading = false
            })
            .addCase(homeTodo.rejected, state => {
                state.loading = false
            })
    }
})

export default HomeSlice.reducer