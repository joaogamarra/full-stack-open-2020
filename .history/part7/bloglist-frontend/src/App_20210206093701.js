import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Toggable from './components/Toggable'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [user, setUser] = useState(null)
	const [notificationStatus, setNotificationStatus] = useState(null)
	const [notificationMessage, setNotificationMessage] = useState(null)
	const orderedBlogs = blogs.sort((a, b) => b.likes - a.likes)

	const blogFormRef = React.createRef()

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
			handleNotification('error', 'wrong username or password')
		}
	}

	const handleLogout = () => {
		window.localStorage.removeItem('loggedBlogUser')
		setUser(null)
	}

	const handleNotification = (status, message) => {
		setNotificationStatus(status)
		setNotificationMessage(message)
		setTimeout(() => {
			setNotificationMessage(null)
		}, 4000)
	}

	const createBlog = async (blogObject) => {
		try {
			blogFormRef.current.toggleVisibility()
			const returnedBlog = await blogService.create(blogObject)
			setBlogs(blogs.concat(returnedBlog))
			handleNotification('success', `a new blog ${returnedBlog.title} added`)
		} catch (exception) {
			handleNotification('error', exception)
		}
	}

	const handleLike = async (id) => {
		console.log(id)
		try {
			const blog = blogs.find((b) => b.id === id)
			const changedBlog = { ...blog, likes: blog.likes + 1 }
			await blogService.update(id, changedBlog)
			setBlogs(blogs.map((item) => (item.id !== id ? item : changedBlog)))
		} catch (exception) {
			handleNotification('error', exception)
		}
	}

	const handleRemove = async (id, title, author) => {
		if (window.confirm(`Remove blog ${title} by ${author}`)) {
			try {
				await blogService.remove(id)
				setBlogs(blogs.filter((b) => b.id !== id))
			} catch (exception) {
				handleNotification('error', exception)
			}
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
					<Notification status={notificationStatus} message={notificationMessage} />
				</div>
			) : (
				<div>
					<p>
						{user.name} logged-in <button onClick={handleLogout}>logout</button>
					</p>
					<Notification status={notificationStatus} message={notificationMessage} />
					<Toggable buttonLabel='new blog' ref={blogFormRef}>
						<BlogForm createBlog={createBlog} />
					</Toggable>

					{orderedBlogs.map((blog) => (
						<Blog
							key={blog.id}
							blog={blog}
							handleLike={handleLike}
							handleRemove={handleRemove}
							username={user.username}
						/>
					))}
				</div>
			)}
		</div>
	)
}

export default App
