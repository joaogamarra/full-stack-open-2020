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
	const blogMostLikes = blogs.reduce((max, blog) => (max.likes > blog.likes ? max : blog))

	return {
		title: blogMostLikes.title,
		author: blogMostLikes.author,
		likes: blogMostLikes.likes,
	}
}

module.exports = {
	dummy,
	totalLikes,
	favouriteBlog,
}
