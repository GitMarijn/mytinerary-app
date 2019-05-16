import React, { Component } from "react";
import "./../Assets/Styles/LandingPage.css";
import browsebutton from "./../Assets/Images/circled-right-2.png";
import logo from "./../Assets/Images/MYtineraryLogo.png";
import Navbar from "../Components/Navbar";
import { data } from "../Assets/JSON/data";

class LandingPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cityOne: "",
      cityTwo: "",
      cityThree: "",
      cityFour: ""
    };
  }

  setFourCities() {
    var cityOne = this.getRandomCity();
    var cityTwo = this.getRandomCity();
    var cityThree = this.getRandomCity();
    var cityFour = this.getRandomCity();

    while (cityTwo == cityOne) {
      cityTwo = this.getRandomCity();
    }
    while (cityOne == cityThree || cityTwo == cityThree) {
      cityThree = this.getRandomCity();
    }
    while (
      cityOne == cityFour ||
      cityTwo == cityFour ||
      cityThree == cityFour
    ) {
      cityFour = this.getRandomCity();
    }

    this.setState({
      cityOne: cityOne,
      cityTwo: cityTwo,
      cityThree: cityThree,
      cityFour: cityFour
    });
  }

  componentDidMount() {
      var intervalId = setInterval(() => this.setFourCities(), 4000);
      this.setState({intervalId: intervalId});
   }
   
   componentWillUnmount() {
      clearInterval(this.state.intervalId);
   }

  getRandomCity() {
    return data[Math.floor(Math.random() * data.length)];
  }

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

        <div className="popular_cities">
          <div className="city">
            <img src={this.state.cityOne.image} />
            <span className="cityname">{this.state.cityOne.name}</span>
          </div>
          <div className="city">
            <img src={this.state.cityTwo.image} />
            <span className="cityname">{this.state.cityTwo.name}</span>
          </div>
          <div className="city">
            <img src={this.state.cityThree.image} />
            <span className="cityname">{this.state.cityThree.name}</span>
          </div>
          <div className="city">
            <img src={this.state.cityFour.image} />
            <span className="cityname">{this.state.cityFour.name}</span>
          </div>
        </div>

      </div>
    );
  }
}
export default LandingPage;
