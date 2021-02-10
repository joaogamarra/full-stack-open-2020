import blogsService from '../services/blogs'

const blogsReducer = (state = [], action) => {
	switch (action.type) {
		case 'INIT_BLOGS':
			return action.data
		case 'ADD_LIKE':
			const id = action.data.id
			const blogToChange = state.find((b) => b.id === id)
			const changedBlog = {
				...blogToChange,
				likes: blogToChange.likes + 1,
			}
			return state.map((blog) => (blog.id !== id ? blog : changedBlog))

		case 'REMOVE_BLOG':
			return state.filter((b) => b.id !== action.data.id)
		default:
			return state
	}
}

export const initializeBlogs = () => {
	return async (dispatch) => {
		const blogs = await blogsService.getAll()
		dispatch({
			type: 'INIT_BLOGS',
			data: blogs,
		})
	}
}

export const likeBlog = (blog) => {
	return async (dispatch) => {
		const updatedBlog = {
			...blog,
			likes: blog.likes + 1,
		}

		const newBlog = await blogsService.update(updatedBlog)
		const { id } = newBlog
		dispatch({
			type: 'ADD_LIKE',
			data: { id },
		})
	}
}

export const removeBlog = async (blog) => {
	await blogService.remove(blog.id)
	dispatch({
		type: 'REMOVE_BLOG',
		data: { id },
	})
}

export default blogsReducer
