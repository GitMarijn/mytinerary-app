import React, { Component } from "react";
import logo from "./MYtineraryLogo.png";
import "./App.css";
import browsebutton from "./circled-right-2.png";
import homebutton from "./homeIcon.png";

class App extends Component {
  render() {
    return <LandingPage />;
  }
}

class Footer extends React.Component{
  render() {
  return (
    <div className="footer">
      <a href="./home">
        <img className="homebutton" src={homebutton} />
      </a>
    </div>
  );
}
}

class LandingPage extends Component {
  render() {
    return (
      <div>
        <header className="header">
          <img src={logo} alt="logo" />
          <span className="tagline">
            Find your perfect trip, designed by insiders who know and love their
            cities.
          </span>
        </header>

        <div className="landingpage_content">
          <span className="browsetext">Start browsing</span>
          <a className="browse_link" href="#">
            <img src={browsebutton} alt="start_browsing" />
          </a>
          <span>Want to build your own MYtinerary?</span>
          <div className="linkwrapper">
            <a href="#" className="login_link">
              Log in
            </a>
            <a href="#" className="login_link">
              Create account
            </a>
          </div>
          <Footer/>
        </div>
      </div>
    );
  }
}



export default App;
