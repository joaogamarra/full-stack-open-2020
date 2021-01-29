import Weather from './Weather'

const Countries = ({ countries, handleClick }) => {
	if (countries.length > 10) {
		return <div>Too many matches, specify another filter</div>
	}

	if (countries.length === 1) {
		const { name, capital, population, languages, flag } = countries[0]

		return (
			<div>
				<h2>{name}</h2>
				<p>
					capital {capital}
					<br />
					population {population}
				</p>
				<h5>languages</h5>
				<ul>
					{languages.map(({ name }) => (
						<li key={name}>{name}</li>
					))}
				</ul>
				<img width='400' src={flag} alt={`${name} Flag`} />
				<Weather capital={capital} />
			</div>
		)
	}

	return countries.map(({ name }) => (
		<div key={name}>
			{name}{' '}
			<button onClick={handleClick} data-name={name}>
				show
			</button>
		</div>
	))
}

export default Countries
