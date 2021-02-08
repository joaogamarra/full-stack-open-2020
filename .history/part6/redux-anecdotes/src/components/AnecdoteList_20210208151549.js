import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
	const dispatch = useDispatch()

	const anecdotes = useSelector((state) => state.anecdotes)
	const filterValue = useSelector((state) => state.filter.value)

	const filteredAnecdotes = () => {
		if (filterValue !== undefined && anecdotes) {
			return anecdotes.filter((anecdote) => {
				return anecdote.content.toLowerCase().includes(filterValue.toLowerCase())
			})
		}

		return anecdotes
	}

	const orderedAnecdotes = [...filteredAnecdotes()].sort((a, b) => b.votes - a.votes)

	const vote = (anecdote) => {
		dispatch(addVote(anecdote))
		dispatch(setNotification(`you voted ${anecdote.content}`))
		setTimeout(() => dispatch(removeNotification()), 5000)
	}

	return (
		<>
			{orderedAnecdotes.map((anecdote) => (
				<div key={anecdote.id}>
					<div>{anecdote.content}</div>
					<div>
						has {anecdote.votes}
						<button onClick={() => vote(anecdote)}>vote</button>
					</div>
				</div>
			))}
		</>
	)
}

export default AnecdoteList
