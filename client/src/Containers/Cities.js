import React from "react";
import Navbar from "./../Components/Navbar";
import Footer from "./../Components/Footer";
import CityList from "../Components/CityList";
import { connect } from "react-redux";
import * as actionCreator from "./../Store/Actions/actions";

class Cities extends React.Component {
  componentDidMount() {
    this.props.getCities();
  }

  render() {
    if (this.props.citiesIsLoading) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <Navbar />

        <CityList cities={this.props.cities} />

        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cities: state.cities,
    citiesIsLoading: state.citiesIsLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCities: () => dispatch(actionCreator.fetchCitiesData())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cities);
