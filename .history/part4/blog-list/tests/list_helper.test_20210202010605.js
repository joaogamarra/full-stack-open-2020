const listHelper = require('../utils/list_helper')
const listData = require('../utils/list_data')

test('dummy returns one', () => {
	const blogs = []

	const result = listHelper.dummy(blogs)
	expect(result).toBe(1)
})

describe('total likes', () => {
	test('when list has only one blog, equals the likes of that', () => {
		const result = listHelper.totalLikes(listData.listWithOneBlog)
		expect(result).toBe(5)
	})
})

describe('total likes', () => {
	test('when list has multiples blogs, return blog with most likes', () => {
		const result = listHelper.favouriteBlog(listData.listWithMultipleBlogs)
		const example = {
			title: 'Canonical string reduction',
			author: 'Edsger W. Dijkstra',
			likes: 12,
		}

		expect(result).toEqual(example)
	})
})

describe('most blogs', () => {
	test.only('when list has multiples blogs, return author with most blogs', () => {
		const result = listHelper.mostBlogs(listData.listWithMultipleBlogs)
		const example = {
			author: 'Robert C. Martin',
			blogs: 3,
		}

		expect(result).toEqual(example)
	})
})

describe('most likes', () => {
	test.only('when list has multiples blogs, return author with most likes', () => {
		const result = listHelper.mostLikes(listData.listWithMultipleBlogs)
		const example = {
			author: 'Edsger W. Dijkstra',
			likes: 17,
		}

		expect(result).toEqual(example)
	})
})
