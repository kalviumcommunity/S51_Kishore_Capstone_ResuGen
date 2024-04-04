import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectUserData = () => {

    const userToken  = localStorage.getItem('token')

  return (
    <>
    {userToken ? <Outlet /> : <Navigate to="/" />}
    </>
  )
}

export default ProtectUserData