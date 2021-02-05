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

	const [newBlogTitle, setNewBlogTitle] = useState('')
	const [newBlogAuthor, setNewBlogAuthor] = useState('')
	const [newBlogUrl, setNewBlogUrl] = useState('')

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

	const addBlog = async (event) => {
		event.preventDefault()

		try {
			const blogObject = {
				title: newBlogTitle,
				author: newBlogAuthor,
				url: newBlogUrl,
			}

			const returnedBlog = await blogService.create(blogObject)
			setBlogs(blogs.concat(returnedBlog))
			handleNotification('success', `a new blog ${returnedBlog.title} added`)
			setNewBlogTitle('')
			setNewBlogAuthor('')
			setNewBlogUrl('')
		} catch (exception) {
			handleNotification('error', exception)
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
					<Toggable buttonLabel='new blog'>
						<BlogForm
							handleSubmit={addBlog}
							title={newBlogTitle}
							author={newBlogAuthor}
							url={newBlogUrl}
							handleTitleChange={({ target }) => setNewBlogTitle(target.value)}
							handleAuthorChange={({ target }) => setNewBlogAuthor(target.value)}
							handleUrlChange={({ target }) => setNewBlogUrl(target.value)}
						/>
					</Toggable>

					{blogs.map((blog) => (
						<Blog key={blog.id} blog={blog} />
					))}
				</div>
			)}
		</div>
	)
}

export default App
