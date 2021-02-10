import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initializeBlogs, likeBlog } from '../reducers/blogsReducer'
import { setNotification } from './reducers/notificationReducer'
import Blog from './Blog'

const Blogs = () => {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(initializeBlogs())
	}, [dispatch])

	const blogs = useSelector((state) => state.blogs)

	const orderedBlogs = blogs.sort((a, b) => b.likes - a.likes)

	const handleLike = (blog) => {
		dispatch(likeBlog(blog))
		dispatch(setNotification(`Like added to ${blog.title}`))
	}

	/*
	const handleRemove = async (id, title, author) => {
		if (window.confirm(`Remove blog ${title} by ${author}`)) {
			try {
				await blogService.remove(id)
				setBlogs(blogs.filter((b) => b.id !== id))
			} catch (exception) {
				dispatch(setNotification(exception, 5))
			}
		}
	} */

	return (
		<>
			{orderedBlogs.map((blog) => (
				/* <Blog
					key={blog.id}
					blog={blog}
					handleLike={}
					handleRemove={}
					username={user.username}
				/> */

				<Blog key={blog.id} blog={blog} handleLike={handleLike} />
			))}
		</>
	)
}

export default Blogs
