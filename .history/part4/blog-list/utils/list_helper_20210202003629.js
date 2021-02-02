const blog = require('../models/blog')
var _ = require('lodash')

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

const mostBlogs = (blogs) => {
	const groupByAuthor = _.groupBy(blogs, 'author')
	let mostBlogs = {
		author: null,
		blogs: null,
	}

	for (let key in groupByAuthor) {
		console.log(groupByAuthor[key].length)
	}
}

module.exports = {
	dummy,
	totalLikes,
	favouriteBlog,
}
