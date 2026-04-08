import React from "react";
import "../App.css";
import stefanoLogo from "../images/sinfobndo.png";

const Logo = () => {
  return (
    <div className="stefano-logo-container">
      <img className="stefano-logo" src={stefanoLogo} alt="Stefano Logo" />
    </div>
  );
};

export default Logo;
