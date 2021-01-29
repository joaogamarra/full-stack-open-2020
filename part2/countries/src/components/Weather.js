import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ capital }) => {
	const [weather, setWeather] = useState({
		current: {
			temperature: null,
			weather_icons: [],
			wind_dir: null,
			wind_speed: null,
		},
	})
	const api_key = process.env.REACT_APP_API_KEY

	useEffect(() => {
		axios
			.get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`)
			.then((response) => {
				console.log(response)
				setWeather(response.data)
			})
	}, [api_key, capital])

	return (
		<div>
			<h3>Weather in {capital}</h3>
			<p>
				<b>Temperature:</b> {weather.current.temperature} Celsius
			</p>
			<img src={weather.current.weather_icons[0]} alt='icon' />
			<p>
				<b>Wind:</b> {weather.current.wind_speed} mph direction {weather.current.wind_dir}
			</p>
		</div>
	)
}

export default Weather
