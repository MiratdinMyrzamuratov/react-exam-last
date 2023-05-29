import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    users: {},
    token: localStorage.getItem("token") || null,
    isLoggen: false,
    loading: false
}

export const AuthSlice = createSlice({
    name: "Auth",
    initialState,

    reducers: {
        fetchingLogin: state => {
            state.loading = true
        },
        fetchedLogin: (state, action) => {
            state.users = action.payload.users,
            state.token = action.payload.token,
            state.isLoggen = true,
            state.loading = false
        },
        LoginError: state => {
            state.loading = false
        }
    }
})

export const { fetchingLogin, fetchedLogin, LoginError } = AuthSlice.actions
export default AuthSlice.reducer