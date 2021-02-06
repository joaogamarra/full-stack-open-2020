import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
	const blog = {
		title: 'Component testing is done with react-testing-library',
		author: 'test author',
		url: 'http:www.test.com',
		likes: 0,
		user: {
			blogs: ['601c9234ada6c57092104a08'],
			id: '601b4fe606b397587ef8c681',
			name: 'Mr Test Auth',
			username: 'test',
		},
	}

	const component = render(<Blog blog={blog} />)
	const blogItem = component.container.querySelector('.blog-item')
	const blogItemHidden = component.container.querySelector('.blog-hidden-content')

	expect(blogItem).toHaveTextContent('Component testing is done with react-testing-library')
	expect(blogItem).not.toHaveStyle('display: none')
	expect(blogItemHidden).not.toHaveStyle('display: none')
})
