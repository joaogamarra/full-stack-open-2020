import React from 'react'
import Toggable from './Toggable'
const Blog = ({ blog, handleLike, handleRemove, username }) => {
	const isUser = username === blog.user.id
	let removeButton

	if (isUser) {
		removeButton = <button onClick={() => handleRemove(blog.id, blog.title, blog.author)}>Remove</button>
	}

	return (
		<div className='blog-item'>
			{console.log(blog)}
			{blog.title} {blog.author}
			<Toggable buttonLabel='View'>
				<p>{blog.url}</p>
				<p>
					likes {blog.likes} <button onClick={() => handleLike(blog.id)}>Add Like</button>
				</p>
				<p>{blog.user.name}</p>
				{removeButton}
			</Toggable>
		</div>
	)
}

export default Blog
