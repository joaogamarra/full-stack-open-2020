import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [user, setUser] = useState(null)
	const [errorMessage, setErrorMessage] = useState('')

	useEffect(() => {
		blogService.getAll().then((blogs) => setBlogs(blogs))
	}, [])

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			setUser(user)
			blogService.setToken(user.token)
		}
	}, [])

	const handleLogin = async (event) => {
		event.preventDefault()

		try {
			const user = await loginService.login({
				username,
				password,
			})
			window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))

			setUser(user)
			setUsername('')
			setPassword('')
		} catch (exception) {
			setErrorMessage('Wrong credentials')
			setTimeout(() => {
				setErrorMessage(null)
			}, 5000)
		}
	}

	const loginForm = () => (
		<form onSubmit={handleLogin}>
			<div>
				username
				<input
					type='text'
					value={username}
					name='Username'
					onChange={({ target }) => setUsername(target.value)}
				/>
			</div>
			<div>
				password
				<input
					type='password'
					value={password}
					name='Password'
					onChange={({ target }) => setPassword(target.value)}
				/>
			</div>
			<button type='submit'>login</button>
		</form>
	)

	const blogForm = () => (
		<div>
			<h1>todo</h1>
		</div>
		/*
		<form onSubmit={addBlog}>
			<input value={newBlog} onChange={handleBlogChange} />
			<button type='submit'>save</button>
    </form>
    */
	)

	return (
		<div>
			{user === null ? (
				loginForm()
			) : (
				<div>
					<p>
						{user.name} logged-in{' '}
						<button onClick={() => window.localStorage.removeItem('loggedBlogUser')}>logout</button>
					</p>
					{blogForm()}
					{blogs.map((blog) => (
						<Blog key={blog.id} blog={blog} />
					))}
				</div>
			)}
		</div>
	)
}

export default App
