import React, { useState } from 'react'
import { useApolloClient } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'

const Notify = ({ errorMessage }) => {
	if (!errorMessage) {
		return null
	}

	return <div style={{ color: 'red' }}>{errorMessage}</div>
}

const App = () => {
	const [page, setPage] = useState('authors')
	const [errorMessage, setErrorMessage] = useState(null)
	const [token, setToken] = useState(null)
	const client = useApolloClient()

	const notify = (message) => {
		setErrorMessage(message)
		setTimeout(() => {
			setErrorMessage(null)
		}, 5000)
	}

	const logout = () => {
		setToken(null)
		localStorage.clear()
		client.resetStore()
	}

	return (
		<div>
			<div>
				<button onClick={() => setPage('authors')}>authors</button>
				<button onClick={() => setPage('books')}>books</button>
				<button onClick={() => setPage('add')}>add book</button>
				<button onClick={() => setPage('login')}>login</button>
				<button onCLick={logout}>logout</button>
			</div>
			<Notify errorMessage={errorMessage} />
			<Authors show={page === 'authors'} />

			<Books show={page === 'books'} />

			<NewBook show={page === 'add'} />

			<LoginForm show={page === 'login'} setToken={setToken} setError={notify} />
		</div>
	)
}

export default App
