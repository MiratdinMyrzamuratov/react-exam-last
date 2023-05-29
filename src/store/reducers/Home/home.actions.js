import { createAsyncThunk } from "@reduxjs/toolkit";
import { HomeService } from "../../../services/HomeService/home.service";

export const homeTodo = createAsyncThunk(
    "fetch/todo",
    async ( ) => {
        try {
            const data =  await HomeService.funcHomeServ()
            return data
        } catch (error) {
            return error
        }
    }
)