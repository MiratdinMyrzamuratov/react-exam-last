import { createSlice } from '@reduxjs/toolkit'
import { EditTodo } from './update.actions'

const initialState = {
  todo: {},
  loading: false,
}

export const EditTask = createSlice({
  name: 'edit',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(EditTodo.pending, state => {
        state.loading = true
      })
      .addCase(EditTodo.fulfilled, (state, action) => {
        state.todo = action.payload
        state.loading = false
      })
      .addCase(EditTodo.rejected, state => {
        state.loading = false
      })
  },
})

export default EditTask.reducer