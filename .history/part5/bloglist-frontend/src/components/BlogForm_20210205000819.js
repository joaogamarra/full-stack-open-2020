import React, { useState } from 'react'

const blogForm = ({
	handleSubmit,
	handleTitleChange,
	handleAuthorChange,
	handleUrlChange,
	title,
	author,
	url,
}) => {
	const [newBlogTitle, setNewBlogTitle] = useState('')
	const [newBlogAuthor, setNewBlogAuthor] = useState('')
	const [newBlogUrl, setNewBlogUrl] = useState('')

	const addBlog = async (event) => {
		event.preventDefault()

		try {
			const blogObject = {
				title: newBlogTitle,
				author: newBlogAuthor,
				url: newBlogUrl,
			}

			const returnedBlog = await blogService.create(blogObject)
			setBlogs(blogs.concat(returnedBlog))
			handleNotification('success', `a new blog ${returnedBlog.title} added`)
			setNewBlogTitle('')
			setNewBlogAuthor('')
			setNewBlogUrl('')
		} catch (exception) {
			handleNotification('error', exception)
		}
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

export default blogForm
