const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const listData = require('../utils/list_data')

const { initialBlogs, newBlog, newBlogNoLikes } = listData

beforeEach(async () => {
	await Blog.deleteMany({})
	let blogObject = new Blog(initialBlogs[0])
	await blogObject.save()
	blogObject = new Blog(initialBlogs[1])
	await blogObject.save()
})

describe('blog api test', () => {
	test('blogs are returned as json', async () => {
		await api
			.get('/api/blogs')
			.expect(200)
			.expect('Content-Type', /application\/json/)
	})

	test('all blogs are getting returned', async () => {
		const response = await api.get('/api/blogs')

		expect(response.body).toHaveLength(initialBlogs.length)
	})

	test('the first blog is about React Patterns', async () => {
		const response = await api.get('/api/blogs')

		expect(response.body[0].title).toBe('React patterns')
	})

	test('blogs contain property id', async () => {
		const response = await api.get('/api/blogs')

		console.log(response.body[0].id)
		console.log(response.body[0])

		expect(response.body[0].id).toBeDefined()
	})

	test('a valid blog can be added', async () => {
		await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		const response = await api.get('/api/blogs')

		const titles = response.body.map((r) => r.title)

		expect(response.body).toHaveLength(initialBlogs.length + 1)
		expect(titles).toContain('TDD harms architecture')
	})

	test('a blog with no likes defaults to 0', async () => {
		await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		const response = await api.get('/api/blogs')

		expect(response.body[initialBlogs.length + 1].id).toBe(0)
	})
})

afterAll(() => {
	mongoose.connection.close()
})
