import React from "react";
import { connect } from "react-redux";
import * as actionCreator from "../Store/Actions/actions";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Itinerary from "../Components/itinerary";

const cityURL = window.location.pathname.split("/")[2];

class Itineraries extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    this.props.getItineries(cityURL);
  }

  render() {
    if (this.props.itinerariesIsLoading) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <Navbar />

        {this.props.itineraries == "Error: No Itinerary Found" ? (
          <span className="notfound_text">No itinerary for this city.</span>
        ) : (
          <div className="itinerary_card_wrapper">
            {this.props.itineraries.map((item, index) => (
              <Itinerary item={item} index={index} />
            ))}
          </div>
        )}

        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    itineraries: state.itineraries.message,
    itinerariesIsLoading: state.itinerariesIsLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getItineries: city => dispatch(actionCreator.fetchItinerariesData(city))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Itineraries);
