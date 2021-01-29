import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'

const App = () => {
	const [persons, setPersons] = useState([])
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [filter, setFilter] = useState('')
	const personsToShow = persons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()))

	useEffect(() => {
		axios.get('http://localhost:3001/persons').then((response) => {
			setPersons(response.data)
		})
	}, [])

	const handleChangeName = (e) => setNewName(e.target.value)
	const handleChangeNumber = (e) => setNewNumber(e.target.value)

	const handleSubmit = (e) => {
		e.preventDefault()

		if (persons.filter((person) => person.name === newName).length > 0) {
			alert(`${newName} is already added to phonebook`)
		} else {
			const personObject = {
				name: newName,
				number: newNumber,
			}

			setPersons(persons.concat(personObject))
			setNewName('')
			setNewNumber('')
		}
	}

	const handleChangeFilter = (e) => setFilter(e.target.value)

	return (
		<div>
			<h2>Phonebook</h2>
			<Filter handleChange={handleChangeFilter} filter={filter} />
			<h3>Add a new</h3>
			<PersonForm
				handleSubmit={handleSubmit}
				handleChangeName={handleChangeName}
				handleChangeNumber={handleChangeNumber}
				newName={newName}
				newNumber={newNumber}
			/>
			<h3>Numbers</h3>
			<Persons personsToShow={personsToShow} />
		</div>
	)
}

export default App
