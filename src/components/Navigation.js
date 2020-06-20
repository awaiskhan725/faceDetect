import React from "react";
import { Logo } from "../components";

const Navigation = ({ onRouteChange, onSignOut, userExist }) => {
  return (
    <nav className="nav justify-content-between align-items-center border-bottom shadow-sm bg-light">
      <div className="d-flex align-items-center">
        <Logo />
        <span className="h5 font-weight-bold text-uppercase text-primary m-0">
          face detect
        </span>
      </div>
      <div className="d-flex">
        {userExist && (
          <button className="btn btn-link p-0 m-4" onClick={() => onSignOut()}>
            Sign Out
          </button>
        )}
        {!userExist && (
          <button
            className="btn btn-link p-0 m-4"
            onClick={() => onRouteChange("signin")}
          >
            Sign In
          </button>
        )}
        {!userExist && (
          <button
            className="btn btn-link p-0 m-4"
            onClick={() => onRouteChange("register")}
          >
            Register
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
