import React, { Component } from "react";
import "./App.css";
// import Clarifai from "clarifai";
import Particles from "react-particles-js";
import {
  Navigation,
  Rank,
  ImageLinkForm,
  FaceRecognition,
  SignInForm,
  Register,
} from "./components";

import { PARTICLES_PARAMS, SERVER_URL } from "./constants";

const initialState = {
  input: "",
  url: "",
  facesDetectData: [],
  route: "home",
  userExist: false,
  userId: "",
  userName: "",
  userEmail: "",
  userEntries: 0,
  userJoined: "",
};

export default class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  userInformation = (user) => {
    this.setState({
      userId: user.id,
      userName: user.name,
      userEmail: user.email,
      userEntries: user.entries,
      userJoined: user.joined,
    });
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  detectFaceRegion = (response) => {
    // console.log(response);
    let facesDetectData = [];
    // calculate the image width and height to position the bounding box
    const imageRef = document.getElementById("image");
    const imageWidth = Number(imageRef.width);
    const imageHeight = Number(imageRef.height);
    response.outputs[0].data.regions.map((face) => {
      let faceData = {
        // adjust the bounding box
        top: face.region_info.bounding_box.top_row * imageHeight,
        left: face.region_info.bounding_box.left_col * imageWidth,
        bottom:
          imageHeight - face.region_info.bounding_box.bottom_row * imageHeight,
        right:
          imageWidth - face.region_info.bounding_box.right_col * imageWidth,
      };
      return (facesDetectData = [...facesDetectData, faceData]);
    });
    this.setState({ facesDetectData });
  };

  onDetectButtonClicked = () => {
    this.setState({ url: this.state.input });
    // sending image url to the server to detect face regions
    fetch(`${SERVER_URL}/faceDetect`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: this.state.input,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        // update user entries in a database
        fetch(`${SERVER_URL}/image`, {
          method: "put",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: this.state.userId,
          }),
        })
          .then((response) => response.json())
          .then((userEntries) => this.setState({ userEntries }));
        this.detectFaceRegion(response);
      })
      .catch((err) => console.log(err));
  };

  onRouteChange = (route) => {
    // console.log("onRouteChange", route);
    this.setState({ route });
  };

  userExist = () => {
    if (this.state.route === "signin") {
      // if user sign in successful
      this.setState({ userExist: true, route: "home" });
      // else stay at sigin in scree
      // alert("Sign in failed, Please check credentials");
    } else if (this.state.route === "register") {
      // if user registeration successful
      this.setState({ userExist: true, route: "home" });
    } else {
      console.error("route is wrong");
    }
  };

  onSignOut = () => {
    // signed out user from the server
    this.setState(initialState);
  };

  render() {
    return (
      <div className="App">
        <Particles className="particles" params={PARTICLES_PARAMS} />
        {this.state.route === "signin" ? (
          <SignInForm
            userExist={this.userExist}
            userInformation={this.userInformation}
            onRouteChange={(route) => this.onRouteChange(route)}
          />
        ) : this.state.route === "register" ? (
          <Register
            userExist={this.userExist}
            userInformation={this.userInformation}
            onRouteChange={(route) => this.onRouteChange(route)}
          />
        ) : (
          <>
            <Navigation
              onSignOut={this.onSignOut}
              onRouteChange={(route) => this.onRouteChange(route)}
              userExist={this.state.userExist}
            />
            {this.state.userExist && (
              <Rank
                userName={this.state.userName}
                userRank={this.state.userEntries}
              />
            )}
            <ImageLinkForm
              url={this.state.input}
              onInputChange={this.onInputChange}
              onClick={this.onDetectButtonClicked}
            />
            <FaceRecognition
              imageUrl={this.state.url}
              facesData={this.state.facesDetectData}
            />
          </>
        )}
      </div>
    );
  }
}

// "https://samples.clarifai.com/face-det.jpg"
