import blogsService from '../services/blogs'

const blogsReducer = (state = [], action) => {
	switch (action.type) {
		case 'INIT_BLOGS':
			return action.data
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

export default blogsReducer
