import React, { Component } from "react";
import "./../Assets/Styles/LandingPage.css";
import browsebutton from "./../Assets/Images/circled-right-2.png";
import logo from "./../Assets/Images/MYtineraryLogo.png";
import Navbar from "../Components/Navbar";
import Carousel from "./../Components/Carousel"

class LandingPage extends Component {
  render() {
    return (
      <div>

        <Navbar />

        <header className="header">
          <img src={logo} alt="logo" />
          <span className="tagline">
            Find your perfect trip, designed by insiders who know and love their
            cities.
          </span>
        </header>

        <div className="landingpage_content">
          <a className="browse_link" href="javascript:void(0)">
            <img src={browsebutton} alt="start_browsing" />
          </a>
          <span>Popular MYtineraries</span>
        </div>

        <Carousel/>
    
      </div>
    );
  }
}
export default LandingPage;
