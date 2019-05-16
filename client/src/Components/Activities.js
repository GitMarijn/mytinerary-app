import React from "react";
import { connect } from "react-redux";
import * as actionCreator from "../Store/Actions/actions";
import Comments from "./comments";

class Activities extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activities: this.props.activities
    };
    this.itineraryName = this.props.itineraryName;
    this.itineraryId = this.props.itineraryId;
  }

  componentDidMount() {
    this.props.getActivities(this.itineraryName);
  }

  render() {
    if (this.props.activitiesIsLoading) {
      return <div>Loading...</div>;
    }
    return (
      <React.Fragment>
        {this.props.activities == "Error: No Activities Found" ? (
          <span className="notfound_text">No activities for this itinerary.</span>
        ) : (
            <div className="activities_wrapper">
            <span>Activities</span>
            <div className="activities_container">
              {this.props.activities.map((item, index) => (
                <div key={index} className="activities_card">
                  <img src={item.image} alt={item.name} className="activities_image"/>
                  <span>{item.name}</span>
                </div>
              ))}
             </div>
             <span>Comments</span>
             <Comments itineraryId={this.props.itineraryId}/>
             </div>
          )}

      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    activities: state.activities.message,
    activitiesIsLoading: state.activitiesIsLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getActivities: itinerary =>
      dispatch(actionCreator.fetchActivitiesData(itinerary))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Activities);
