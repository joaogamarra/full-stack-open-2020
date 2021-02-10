import blogsService from '../services/blogs'

const blogsReducer = (state = [], action) => {
	switch (action.type) {
		case 'INIT_BLOGS':
			return action.data
		case 'ADD_VOTE':
			const id = action.data.id
			const blogToChange = state.find((b) => b.id === id)
			const changedBlog = {
				...blogToChange,
				votes: blogToChange.votes + 1,
			}
			return state.map((blog) => (blog.id !== id ? blog : changedBlog))
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
			votes: blog.votes + 1,
		}

		const newBlog = await blogsService.update(blog.id)
		const { id } = newBlog
		dispatch({
			type: 'ADD_VOTE',
			data: { id },
		})
	}
}

export default blogsReducer
