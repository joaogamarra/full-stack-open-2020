const Persons = ({ personsToShow, handleDelete }) => {
	return (
		<>
			{personsToShow.map(({ id, name, number }) => (
				<p key={name}>
					{name} {number}
					<button onClick={() => handleDelete(id, name)}>delete</button>
				</p>
			))}
		</>
	)
}

export default Persons
