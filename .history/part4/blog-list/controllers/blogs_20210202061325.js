const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', (request, response) => {
	Blog.find({}).then((blogs) => {
		response.json(blogs)
	})
})

blogRouter.post('/', (request, response) => {
	let { title, author, url, likes } = request.body

	if (!likes.isInteger()) likes = 0

	console.log(likes)
	const blog = new Blog({ title, author, url, likes })

	blog.save().then((result) => {
		response.status(201).json(result)
	})
})

module.exports = blogRouter
