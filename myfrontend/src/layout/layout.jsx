import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useAuthStore } from '../store/useAuthStore'
const Layout = () => {
  const {authUser} = useAuthStore()
  return (
    <div>
        <Navbar authUser={authUser}/>
        <Outlet/>
    </div>
  )
}

export default Layout