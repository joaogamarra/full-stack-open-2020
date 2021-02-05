import React from 'react'
import Toggable from './Toggable'
const Blog = ({ blog, handleLike, handleRemove, username }) => {
	const removeButton = username === blog.user.id

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
				<button onClick={() => handleRemove(blog.id, blog.title, blog.author)}>Remove</button>
			</Toggable>
		</div>
	)
}

export default Blog
