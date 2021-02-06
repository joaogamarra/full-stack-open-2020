import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

test('Form calls event handler with form content', () => {
	const createBlog = jest.fn()

	const component = render(<BlogForm createBlog={createBlog} />)

	const title = component.container.querySelector('#blog-title')
	const author = component.container.querySelector('#blog-author')
	const url = component.container.querySelector('#blog-url')
	const form = component.container.querySelector('#blog-form')

	fireEvent.change(title, {
		target: { value: 'Component testing is done with react-testing-library' },
	})
	fireEvent.change(author, {
		target: { value: 'Test Author' },
	})
	fireEvent.change(url, {
		target: { value: 'http://:www.test.com' },
	})
	fireEvent.submit(form)

	expect(addBlog.mock.calls).toHaveLength(1)
	expect(addBlog.mock.calls[0][0].title).toBe('Component testing is done with react-testing-library')
	expect(addBlog.mock.calls[0][0].author).toBe('Test Author')
	expect(addBlog.mock.calls[0][0].url).toBe('http://:www.test.com')
})
