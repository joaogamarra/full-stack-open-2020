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
	test.only('when list has multiples blogs, return blog with most likes', () => {
		const result = listHelper.favouriteBlog(listData.listWithOneBlog)
		const example = {
			title: 'Canonical string reduction',
			author: 'Edsger W. Dijkstra',
			likes: 12,
		}

		expect(result).toEqual(example)
	})
})
