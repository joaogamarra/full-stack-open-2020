const blog = require('../models/blog')

const dummy = (blogs) => {
	return 1
}

const totalLikes = (blogs) => {
	const reducer = (accumulator, blog) => {
		return accumulator + blog.likes
	}
	console.log('file: list_helper.js ~ line 10 ~ reducer', blogs.reduce(reducer, 0))

	return blogs.reduce(reducer, 0)
}

module.exports = {
	dummy,
	totalLikes,
}
