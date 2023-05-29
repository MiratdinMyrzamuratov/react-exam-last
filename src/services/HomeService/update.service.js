import axios from 'axios'
import { baseURL } from '../../API/api'

export const EditService = {
  async editTask(id) {
    const response = await axios
      .put(`${baseURL}/tasks/${id}`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then(res => console.log(res))
    return response.data.payload
  },
}