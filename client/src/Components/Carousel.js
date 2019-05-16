import React from "react";
import {
  MDBCarousel,
  MDBCarouselCaption,
  MDBCarouselInner,
  MDBCarouselItem,
  MDBView,
  MDBContainer
} from "mdbreact";
import { connect } from "react-redux";
import * as actionCreator from "./../Store/Actions/actions";

class Carousel extends React.Component {
  
  componentDidMount() {
    this.props.getCities();
  }

  render() {
    if (this.props.citiesIsLoading) return <div>Loading...</div>;
    return (
      <MDBContainer>
        <MDBCarousel activeItem={0} length={9} showControls={true} showIndicators={true}>
          <MDBCarouselInner>

            {this.props.cities.map((item, index) => (
              <div key={index}>
                <MDBCarouselItem itemId={index}>
                  <MDBView>
                    <img className="city" src={item.image} alt={item.name} />
                  </MDBView>
                  <MDBCarouselCaption>
                    <div className="cityname">{item.name}</div>
                    <div className="countryname">{item.country}</div>
                  </MDBCarouselCaption>
                </MDBCarouselItem>
              </div>
            ))}

          </MDBCarouselInner>
        </MDBCarousel>
      </MDBContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cities: state.cities,
    citiesIsLoading: state.citiesIsLoading
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getCities: () => dispatch(actionCreator.fetchCitiesData()),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Carousel);