const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const listData = require('../utils/list_data')

const { initialBlogs, newBlog, newBlogNoLikes, newBlogNoTitle, newBlogNoUrl } = listData

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

	test.only('all blogs are getting returned', async () => {
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
			.send(newBlogNoLikes)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		const response = await api.get('/api/blogs')

		expect(response.body[response.body.length - 1].likes).toBe(0)
	})

	test('a blog with no title', async () => {
		await api
			.post('/api/blogs')
			.send(newBlogNoTitle)
			.expect(400)
			.expect('Content-Type', /application\/json/)

		const response = await api.get('/api/blogs')

		expect(response.body).toHaveLength(initialBlogs.length)
	})

	test('a blog with no url', async () => {
		await api
			.post('/api/blogs')
			.send(newBlogNoUrl)
			.expect(400)
			.expect('Content-Type', /application\/json/)

		const response = await api.get('/api/blogs')

		expect(response.body).toHaveLength(initialBlogs.length)
	})
})

afterAll(() => {
	mongoose.connection.close()
})
