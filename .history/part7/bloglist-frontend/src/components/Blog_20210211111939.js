import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Toggable from './Toggable'

const Blog = ({ blog, handleLike, handleRemove }) => {
	let removeButton

	const username = useSelector((state) => state.sessionUser.username)

	if (username === blog.user.username) {
		removeButton = <button onClick={() => handleRemove(blog)}>Remove</button>
	}

	return (
		<div className='blog-item'>
			<Link To={`/blogs/${blog.id}`}>
				{' '}
				{blog.title} {blog.author}
			</Link>
			<Toggable buttonLabel='View'>
				<p>{blog.url}</p>
				<p>
					likes {blog.likes} <button onClick={() => handleLike(blog)}>Add Like</button>
				</p>
				<p>{blog.user.name}</p>
				{removeButton}
			</Toggable>
		</div>
	)
}

export default Blog
