import React from "react";
import LogoIcon from "../images/logo.png";

const Logo = () => {
  return (
    <div className="logo-container m-4 border shadow-sm" options={{ max: 50 }}>
      <img src={LogoIcon} alt="" />
    </div>
  );
};

export default Logo;
