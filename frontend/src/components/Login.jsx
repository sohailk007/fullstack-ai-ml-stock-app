import React, { useState, useContext } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../AuthProvider";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const { email, password } = formData;

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle login (JSON)
  const handleLogin = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    const payload = {
      email,
      password,
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/v1/login/",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Save tokens
      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);

      // Update auth state & redirect
      setIsLoggedIn(true);
      navigate("/dashboard/");
    } catch (error) {
      console.error("Login error:", error);

      if (error.response?.data) {
        setErrors(error.response.data);
      } else {
        setErrors({ general: "Invalid email or password." });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container p-5 mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 bg-light-dark p-4 rounded shadow">
          <h4 className="text-light text-center mb-4">Login</h4>

          <form onSubmit={handleLogin} noValidate>
            {/* Email */}
            <div className="mb-3">
              <input
                type="email"
                name="email"
                className={`form-control ${
                  errors.email ? "is-invalid" : ""
                }`}
                placeholder="Enter Email"
                value={email}
                onChange={handleChange}
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
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
              {errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
            </div>

            {errors.general && (
              <div className="alert alert-danger text-center">
                {errors.general}
              </div>
            )}

            <button
              type="submit"
              className="btn btn-info w-100"
              disabled={loading}
            >
              {loading ? (
                <>
                  <FontAwesomeIcon
                    icon={faSpinner}
                    spin
                    className="me-2"
                  />
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
