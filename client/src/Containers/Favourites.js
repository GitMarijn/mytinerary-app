import React from "react";
import Navbar from "./../Components/Navbar";
import Footer from "./../Components/Footer";
import { connect } from "react-redux";
import * as actionCreator from "./../Store/Actions/actions";
import Itinerary from "./../Components/itinerary";

class Favourites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // counter: 0
    }
  }

  componentWillMount() {
    this.tokenState();
  }

  componentDidMount() {
    this.props.getUser(this.state.token);
  }

  tokenState() {
    if (!localStorage["token"]) {
      this.setState({ token: sessionStorage["token"] });
    } else if (!sessionStorage["token"]) {
      this.setState({ token: localStorage["token"] });
    } else if (!sessionStorage["token"] && !localStorage["token"]) {
      this.setState({ token: "" });
    }
  }

  render() {
    if (this.props.userIsLoading || this.props.favouritesIsLoading) {
      return <div>Loading...</div>;
    }
    if (!this.props.userIsLoading && this.state.counter < 1){
      return (<div>
        Loading...
       {this.setState({
          counter: 1,
        })}
      {this.props.getFavourites(this.props.user.favourites)}
      </div>)
    }
    return (
      <React.Fragment>
        <Navbar />
        <div className="itinerary_card_wrapper">
        {this.props.user.favourites.map((item, index) => (
          <div key={index}>{item.title}</div>
          // <Itinerary item={item} index={index} />
        ))}
        
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    userIsLoading: state.userIsLoading,
    favourites: state.favourites,
    favouritesIsLoading: state.favouritesIsLoading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getFavourites: id => dispatch(actionCreator.fetchFavourites(id)),
    getUser: id => dispatch(actionCreator.fetchUser(id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Favourites);
