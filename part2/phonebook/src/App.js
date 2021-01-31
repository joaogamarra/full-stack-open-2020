import React, { useState, useEffect } from 'react'

import personsService from './services/persons'

import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'

const App = () => {
	const [persons, setPersons] = useState([])
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [filter, setFilter] = useState('')
	const personsToShow = persons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()))
	const [notificationMessage, setNotificationMessage] = useState(null)
	const [notificationStatus, setNotificationStatus] = useState('')

	useEffect(() => {
		personsService.getAll().then((response) => {
			console.log(response)
			setPersons(response.data)
		})
	}, [])

	const handleChangeName = (e) => setNewName(e.target.value)
	const handleChangeNumber = (e) => setNewNumber(e.target.value)

	const handleSubmit = (e) => {
		e.preventDefault()

		if (persons.filter((person) => person.name === newName).length > 0) {
			if (
				window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
			) {
				const person = persons.find((p) => p.name === newName)
				const changedPerson = { ...person, number: newNumber }
				personsService.update(person.id, changedPerson).then((response) => {
					setPersons(persons.map((item) => (item.id !== person.id ? item : changedPerson)))
				})
			}
		} else {
			const personObject = {
				name: newName,
				number: newNumber,
			}

			personsService.create(personObject).then((response) => {
				setPersons(persons.concat(personObject))
				handleNotification('success', `Added ${newName}`)
				setNewName('')
				setNewNumber('')
			})
		}
	}

	const handleNotification = (status, message) => {
		setNotificationStatus(status)
		setNotificationMessage(message)
		setTimeout(() => {
			setNotificationMessage(null)
		}, 4000)
	}

	const handleDelete = (id, name) => {
		if (window.confirm(`Delete ${name} ?`)) {
			personsService
				.remove(id)
				.then((response) => {
					setPersons(persons.filter((p) => p.id !== id))
				})
				.catch((error) => {
					handleNotification('error', `Information of ${name} has already been removed from server`)
				})
		}
	}

	const handleChangeFilter = (e) => setFilter(e.target.value)

	return (
		<div>
			<h2>Phonebook</h2>
			<Notification status={notificationStatus} message={notificationMessage} />
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
			<Persons personsToShow={personsToShow} handleDelete={handleDelete} />
		</div>
	)
}

export default App
