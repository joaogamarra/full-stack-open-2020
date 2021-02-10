import React, { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Toggable from './components/Toggable'
import { useDispatch } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [user, setUser] = useState(null)

	const blogFormRef = React.createRef()
	const dispatch = useDispatch()

	useEffect(() => {
		async function getBlogs() {
			const blogs = await blogService.getAll()
			setBlogs(blogs)
		}

		getBlogs()
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
			dispatch(setNotification('wrong username or password', 5))
		}
	}

	const handleLogout = () => {
		window.localStorage.removeItem('loggedBlogUser')
		setUser(null)
	}

	const createBlog = async (blogObject) => {
		try {
			blogFormRef.current.toggleVisibility()
			const returnedBlog = await blogService.create(blogObject)
			setBlogs(blogs.concat(returnedBlog))
			dispatch(setNotification(`a new blog ${returnedBlog.title} added`, 5))
		} catch (exception) {
			dispatch(setNotification(exception, 5))
		}
	}

	const loginForm = () => (
		<form onSubmit={handleLogin}>
			<div>
				username
				<input
					id='username'
					type='text'
					value={username}
					name='Username'
					onChange={({ target }) => setUsername(target.value)}
				/>
			</div>
			<div>
				password
				<input
					id='password'
					type='password'
					value={password}
					name='Password'
					onChange={({ target }) => setPassword(target.value)}
				/>
			</div>
			<button id='login-btn' type='submit'>
				login
			</button>
		</form>
	)

	return (
		<div>
			{user === null ? (
				<div>
					{loginForm()}
					<Notification />
				</div>
			) : (
				<div>
					<p>
						{user.name} logged-in <button onClick={handleLogout}>logout</button>
					</p>
					<Notification />
					<Toggable buttonLabel='new blog' ref={blogFormRef}>
						<BlogForm createBlog={createBlog} />
					</Toggable>

					<Blogs />
				</div>
			)}
		</div>
	)
}

export default App
