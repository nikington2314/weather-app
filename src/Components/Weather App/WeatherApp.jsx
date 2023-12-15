import React, { useState, useEffect } from 'react';
import './WeatherApp.css'

import cloud_icon from '../Assets/cloud.png';
import wind_icon from '../Assets/wind.png';
import humidity_icon from '../Assets/humidity.png';


const WeatherApp = () => {

    /* DATE STUFF */ 
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const d = new Date();
    const day = weekday[d.getDay()].toUpperCase();
    const month = months[d.getMonth()];
    /* END DATE STUFF */

    const [weatherData, setWeatherData] = useState({});
    const [city, setCity] = useState("New York");
    const [icon, setIcon] = useState(cloud_icon);
    const api_key = "f9b76a344ff999aba5ff2fa17aa6cdc3";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${api_key}`;

    // grabbing initial content for opening page - starts with New York data
    useEffect( () => {
        fetch(url)
        .then(
            res => res.json()
        )
        .then((result) => {
            setWeatherData(result);
            console.log(weatherData);
            setCity("");
        })
    }, []);

    const search = async (event) => {
        if (event.key == "Enter") {
            fetch(url).then(
                response => response.json()
            ).then(
                data => {
                    setWeatherData(data);
                    console.log("search term obj: ");
                    console.log(weatherData);
                    setCity("");
                }
            )
        }
    }

    console.log(weatherData);

    return (
        <div className="container">

            <div className="top-bar">
                <input 
                    type="text" 
                    className="cityInput" 
                    placeholder='enter location'
                    value={city} 
                    onChange={e => setCity(e.target.value)}
                    onKeyDown={search}
                />
                <div className='today'>
                    <div className='day'>{day}</div>
                    <div className='date'>{month + " " + d.getDate() + ", " + d.getFullYear()}</div>
                </div>
            </div>

            <div className='weather-temp'>{weatherData.main?.temp}°F</div>
                <div className='weather-image'>
                    <img src={icon} alt="" />
                </div>  
            <div className='weather-location'>{weatherData.name?.toUpperCase()}</div>

            <div className='data-container'>
                <div className="element">
                    <img src={humidity_icon} alt="" className='icon'/>
                    <div className='data'>
                        <div className='humidity-percent'>{weatherData.main?.humidity}%</div>
                        <div className='text'>Humidity</div>
                    </div>
                </div>
                <div className="element">
                    <img src={wind_icon} alt="" className='icon'/>
                    <div className='data'>
                        <div className='wind-rate'>{weatherData.wind?.speed}km/hr</div>
                        <div className='text'>Wind Speed</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WeatherApp;