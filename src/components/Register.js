import React, { Component } from "react";
import logo from "../images/logo.png";

// const Register = ({ userExist, onRouteChange }) => {
export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
    };
  }

  onNameChange = (event) => {
    this.setState({ name: event.target.value });
  };

  onEmailChange = (event) => {
    this.setState({ email: event.target.value });
  };

  onPasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };

  onSubmit = () => {
    // configure the fetch api to post request
    fetch("http://localhost:3001/register", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        this.props.userInformation(user);
        this.props.userExist();
      })
      .catch((error) => console.log(error));
  };

  render() {
    return (
      <div className="register-page">
        <div className="card shadow text-center">
          <div className="form-signin">
            <img className="mb-4" src={logo} alt="" />
            <h3 className="mb-3">Please register</h3>
            <label htmlFor="email" className="sr-only">
              User Name
            </label>
            <input
              autoFocus
              type="text"
              name="text"
              id="text"
              className="form-control mb-2"
              placeholder="User Name"
              onChange={this.onNameChange}
              required
            />
            <label htmlFor="email" className="sr-only">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="form-control mb-2"
              placeholder="example@domain.com"
              onChange={this.onEmailChange}
              required
            />
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="form-control mb-2"
              placeholder="Enter your password"
              onChange={this.onPasswordChange}
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
              Register
            </button>
            <button
              className="btn btn-link btn-lg btn-block"
              onClick={() => this.props.onRouteChange("home")}
            >
              Sign In as Guest
            </button>
          </div>
        </div>
      </div>
    );
  }
}
