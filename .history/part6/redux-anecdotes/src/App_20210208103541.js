import React, { useEffect } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import getAll from './services/anecdotesService'
import { anecdoteReducer } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

const App = () => {
	const dispatch = useDispatch()
	useEffect(() => {
		noteService.getAll().then((notes) => dispatch(initializeNotes(notes)))
	}, [])
	return (
		<div>
			<h2>Anecdotes</h2>
			<Filter />
			<Notification />
			<AnecdoteList />
			<AnecdoteForm />
		</div>
	)
}

export default App
