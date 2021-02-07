const anecdoteReducer = (state = [], action) => {
	switch (action.type) {
		case 'NEW_ANECDOTE':
			return [...state, action.data]
		default:
			return state
	}
}

const generateId = () => Number((Math.random() * 1000000).toFixed(0))

export const createAnecdote = (content) => {
	return {
		type: 'NEW_ANECDOTE',
		data: {
			content,
			votes: 0,
			id: generateId(),
		},
	}
}

export default anecdoteReducer
