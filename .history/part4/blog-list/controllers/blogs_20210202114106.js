const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({})
	if (blogs) {
		response.json(blogs)
	} else {
		response.status(404).end()
	}
})

blogRouter.post('/', async (request, response) => {
	const { title, author, url } = request.body

	if (!title) return response.status(400).json({ error: 'Title is required' })
	if (!url) return response.status(400).json({ error: 'URL is required' })

	const blog = new Blog({ title, author, url, likes: 0 })

	const blogSave = await blog.save()
	response.status(201).json(blogSave)
})

blogRouter.get('/:id', async (request, response) => {
	const blog = await Blog.findById(request.params.id)
	if (blog) {
		response.json(blog)
	} else {
		response.status(404).end()
	}
})

module.exports = blogRouter
