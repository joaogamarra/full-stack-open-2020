import React, { useState, useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import Blogs from './components/Blogs'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Toggable from './components/Toggable'
import Users from './components/Users'
import UserDetail from './components/UserDetail'
import BlogDetail from './components/BlogDetail'
import Menu from './components/Menu'
import { useSelector, useDispatch } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { setLoggedUser } from './reducers/loginReducer'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const user = useSelector((state) => state.sessionUser)

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
			dispatch(setLoggedUser(user))
			blogService.setToken(user.token)
		}
	}, [dispatch])

	const handleLogin = async (event) => {
		event.preventDefault()

		try {
			const user = await loginService.login({
				username,
				password,
			})
			window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))

			dispatch(setLoggedUser(user))
			setUsername('')
			setPassword('')
		} catch (exception) {
			dispatch(setNotification('error', 'wrong username or password', 5))
		}
	}

	const handleLogout = () => {
		window.localStorage.removeItem('loggedBlogUser')
		dispatch(setLoggedUser(null))
	}

	const createBlog = async (blogObject) => {
		try {
			blogFormRef.current.toggleVisibility()
			const returnedBlog = await blogService.create(blogObject)
			setBlogs(blogs.concat(returnedBlog))
			dispatch(setNotification('success', `a new blog ${returnedBlog.title} added`, 5))
		} catch (exception) {
			dispatch(setNotification('error', exception, 5))
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
		<>
			{user === null ? (
				<div>
					{loginForm()}
					<Notification />
				</div>
			) : (
				<div>
					<Menu />
					<p>
						{user.name} logged-in <button onClick={handleLogout}>logout</button>
					</p>
					<Notification />

					<Switch>
						<Route path='/users/:id'>
							<UserDetail />
						</Route>
						<Route path='/users'>
							<Users />
						</Route>
						<Route path='/blogs/:id'>
							<BlogDetail />
						</Route>
						<Route path='/'>
							<Toggable buttonLabel='new blog' ref={blogFormRef}>
								<BlogForm createBlog={createBlog} />
							</Toggable>

							<Blogs />
						</Route>
					</Switch>
				</div>
			)}
		</>
	)
}

export default App
