const filterReducer = (state = '', action) => {
	switch (action.type) {
		case 'FILTER':
			return action.data
		default:
			return state
	}
}

export const filter = (content) => {
	console.log(content)
	return {
		type: 'FILTER',
		data: {
			filter: content,
		},
	}
}
export default filterReducer
