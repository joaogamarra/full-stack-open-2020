const blog = require('../models/blog')

const dummy = (blogs) => {
	return 1
}

const totalLikes = (blogs) => {
	console.log('-list-helper')
	const reducer = (accumulator, blog) => accumulator + blog.likes

	return blogs.reduce(reducer)
}

module.exports = {
	dummy,
	totalLikes,
}
