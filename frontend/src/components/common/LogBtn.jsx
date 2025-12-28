import React from 'react'
import { Link } from 'react-router-dom'

const LogBtn = () => {
  return (
    <>
    <Link className="btn btn-outline-info me-3" to="/login/">
        Login
    </Link>       
    </>
  )
}

export default LogBtn