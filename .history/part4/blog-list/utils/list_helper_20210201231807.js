const blog = require('../models/blog')

const dummy = (blogs) => {
	return 1
}

const totalLikes = (blogs) => {
	const reducer = (accumulator, blog) => {
		return accumulator + blog.likes
	}

	return blogs.reduce(reducer, 0)
}

const favouriteBlog = (blogs) => {
	return Math.max.apply(
		Math,
		blogs.map((blog) => {
			return {
				title: blog.title,
				author: blog.author,
				likes: blog.likes,
			}
		})
	)
}

module.exports = {
	dummy,
	totalLikes,
	favouriteBlog,
}
