import React from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function Logout() {
    let navigate = useNavigate()
  return ()=>{
    sessionStorage.clear()
    toast.success('Logout successfully')
    navigate('/')
  }
}

export default Logout
