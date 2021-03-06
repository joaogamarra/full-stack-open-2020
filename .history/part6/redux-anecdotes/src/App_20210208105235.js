import React, { useEffect } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import anecdotesService from './services/anecdotesService'
import { initializeAnecdotes } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

const App = () => {
	const dispatch = useDispatch()
	useEffect(() => {
		async function fetchMyAPI() {
			const anecdotes = await anecdotesService.getAll()
			dispatch(initializeAnecdotes(anecdotes))
		}

		fetchMyAPI()
		anecdotesService.getAll().then()
	}, []) // eslint-disable-line react-hooks/exhaustive-deps

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
