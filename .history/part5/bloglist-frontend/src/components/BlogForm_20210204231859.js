import React from 'react'

const blogForm = ({
	handleSubmit,
	handleTitleChange,
	handleAuthorChange,
	handleUrlChange,
	title,
	author,
	url,
}) => (
	<div>
		<h3>create new</h3>
		<form onSubmit={handleSubmit}>
			<label>Title</label>
			<input value={title} onChange={handleTitleChange} />
			<label>Author</label>
			<input value={author} onChange={handleAuthorChange} />
			<label>Url</label>
			<input value={url} onChange={handleUrlChange} />
			<button type='submit'>save</button>
		</form>
	</div>
)

export default blogForm
