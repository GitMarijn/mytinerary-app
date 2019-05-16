import React from "react";
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';

class CityList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: [...this.props.cities],
    };
  }

  handleChange = event => {
    const value = event.target.value;

    let filtered = this.props.cities.filter(city => {
      let cityName = city.name.toLowerCase();
      let countryName = city.country.toLowerCase();

      if (
        cityName.indexOf(value.toLowerCase()) !== -1 ||
        countryName.indexOf(value.toLowerCase()) !== -1
      )
        return true;
      return false;
    });
    this.setState({
      cities: filtered,
    });
  };

  render() {
    return (
      <div>

        <div className="searchbar">
          <input
            type="text"
            id="filter"
            onChange={this.handleChange}
            placeholder="Filter cities and countries..."
          />
        </div>

        <div>
          {this.state.cities.length == 0 ? (
            <span className="notfound_text">MYtinerary not found.</span>
          ) : (
            <div>
              {this.state.cities.map((item, index) => (
                <a className="cities_card" key={index} href={"/itinerary/" + item.name.replace(/\s/g,'').toLowerCase()}>
                  <img src={item.image} alt={item.name}/>
                  <span className="cities_card_city">{item.name}</span>
                  <span className="cities_card_country">{item.country}</span>
                </a>
              ))}
            </div>
          )}
        </div>

      </div>
    );
  }
}
export default CityList;
