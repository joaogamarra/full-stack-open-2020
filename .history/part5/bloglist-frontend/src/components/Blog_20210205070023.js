import React from 'react'
import Toggable from './Toggable'
const Blog = ({ blog, handleLike }) => (
	<div class='blog-item'>
		{blog.title} {blog.author}
		<Toggable buttonLabel='View'>
			<p>{blog.url}</p>
			<p>
				likes {blog.likes} <button onClick={() => handleLike(blog.id)}>Add Like</button>
			</p>
			<p>{blog.user.name}</p>
		</Toggable>
	</div>
)

export default Blog
