const listHelper = require('../utils/list_helper')
const listData = require('../utils/list_data')

test('dummy returns one', () => {
	const blogs = []

	const result = listHelper.dummy(blogs)
	expect(result).toBe(1)
})

describe('total likes', () => {
	test.only('when list has only one blog, equals the likes of that', () => {
		const result = listHelper.totalLikes(listData.listWithOneBlog)
		expect(result).toBe(5)
	})
})
