import { useState, useEffect } from 'react';
import Time from './Time';
import Search from './Search';
import './Weather.css';

const google = window.google;

function Weather() {
    const [temp, setTemp] = useState('');
    const [wind, setWind] = useState('');
    const [description, setDescription] = useState('');
    const [photo, setPhoto] = useState('');
    const [icon, setIcon] = useState('');
    const [place, setPlace] = useState({
        city: 'New York',
        placeId: 'ChIJOwg_06VPwokRYv534QaPC8g',
        coordinates: { latitude: 40.7127753, longitude: -74.0059728 }
    });

    useEffect(() => {
        async function updateWeatherData() {
            // update weather data
            const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${place.coordinates.latitude}&lon=${place.coordinates.longitude}&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`);
            const weatherData = await weatherResponse.json();
            console.log(weatherData);
            console.log(place);
            setTemp(weatherData.main.temp);
            setWind(weatherData.wind.speed);
            setDescription(weatherData.weather[0].description);
            setIcon(`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`);
            // update place photo
            const map = document.createElement('div');
            const service = new google.maps.places.PlacesService(map);
            const requestOptions = {
                placeId: place.placeId,
                fields: ['photos']
            };
            const photo = await new Promise((resolve, reject) => {
                service.getDetails(requestOptions, (p, status) => {
                    if (status === 'OK') {
                        resolve(p.photos[0].getUrl());
                    } else {
                        reject(`Photo failed to render, ${status}`);
                    }
                })
            });
            setPhoto(photo);
        }
        if (place) {
            updateWeatherData();
        }
    }, [place]);
    
    function handlePlaceChange(place) {
        setPlace({
            city: place.name,
            placeId: place.place_id,
            coordinates: { latitude: place.geometry.location.lat(), longitude: place.geometry.location.lng()}
        });
    }

    return (
        <div className='background' style={{'backgroundImage':`url(${photo})`}}>
            <div className='widget'>
            <Search onPlaceChange={handlePlaceChange} />
            <img src={icon} />
            <h1>{place?.city}</h1>
            <p>Temp: {temp}&deg;C</p>
            <p>Wind: {wind} km/h</p>
            <p>Description: {description}</p>
            <Time latitude={place?.coordinates?.latitude} longitude={place?.coordinates?.longitude}/>
            </div>
        </div>
    );
}

export default Weather;