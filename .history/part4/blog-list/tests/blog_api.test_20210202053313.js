const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const listData = require('../utils/list_data')

const initialBlogs = listData.listWithMultipleBlogs

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

	test('there are two blogs', async () => {
		const response = await api.get('/api/blogs')

		expect(response.body[0].id).toBeDefined()
	})

	test('the first blog is about React Patterns', async () => {
		const response = await api.get('/api/blogs')

		expect(response.body[0].title).toBe('React patterns')
	})

	test('blogs contain property id', async () => {
		const response = await api.get('/api/blogs')

		expect(response.body).toHaveLength(initialBlogs.length)
	})
})

afterAll(() => {
	mongoose.connection.close()
})
