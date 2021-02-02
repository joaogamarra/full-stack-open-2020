const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const initialBlogs = [
	{
		title: 'React patterns',
		author: 'Michael Chan',
		url: 'https://reactpatterns.com/',
		likes: 7,
	},
	{
		title: 'Go To Statement Considered Harmful',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
		likes: 5,
	},
]
beforeEach(async () => {
	await Note.deleteMany({})
	let noteObject = new Note(initialNotes[0])
	await noteObject.save()
	noteObject = new Note(initialNotes[1])
	await noteObject.save()
})

test('blogs are returned as json', async () => {
	await api
		.get('/api/blogs')
		.expect(200)
		.expect('Content-Type', /application\/json/)
})

test('there are two blogs', async () => {
	const response = await api.get('/api/blogs')

	expect(response.body).toHaveLength(2)
})

test('the first blog is about HTTP methods', async () => {
	const response = await api.get('/api/blogs')

	expect(response.body[0].content).toBe('HTML is easy')
})

afterAll(() => {
	mongoose.connection.close()
})
