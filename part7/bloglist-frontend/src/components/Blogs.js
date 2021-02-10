import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initializeBlogs, likeBlog, removeBlog } from '../reducers/blogsReducer'
import { setNotification } from '../reducers/notificationReducer'
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
		dispatch(setNotification('success', `Like added to ${blog.title}`, 5))
	}

	const handleRemove = (blog) => {
		if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
			dispatch(removeBlog(blog))
		}
	}

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

				<Blog key={blog.id} blog={blog} handleLike={handleLike} handleRemove={handleRemove} />
			))}
		</>
	)
}

export default Blogs
