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
	return blogs.reduce((max, blog) => (max.votes > blog.votes ? max : blog))
}

module.exports = {
	dummy,
	totalLikes,
	favouriteBlog,
}
