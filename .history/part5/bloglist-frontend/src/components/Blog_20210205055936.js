import React from 'react'
import Toggable from './Toggable'
const Blog = ({ blog }) => (
	<div class='blog-item'>
		{console.log(blog)}
		{blog.title} {blog.author}
		<Toggable buttonLabel='View'>
			<p>{blog.url}</p>
			<p>likes {blog.likes}</p>
			<p>{blog.user.name}</p>
		</Toggable>
	</div>
)

export default Blog
