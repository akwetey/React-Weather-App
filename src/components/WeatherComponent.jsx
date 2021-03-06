import React, { useState } from "react";
import LoadingComponent from "./LoadingComponent";
import axios from "axios";

const UiComponent = ({ cityname }) => {
  return (
    <React.Fragment>
      <div className="card shadow-lg rounded">
        <img
          src={
            cityname.weatherDetails.IsDayTime
              ? require("../img/day.svg")
              : require("../img/night.svg")
          }
          alt=""
          className="card-img-top"
          id="weatherimg"
        />
        <div className="bg-light mx-auto text-center icon">
          <img
            src={require(`../img/icons/${cityname.weatherDetails.WeatherIcon}.svg`)}
            alt=""
          />
        </div>
        <div className="text-muted text-uppercase text-center citydetails">
          <h4 className="my-3">{cityname.cityDetails.EnglishName}</h4>
          <div className="my-3">{cityname.weatherDetails.WeatherText}</div>
          <div className="display-4 my-4">
            <span>{cityname.weatherDetails.Temperature.Metric.Value}</span>
            <span>&deg; C</span>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

//using hooks
const WeatherComponent = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [city, setCity] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const apikey = "EGbDx8Ku6WQxGWpwkB4KoWZ95jEjfxxb";

  //get current condition
  const currentCondition = async url => {
    const query = `?apikey=${apikey}`;
    const response = await axios.get(url + query);
    return await response.data[0];
  };

  //get city location
  const cityData = async (url, city) => {
    const query = `?apikey=${apikey}&q=${city}`;
    const response = await axios.get(url + query);
    return await response.data[0];
  };

  const cityValue = e => {
    setCity(e.target.value);
  };

  const fetchDetails = async city => {
    setIsLoading(true);

    const cityDetails = await cityData(
      `http://dataservice.accuweather.com/locations/v1/cities/search`,
      city
    );
    const { Key } = cityDetails;
    const weatherDetails = await currentCondition(
      `http://dataservice.accuweather.com/currentconditions/v1/${Key}`
    );

    const requestData = {
      cityDetails: cityDetails,
      weatherDetails: weatherDetails
    };

    setWeatherData(requestData);
    setIsVisible(true);
    setIsLoading(false);
  };

  const submitFunc = e => {
    e.preventDefault();
    fetchDetails(city);
    setCity("");
    setIsVisible(false);
  };

  return (
    <div className="container my-5 mx-auto">
      <h1 className="text-muted text-center my-4">React Weather App</h1>
      <form className="text-center text-muted my-4" onSubmit={submitFunc}>
        <label htmlFor="city">Enter a location</label>
        <input
          type="text"
          name="city"
          value={city}
          onChange={cityValue}
          className="form-control p-4"
        />
      </form>
      {isLoading ? <LoadingComponent /> : null}
      {isVisible ? (
        <UiComponent cityname={weatherData} />
      ) : (
        <h6 className="mt-5">No Data</h6>
      )}
    </div>
  );
};

/* class WeatherComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weatherData: [],
      city: "",
      isVisible: false,
      isLoading: false
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

  fetchDetails = async city => {
    this.setState({
      isLoading: !this.state.isLoading
    });
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
      weatherData: requestData,
      isVisible: !this.state.isVisible,
      isLoading: !this.state.isLoading
    });
  };

  submitFunc = e => {
    e.preventDefault();
    const { city } = this.state;
    this.fetchDetails(city);
    this.setState({
      city: "",
      isVisible: false
    });
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
            value={this.state.city}
            onChange={this.cityValue}
            className="form-control p-4"
          />
        </form>
        {this.state.isLoading ? <LoadingComponent /> : null}
        {this.state.isVisible ? (
          <UiComponent cityname={this.state.weatherData} />
        ) : (
          <h6 className="mt-5">No Data</h6>
        )}
      </div>
    );
  }
} */

export default WeatherComponent;
