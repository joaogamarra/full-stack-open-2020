import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'
import anecdotesService from '../services/anecdotesService'

const AnecdoteForm = () => {
	const dispatch = useDispatch()

	const addAnecdote = async (event) => {
		event.preventDefault()
		const content = event.target.anecdote.value
		event.target.anecdote.value = ''
		console.log(content)
		const newAnecdote = await anecdotesService.createNew(content)
		console.log('file: anecdoteForm.js ~ line 15 ~ newAnecdote', newAnecdote)
		dispatch(createAnecdote(newAnecdote))
		dispatch(setNotification(`you created ${content}`))
		setTimeout(() => dispatch(removeNotification()), 5000)
	}

	return (
		<>
			<h2>create new</h2>
			<form onSubmit={addAnecdote}>
				<div>
					<input name='anecdote' />
				</div>
				<button>create</button>
			</form>
		</>
	)
}

export default AnecdoteForm
