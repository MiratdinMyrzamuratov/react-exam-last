import axios from "axios"
import { baseURL } from "../../API/api"

export const HomeService = {
    async funcHomeServ() {
        const response = await axios.get(`${baseURL}/tasks`, {
            headers: {
                "Authorization" : "Bearer " + localStorage.getItem("token")
            }
        })
        return response.data.payload
    }
}