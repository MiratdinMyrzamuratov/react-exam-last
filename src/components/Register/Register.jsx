import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { fetchingLogin, LoginError } from '../../store/reducers/Auth/auth'
import { Form, Input, Button, message } from "antd"

const Register = () => {
    const { token, loading } = useSelector(store => store.auth)

    const [dataForBackend, setDataForBackend] = useState({
        name: "",
        phone: "",
        password: ""
    })
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        if (token) {
            navigate("/", { replace: true })
        }
    }, [])

    function register(e) {
        e.preventDefault()
        dispatch(fetchingLogin())
        axios
            .post("http://todo.paydali.uz/api/register", dataForBackend)
            .then(res => {
                if (res.data.code === 422) {
                    message.error("The phone has already been taken.")
                } else if (res.data.code === 200) {
                    message.success("Success autheration")
                }
                navigate("/login", { replace: true })
            })
            .catch(err => {
                dispatch(LoginError())
                console.log(err)
            })
    }

    return (
        <>
            <div className='auth-cont w-full h-screen flex justify-center items-center bg-gradient-to-r from-cyan-500 to-blue-500'>

                <Form onSubmit={register} className='register w-[30%] mx-auto my-auto shadow-md rounded-md p-8 bg-white'>
                    <h1 className='flex items-center justify-center mb-4 text-6xl text-blue-600'>Register</h1>
                    <Form.Item rules={[{ required: true, message: "Please create username" }]}>
                        <Input className='border-blue-600 rounded-3xl' value={dataForBackend.name} onChange={(e) => setDataForBackend({ ...dataForBackend, name: e.target.value })} placeholder='Username' />
                    </Form.Item>
                    <Form.Item rules={[{ required: true, message: "Please create username" }]}>
                        <Input className='border-blue-600 rounded-3xl' value={dataForBackend.phone} onChange={(e) => setDataForBackend({ ...dataForBackend, phone: e.target.value })} placeholder='Phone' />
                    </Form.Item>
                    <Form.Item rules={[{ required: true, message: "Please create username" }]}>
                        <Input.Password className='border-blue-600 rounded-3xl' value={dataForBackend.password} onChange={(e) => setDataForBackend({ ...dataForBackend, password: e.target.value })} placeholder='Password' />
                    </Form.Item>
                    <Form.Item className='flex justify-center items-center'>
                        <Button disabled={loading} onClick={register} className='border-none bg-blue-600 text-white rounded-3xl' type='primary'>Submit</Button>
                    </Form.Item>
                    <Form.Item className='flex justify-center items-center'>
                        <p>I have an account ! <a className='text-blue-600 active:text-blue-800' href="/login">Sign in</a></p>
                    </Form.Item>
                </Form>
            </div>
        </>
    )
}

export default Register