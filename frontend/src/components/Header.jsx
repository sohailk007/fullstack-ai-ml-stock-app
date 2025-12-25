import React from "react";

const Header = () => {
  return (
    <>
      <nav
        className="navbar navbar-expand-lg pt-3 pb-3 pe-5 ps-3"
        style={{ backgroundColor: "#0B192C" }}
      >
        <div className="container-fluid">
          {/* Brand */}
          <a
            className="navbar-brand fw-bold"
            href="#"
            style={{ color: "#E5E7EB" }}
          >
            Stock Prediction
          </a>

          {/* Right side buttons */}
          <div className="ms-auto">
            <a className="btn btn-outline-info me-3" href="#">
              Login
            </a>
            <a className="btn btn-info" href="#">
              Register
            </a>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
