const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({}).populate('user')
	if (blogs) {
		response.json(blogs)
	} else {
		response.status(404).end()
	}
})

blogRouter.post('/', async (request, response) => {
	const { title, author, url } = request.body
	const decodedToken = jwt.verify(request.token, process.env.SECRET)
	console.log(request)
	if (!request.token || !decodedToken.id) {
		return response.status(401).json({ error: 'token missing or invalid' })
	}
	const user = await User.findById(decodedToken.id)

	if (!title) return response.status(400).json({ error: 'Title is required' })
	if (!url) return response.status(400).json({ error: 'URL is required' })

	const blog = new Blog({ title, author, url, likes: 0, user: user._id })

	const blogSave = await blog.save()
	user.blogs = user.blogs.concat(blogSave._id)
	await user.save()

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

blogRouter.put('/:id', async (request, response) => {
	const { body } = request
	const blog = await Blog.findById(request.params.id)
	if (blog) {
		blog.likes = body.likes
		await blog.save()
		response.json(blog)
	} else {
		response.status(404).end()
	}
})

blogRouter.delete('/:id', async (request, response) => {
	const decodedToken = jwt.verify(request.token, process.env.SECRET)

	const blog = await Blog.findById(request.params.id)

	if (decodedToken.id !== blog.user.toString()) {
		return response.status(401).json({ error: 'invalid token' })
	}

	await Blog.findByIdAndRemove(request.params.id)
	response.status(204).end()
})

module.exports = blogRouter
