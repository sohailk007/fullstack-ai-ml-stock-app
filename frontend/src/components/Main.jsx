import React from 'react'
import LogBtn from './common/LogBtn'

const Main = () => {
  return (
    <>
    <div className='container'>
      <div className='p-5 text-center bg-light-dark rounded-3 mt-4'>
        <h2 className='text-light'>Stock Prediction Portal</h2>
        <p className='text-light lead'>This Stock Prediction Portal uses AI and Machine Learning to predict stock prices.
          Users can register and login to access personalized features and insights.
        </p>
        <LogBtn />
      </div>

    </div>
    </>
  )
}

export default Main