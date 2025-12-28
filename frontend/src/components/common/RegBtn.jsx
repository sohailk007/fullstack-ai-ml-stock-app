import React from 'react'
import { Link } from 'react-router-dom'

const RegBtn = () => {
  return (
    <>
    <Link className="btn btn-info ms-auto" to="/register/">
        Register
    </Link>
    </>
  )
}

export default RegBtn