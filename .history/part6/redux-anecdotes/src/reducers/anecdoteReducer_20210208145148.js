import anecdotesService from '../services/anecdotesService'

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

export const initializeAnecdotes = () => {
	return async (dispatch) => {
		const anecdotes = await anecdotesService.getAll()
		dispatch({
			type: 'INIT_ANECDOTES',
			data: anecdotes,
		})
	}
}

export const createAnecdote = (content) => {
	console.log('file: anecdoteReducer.js ~ line 35 ~ content', content)
	return async (dispatch) => {
		const newAnecdote = await anecdotesService.createNew(content)

		dispatch({
			type: 'NEW_ANECDOTE',
			data: newAnecdote,
		})
	}
}

export const addVote = (id) => {
	return {
		type: 'ADD_VOTE',
		data: { id },
	}
}

export default anecdoteReducer
