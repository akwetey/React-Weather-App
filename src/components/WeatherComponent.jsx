import React, { Component } from "react";
import axios from "axios";

class WeatherComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weatherData: [],
      city: ""
    };
    this.apikey = "EGbDx8Ku6WQxGWpwkB4KoWZ95jEjfxxb";
  }

  //get current condition
  currentCondition = async url => {
    const query = `?apikey=${this.apikey}`;
    const response = await axios.get(url + query);
    return await response.data[0];
  };

  //get city location
  cityData = async (url, city) => {
    const query = `?apikey=${this.apikey}&q=${city}`;
    const response = await axios.get(url + query);
    return await response.data[0];
  };

  cityValue = e => {
    this.setState({
      city: e.target.value
    });
  };

  submitFunc = e => {
    e.preventDefault();
    console.log(this.state.city);
  };

  componentDidMount() {
    const fetchDetails = async city => {
      const cityDetails = await this.cityData(
        `http://dataservice.accuweather.com/locations/v1/cities/search`,
        city
      );
      const { Key } = cityDetails;
      const weatherDetails = await this.currentCondition(
        `http://dataservice.accuweather.com/currentconditions/v1/${Key}`
      );
      const requestData = {
        cityDetails: cityDetails,
        weatherDetails: weatherDetails
      };
      this.setState({
        weatherData: requestData
      });
    };

    fetchDetails("Accra");
  }

  myStyle = {
    display: "none"
  };

  render() {
    return (
      <div className="container my-5 mx-auto">
        <h1 className="text-muted text-center my-4">React Weather App</h1>
        <form
          className="text-center text-muted my-4"
          onSubmit={this.submitFunc}
        >
          <label htmlFor="city">Enter a location</label>
          <input
            type="text"
            name="city"
            onChange={this.cityValue}
            className="form-control p-4 "
          />
        </form>
        <div className="card shadow-lg rounded" style={this.myStyle}>
          <img
            src="https://dummyimage.com/640x360/fff/aaa"
            alt=""
            className="card-img-top"
            id="weatherimg"
          />
          <div className="bg-light mx-auto text-center icon">
            <img src="" alt="" />
          </div>
          <div className="text-muted text-uppercase text-center citydetails">
            <h4 className="my-3">Name of city</h4>
            <div className="my-3">Weather Condition</div>
            <div className="display-4 my-4">
              <span>temp</span>
              <span>&deg; C</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default WeatherComponent;
