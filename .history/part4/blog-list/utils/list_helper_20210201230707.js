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
	const example = {
		title: 'Canonical string reduction',
		author: 'Edsger W. Dijkstra',
		likes: 12,
	}
}

module.exports = {
	dummy,
	totalLikes,
	favouriteBlog,
}
