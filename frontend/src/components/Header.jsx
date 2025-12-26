import React from "react";
import RegBtn from "./common/RegBtn";
import LogBtn from "./common/LogBtn";

const Header = () => {
  return (
    <nav
      className="navbar navbar-expand-lg pt-3 pb-3 pe-5 ps-3"
      style={{ backgroundColor: "#112240" }}
    >
      <div className="container-fluid">
        {/* Brand */}
        <a className="navbar-brand fw-bold text-light" href="#">
          Stock Prediction
        </a>

        {/* Right side buttons */}
        <div className="ms-auto d-flex">
          <LogBtn />
          <RegBtn />
        </div>
      </div>
    </nav>
  );
};

export default Header;
