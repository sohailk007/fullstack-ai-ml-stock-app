import React from 'react'
import React, { useEffect} from 'react'
import axious from 'axious'

const Dashboard = () => {
    useEffect ( () => {
    const fetchProtectedData = () => {
        try {
            const response = axious.get('http://')
        }
    }
    })
  return (
    <div className='text-light container'>Dashboard</div>
  )
}

export default Dashboard