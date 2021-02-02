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

blogRouter.post('/', (request, response) => {
	const { title, author, url, likes } = request.body

	console.log(likes)
	const blog = new Blog({ title, author, url, likes: 0 })

	blog.save().then((result) => {
		response.status(201).json(result)
	})
})

module.exports = blogRouter
