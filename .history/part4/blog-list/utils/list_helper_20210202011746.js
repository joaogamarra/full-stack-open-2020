const blog = require('../models/blog')
var _ = require('lodash')

const dummy = () => {
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
	let maxBlogs = {
		author: null,
		blogs: null,
	}

	for (let key in groupByAuthor) {
		const currentBlogs = groupByAuthor[key].length
		if (currentBlogs > maxBlogs.blogs) {
			maxBlogs = {
				author: groupByAuthor[key][0].author,
				blogs: currentBlogs,
			}
		}
	}

	return maxBlogs
}

const mostLikes = (blogs) => {
	const groupByAuthor = _.groupBy(blogs, 'author')
	let maxLikes = {
		author: null,
		likes: null,
	}

	for (let key in groupByAuthor) {
		const currentLikes = groupByAuthor[key].reduce((accumulator, author) => accumulator + author.likes, 0)

		if (currentLikes > maxLikes.likes) {
			maxLikes = {
				author: groupByAuthor[key][0].author,
				likes: currentLikes,
			}
		}
	}

	return maxLikes
}

module.exports = {
	dummy,
	totalLikes,
	favouriteBlog,
	mostBlogs,
	mostLikes,
}
