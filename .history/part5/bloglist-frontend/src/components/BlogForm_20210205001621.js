import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
	const [newBlogTitle, setNewBlogTitle] = useState('')
	const [newBlogAuthor, setNewBlogAuthor] = useState('')
	const [newBlogUrl, setNewBlogUrl] = useState('')

	const addBlog = async (event) => {
		event.preventDefault()
		createBlog({
			title: newBlogTitle,
			author: newBlogAuthor,
			url: newBlogUrl,
		})

		setNewBlogTitle('')
		setNewBlogAuthor('')
		setNewBlogUrl('')
	}

	return (
		<div>
			<h3>create new</h3>
			<form onSubmit={addBlog}>
				<label>Title</label>
				<input value={newBlogTitle} onChange={({ target }) => setNewBlogTitle(target.value)} />
				<label>Author</label>
				<input value={newBlogAuthor} onChange={({ target }) => setNewBlogAuthor(target.value)} />
				<label>Url</label>
				<input value={newBlogUrl} onChange={({ target }) => setNewBlogUrl(target.value)} />
				<button type='submit'>save</button>
			</form>
		</div>
	)
}

export default BlogForm
