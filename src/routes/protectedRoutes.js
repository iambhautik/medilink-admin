import React, { useMemo } from 'react'
import Cookie from 'js-cookie'
import { Navigate } from 'react-router-dom'

const ProtectedRoutes = ({children}) => {
  let token = Cookie.get('token')
  let id = Cookie.get('id')

  const isAuthenticated = useMemo(() => {
    return (token && id) ? true : false
  }, [children])

  return isAuthenticated ? children : <Navigate to='/login' />
}

export default ProtectedRoutes