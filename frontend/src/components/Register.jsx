import React, { useState } from 'react'

const Register = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleRegistration = (e) => {
    e.preventDefault()

    const userData = {
      username,
      email,
      password,
    }

    console.log(userData)
    // later → API call here
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
