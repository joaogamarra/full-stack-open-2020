const anecdoteReducer = (state = [], action) => {
	switch (action.type) {
		case 'INIT_ANECDOTES':
			return action.data
		case 'NEW_ANECDOTE':
			return [...state, action.data]
		case 'ADD_VOTE':
			const id = action.data.id
			const anecdoteToChange = state.find((a) => a.id === id)
			const changedAnecdote = {
				...anecdoteToChange,
				votes: anecdoteToChange.votes + 1,
			}
			return state.map((anecdote) => (anecdote.id !== id ? anecdote : changedAnecdote))
		default:
			return state
	}
}

export const initializeAnecdotes = (content) => {
	return {
		type: 'INIT_ANECDOTES',
		data: content,
	}
}

export const createAnecdote = (content) => {
	return {
		type: 'NEW_ANECDOTE',
		data: {
			content,
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
