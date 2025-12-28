import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const { username, email, password } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setErrors({});

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/v1/register/",
        formData
      );

      console.log("Registration successful:", response.data);

      setSuccess(true);
      setFormData({
        username: "",
        email: "",
        password: "",
      });
    } catch (error) {
      if (error.response?.data) {
        setErrors(error.response.data);
      } else {
        setErrors({ general: "Something went wrong. Please try again." });
      }
    } finally {
      setLoading(false);
    }
  };

  const renderError = (field) => {
    if (!errors[field]) return null;
    return (
      <div className="invalid-feedback d-block">
        {Array.isArray(errors[field]) ? errors[field][0] : errors[field]}
      </div>
    );
  };

  return (
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

          <form onSubmit={handleRegistration} noValidate>
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
  );
};

export default Register;
