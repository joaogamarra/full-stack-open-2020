import React from 'react'
import Toggable from './Toggable'
const Blog = ({ blog, handleLike, handleRemove, username }) => {
	console.log('file: Blog.js ~ line 4 ~ blog', blog)
	let removeButton

	if (username === blog.user.username) {
		removeButton = <button onClick={() => handleRemove(blog.id, blog.title, blog.author)}>Remove</button>
	}

	return (
		<div className='blog-item'>
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
