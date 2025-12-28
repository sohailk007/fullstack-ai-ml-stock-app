import React, { useState } from 'react'
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState({})

  const handleRegistration = async (e) => {
    e.preventDefault()

    const userData = {
      username,
      email,
      password,
    }
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/v1/register/', userData);
        console.log('Registration successful:', response.data);
    }
    catch (error){
        setErrors(error.response.data);
        console.error('There was an error registering the user!', error);
    }
  }


  return (
    <>
      <div className="container p-5 mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6 bg-light-dark p-3 rounded">
            <h4 className="text-light text-center mb-3">
              Create an Account
            </h4>

            <form onSubmit={handleRegistration}>
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Enter Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />

              <input
                type="email"
                className="form-control mb-3"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <input
                type="password"
                className="form-control mb-3"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button
                type="submit"
                className="btn btn-info d-block mx-auto"
              >
                Register
              </button>
            </form>

          </div>
        </div>
      </div>
    </>
  )
}

export default Register
