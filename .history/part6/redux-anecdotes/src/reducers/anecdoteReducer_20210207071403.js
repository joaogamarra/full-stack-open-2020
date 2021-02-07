const anecdoteReducer = (state = [], action) => {
	switch (action.type) {
		case 'NEW_ANECDOTE':
			return [...state, action.data]
		case 'ADD_VOTE':
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

export const addVote = (id) => {
	return {
		type: 'ADD_VOTE',
		data: { id },
	}
}

export default anecdoteReducer
