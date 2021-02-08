import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
	const dispatch = useDispatch()

	const addAnecdote = async (event) => {
		event.preventDefault()
		const content = event.target.anecdote.value
		console.log('file: anecdoteForm.js ~ line 11 ~ content', content)

		dispatch(createAnecdote(content))
		event.target.anecdote.value = ''

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
