import React from 'react'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className='flex  gap-4 w-full h-screen'>
        <div className='flex flex-col gap-4 w-full'>
        <Outlet />
        </div>
    </div>
  )
}

export default Layout