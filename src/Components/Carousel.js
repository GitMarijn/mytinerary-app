import React from "react";
import { data } from "../Assets/JSON/data";
import {
  MDBCarousel,
  MDBCarouselCaption,
  MDBCarouselInner,
  MDBCarouselItem,
  MDBView,
  MDBContainer
} from "mdbreact";

class Carousel extends React.Component {
  render() {
    return (
      <MDBContainer>
        <MDBCarousel activeItem={0} length={9} showControls={true} showIndicators={true}>
          <MDBCarouselInner>

            {data.map((item, index) => (
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
export default Carousel;
