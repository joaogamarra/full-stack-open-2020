const filterReducer = (state = '', action) => {
	switch (action.type) {
		case 'FILTER':
			return action.data
		default:
			return state
	}
}

export const filter = (content) => {
	console.log(content.filter)
	return {
		type: 'FILTER',
		data: content.filter,
	}
}
export default filterReducer
