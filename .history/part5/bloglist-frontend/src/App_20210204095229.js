import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [user, setUser] = useState(null)
	const [newBlogTitle, setNewBlogTitle] = useState('')
	const [newBlogAuthor, setnewBlogAuthor] = useState('')
	const [newBlogUrl, setnewBlogUrl] = useState('')
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

	const handleLogout = () => {
		window.localStorage.removeItem('loggedBlogUser')
		setUser(null)
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
			<h3>create new</h3>
			<form onSubmit={addBlog}>
				<label>Title</label>
				<input value={newBlogTitle} onChange={({ target }) => setNewBlogTitle(target.value)} />
				<label>Author</label>
				<input value={newBlogAuthor} onChange={({ target }) => setNewBlogAuthor(target.value)} />
				<label>Url</label>
				<input value={newBlogUrl} onChange={({ target }) => setNewBlogUrl(target.value)} />
				<button type='submit'>save</button>
			</form>
		</div>
	)

	return (
		<div>
			{user === null ? (
				loginForm()
			) : (
				<div>
					<p>
						{user.name} logged-in <button onClick={handleLogout}>logout</button>
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
