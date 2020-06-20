import React, { Component } from "react";
import logo from "../images/logo.png";

import { SERVER_URL } from "../constants";

export default class SignInForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  onEmailChange = (event) => {
    this.setState({ email: event.target.value });
  };

  onPasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };

  onSubmit = () => {
    // configure the fetch api to post request
    fetch(`${SERVER_URL}/signin`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        if (user.id) {
          this.props.userInformation(user);
          this.props.userExist();
        } else {
          alert("Unable to Sign In! Check credentials...");
        }
      })
      .catch((error) => console.log(error));
  };

  render() {
    return (
      <div className="signin-page">
        <div className="card shadow text-center">
          <div className="form-signin">
            <img className="mb-4" src={logo} alt="" />
            <h3 className="mb-3">Please sign in</h3>
            <label htmlFor="email" className="sr-only">
              Email Address
            </label>
            <input
              autoFocus
              type="email"
              name="email"
              id="email"
              className="form-control"
              placeholder="example@domain.com"
              onChange={(e) => this.onEmailChange(e)}
              required
            />
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="form-control"
              placeholder="Enter your password"
              onChange={(e) => this.onPasswordChange(e)}
              required
            />
            <div className="checkbox mb-3">
              <label htmlFor="remember-me">
                <input
                  type="checkbox"
                  name="remember-me"
                  id="remember-me"
                  value="rememeber-me"
                />
                {" Remember me"}
              </label>
            </div>
            <button
              className="btn btn-primary btn-lg btn-block"
              onClick={this.onSubmit}
            >
              Sign In
            </button>
            <button
              className="btn btn-link btn-lg btn-block"
              onClick={() => this.props.onRouteChange("register")}
            >
              Register
            </button>
            <button
              className="btn btn-link btn-lg btn-block"
              onClick={() => this.props.onRouteChange("guest")}
            >
              Sign In as Guest
            </button>
          </div>
        </div>
      </div>
    );
  }
}
