import { createAsyncThunk } from '@reduxjs/toolkit'
import { EditService } from '../../../services/HomeService/update.service'

export const EditTodo = createAsyncThunk('edit/todo', async thunkAPI => {
  try {
    const data = await EditService.editTask(id)
    return data
  }
    catch (error) {
    return error
    }
})