import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { fetchedLogin, fetchingLogin, LoginError } from '../../store/reducers/Auth/auth'
import { Form, Input, Button, message } from "antd"
import { baseURL } from '../../API/api'

const Login = () => {
  const { users, token, loading } = useSelector(store => store.auth)

  const [dataForBackend, setDataForBackend] = useState({
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

  function login(e) {
    e.preventDefault()
    dispatch(fetchingLogin())
    axios
      .post(`${baseURL}/login`, dataForBackend)
      .then(res => {
        if (res.data.code === 422) {
          message.error("The selected phone is invalid.")
        } else if (res.data.code === 200) {
          message.success("Successfull")
        }
        dispatch(fetchedLogin({
          payload: {
            users: res.data.payload,
            token: res.data.payload.token
          }
        }))

        localStorage.setItem("token", res.data.payload.token)
        navigate("/", { replace: true })
      })
      .catch(err => {
        dispatch(LoginError())
        console.log(err);
      })
  }

  return (
    <>
      <div className='auth-cont w-full h-screen flex justify-center items-center bg-gradient-to-r from-cyan-500 to-blue-500'>

        <Form className='login w-[30%] mx-auto my-auto shadow-md rounded-md p-8 bg-white'>
          <h1 className='flex items-center justify-center mb-4 text-6xl text-blue-600'>Login</h1>
          <Form.Item>
            <Input className='border-blue-600 rounded-3xl' value={dataForBackend.phone} onChange={(e) => setDataForBackend({ ...dataForBackend, phone: e.target.value })} placeholder='Phone' />
          </Form.Item>
          <Form.Item>
            <Input.Password className='border-blue-600 rounded-3xl' value={dataForBackend.password} onChange={(e) => setDataForBackend({ ...dataForBackend, password: e.target.value })} placeholder='Password' />
          </Form.Item>
          <Form.Item className='flex justify-center items-center'>
            <Button onClick={login} className='border-none bg-blue-600 text-white rounded-3xl' type='primary'>Log In</Button>
          </Form.Item>
          <Form.Item className='flex justify-center items-center'>
            <p>I dont have an account ? <a className='text-blue-600 active:text-blue-800' href="/register">Sign up</a></p>
          </Form.Item>
        </Form>
      </div>
    </>
  )
}

export default Login