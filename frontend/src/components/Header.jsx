import React, { useContext } from "react";
import RegBtn from "./common/RegBtn";
import LogBtn from "./common/LogBtn";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider";

const Header = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav
      className="navbar navbar-expand-lg pt-3 pb-3 pe-5 ps-3"
      style={{ backgroundColor: "#112240" }}
    >
      <div className="container-fluid">
        {/* Brand */}
        <Link className="navbar-brand fw-bold text-light" to="/">
          Stock Prediction
        </Link>

        <div>
          {isLoggedIn ? (
            <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
          ) : (
            <>
              {/* Right side buttons */}
              <div className="ms-auto d-flex">
                <LogBtn />
                <RegBtn />
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
