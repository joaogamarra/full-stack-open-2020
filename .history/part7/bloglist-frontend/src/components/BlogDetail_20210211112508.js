import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouteMatch } from 'react-router-dom'
import { initializeBlogs } from '../reducers/blogsReducer'

const UserDetail = () => {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(initializeBlogs())
	}, [dispatch])

	const blogs = useSelector((state) => state.blogs)

	const match = useRouteMatch('/blogs/:id')
	const blogDetail = blogs.find((blog) => blog.id === match.params.id)

	const handleLike = (blog) => {
		dispatch(likeBlog(blog))
		dispatch(setNotification('success', `Like added to ${blog.title}`, 5))
	}

	if (!blogDetail) {
		return null
	}
	return (
		<>
			<h2>
				{blogDetail.title} {blogDetail.author}
			</h2>
			<p>{blog.url}</p>
			<p>
				likes {blog.likes} <button onClick={() => handleLike(blog)}>Add Like</button>
			</p>
			<p>added by {blog.user.name}</p>
		</>
	)
}

export default UserDetail
