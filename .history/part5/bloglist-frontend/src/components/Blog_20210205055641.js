import React from 'react'
import Toggable from './Toggable'
const Blog = ({ blog }) => (
	<div style='border: 1px solid #ccc; padding: 5px;'>
		{console.log(blog)}
		{blog.title} {blog.author}
		<Toggable buttonLabel='View'>
			<p>{blog.url}</p>
			<p>likes {blog.likes}</p>
		</Toggable>
	</div>
)

export default Blog
