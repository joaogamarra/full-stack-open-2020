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
	return async (dispatch) => {
		const newAnecdote = await anecdotesService.createNew(content)

		dispatch({
			type: 'NEW_ANECDOTE',
			data: newAnecdote,
		})
	}
}

export const addVote = (anecdote) => {
	return async (dispatch) => {
		const updatedAnecdote = {
			...anecdote,
			votes: anecdote.votes + 1,
		}
		const newAnecdote = await anecdotesService.update(updatedAnecdote)
		const { id } = newAnecdote
		dispatch({
			type: 'NEW_ANECDOTE',
			data: { id },
		})
	}
}

export default anecdoteReducer
