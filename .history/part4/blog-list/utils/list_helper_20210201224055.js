const blog = require('../models/blog')

const dummy = (blogs) => {
	return 1
}

const totalLikes = (blogs) => {
	const reducer = (accumulator, blog) => accumulator + blog.likes
	console.log('file: list_helper.js ~ line 10 ~ reducer', reducer)

	return blogs.reduce(reducer)
}

module.exports = {
	dummy,
	totalLikes,
}
