import React from 'react';
import Time from './Time';
import Search from './Search';
import './Weather.css';

const google = window.google;

class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: 'Enter a City',
      temp: 'N/A',
      wind: 'N/A',
      description: 'N/A',
      placeID: 'N/A',
      photo: '../public/images/defaultCityImage.jpg'
    }
    this.updateCity = this.updateCity.bind(this);
  }

  async getWeather() {
    try{
      const rawWeatherData = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${this.state.lat}&lon=${this.state.long}&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`);
      return await rawWeatherData.json();
    } catch(err) {
      throw new Error('Cannot get weather at specified location.');
    }
  }

  async getPhoto() {
    const map = document.createElement('div');
    const service = new google.maps.places.PlacesService(map);
    const requestOptions = {
      placeId: this.state.placeId,
      fields: ['photos']
    };
    let photo = await new Promise((resolve, reject) => {
      service.getDetails(requestOptions, (p, status) => {
        if(status === 'OK') {
          resolve(p.photos[0].getUrl());
        } else {
          reject(`Photo failed to render, ${status}`);
        }
      })
    });
    return photo;
  }

  updateCity(place) {
    this.setState({
      'city': place.name, 
      'placeId': place.place_id, 
      'lat': place.geometry.location.lat(), 
      'long': place.geometry.location.lng()
    });
  }

  async componentDidUpdate(prevProps, prevState) {
    if(this.state.placeId !== prevState.placeId) {
      const weatherData = await this.getWeather();
      //const icon = await this.getIcon(weatherData);
      const photo = await this.getPhoto();
      console.log(weatherData);
      this.setState({
        'temp': weatherData.main.temp,
        'wind': weatherData.wind.speed,
        'description': weatherData.weather[0].description,
        'icon': `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`,
        'photo': photo
      });
    }
  }

  render() {
    return (
      <div className='background' style={{'backgroundImage':`url(${this.state.photo})`}}>
        <div className='widget'>
          <Search changeCity={this.updateCity} />
          <img src={this.state.icon} />
          <h1>{this.state.city}</h1>
          <p>Temp: {this.state.temp}&deg;C</p>
          <p>Wind: {this.state.wind} km/h</p>
          <p>Description: {this.state.description}</p>
          <Time lat={this.state.lat} long={this.state.long}/>
        </div>
      </div>
    );
  }
} 

export default Weather;