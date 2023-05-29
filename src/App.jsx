import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { RoutesData } from './assets/routes.data'
import Layout from './components/Layout/Layout'
import Login from './components/Login/Login'
import Register from './components/Register/Register'

const App = () => {
  return (
    <>
    <Routes>
      <Route>
        <Route path='/register' element={<Register />}/>
        <Route path='/login' element={<Login />}/>
      </Route>
      <Route path='/' element={<Layout />}>
        {
        RoutesData.map(item => (
          <Route key={item.path} path={item.path} element={<item.element />} />
        ))
        }
      </Route>
    </Routes>
    </>
  )
}

export default App