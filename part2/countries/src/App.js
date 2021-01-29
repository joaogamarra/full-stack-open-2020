import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Countries from './components/Countries'

function App() {
	const [countries, setCountries] = useState([])
	const [countriesFiltered, setCountriesFiltered] = useState([])
	const [inputCountry, setInputCountry] = useState([])

	useEffect(() => {
		axios.get('https://restcountries.eu/rest/v2/all').then((response) => {
			setCountries(response.data)
			setCountriesFiltered(response.data)
		})
	}, [])

	const handleChange = (e) => {
		setInputCountry(e.target.value)

		setCountriesFiltered(
			countries.filter((country) => country.name.toLowerCase().includes(e.target.value.toLowerCase()))
		)
	}

	const showCountry = (e) => {
		setCountriesFiltered(countries.filter((country) => country.name.includes(e.target.dataset.name)))
	}

	return (
		<div>
			<div>
				<label>Find Countries</label>
				<input onChange={handleChange} value={inputCountry} />
				<Countries countries={countriesFiltered} handleClick={showCountry} />
			</div>
		</div>
	)
}

export default App
