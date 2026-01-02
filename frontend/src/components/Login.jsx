import React from "react";

const Login = () => {
  return (
    <>
      <div className="container p-5 mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6 bg-light-dark p-4 rounded shadow">
            <h4 className="text-light text-center mb-4">Create an Account</h4>

            {success && (
              <div className="alert alert-success text-center">
                Registration successful 🎉
              </div>
            )}

            {errors.general && (
              <div className="alert alert-danger text-center">
                {errors.general}
              </div>
            )}

            <form>
              {/* Username */}
              <div className="mb-3">
                <input
                  type="text"
                  name="username"
                  className={`form-control ${
                    errors.username ? "is-invalid" : ""
                  }`}
                  placeholder="Enter Username"
                  value={username}
                  onChange={handleChange}
                />
                {renderError("username")}
              </div>

              {/* Email */}
              <div className="mb-3">
                <input
                  type="email"
                  name="email"
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  placeholder="Enter Email"
                  value={email}
                  onChange={handleChange}
                />
                {renderError("email")}
              </div>

              {/* Password */}
              <div className="mb-4">
                <input
                  type="password"
                  name="password"
                  className={`form-control ${
                    errors.password ? "is-invalid" : ""
                  }`}
                  placeholder="Enter Password"
                  value={password}
                  onChange={handleChange}
                />
                {renderError("password")}
              </div>

              <button
                type="submit"
                className="btn btn-info w-100"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <FontAwesomeIcon icon={faSpinner} spin className="me-2" />
                    Please wait...
                  </>
                ) : (
                  "Register"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
