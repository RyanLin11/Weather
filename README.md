## Weather App

[![Netlify Status](https://api.netlify.com/api/v1/badges/a12a586d-7f75-469c-a999-692d1a900a84/deploy-status)](https://app.netlify.com/sites/nicechatapp/deploys)

![Front Page of Weather App](https://i.postimg.cc/XNkbpbHG/weatherapp.png)

## Website Link
[https://clearsky.netlify.app/](https://clearsky.netlify.app/)

## What it Does
Reports the current weather of any major city in the world.

## Technologies Used
- The app is implemented using React.js
- Autocomplete search bar for cities was provided by [Maps Javascript API](https://developers.google.com/maps/documentation/javascript/overview)
- Weather icons and current weather data is obtained from [OpenWeatherMap](https://openweathermap.org/api)
- Local time is obtained from [Google's Time Zone API](https://developers.google.com/maps/documentation/timezone/overview)
- Background image is retrieved using [Google Place Photos API](https://developers.google.com/maps/documentation/places/web-service/photos)

## Getting Started

1. Create a `.env` file with the following
```
REACT_APP_MAPS_API_KEY=<key> # API key for Google Maps JavaScript API and Google Places API
REACT_APP_TIME_API_KEY=<key> # API key for Google Time Zone API
REACT_APP_WEATHER_API_KEY=<key> # OpenWeatherMap API key
```

2. Run the development server with `npm start`

