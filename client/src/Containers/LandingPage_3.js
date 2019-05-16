import React, { Component } from "react";
import "./../Assets/Styles/LandingPage.css";
import logo from "./../Assets/Images/MYtineraryLogo.png";
import Navbar from "../Components/Navbar";
import Carousel from "./../Components/Carousel";
import Footer from "./../Components/Footer";
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';

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
          <Link to="/cities" className="browse_link far fa-arrow-alt-circle-right"></Link>
          <span className="browse_text">Browse cities</span>
          <span className="carousel_text">Popular MYtineraries:</span>
        </div>

        <Carousel/>
        <Footer/>
    
      </div>
    );
  }
}
export default LandingPage;
