import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
	const dispatch = useDispatch()

	const anecdotes = useSelector((state) => state.anecdotes)
	const filter = useSelector((state) => state.filter.value)

	const filteredAnecdotes = () => {
		if (filter === undefined || !anecdotes) {
			return anecdotes
		}

		anecdotes.filter(({ content }) => {
			return content.toLowerCase().includes(filter.toLowerCase())
		})
	}

	console.log(filteredAnecdotes)

	console.log(filter)
	const orderedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes)

	const vote = (id, content) => {
		dispatch(addVote(id))
		dispatch(setNotification(`you voted ${content}`))
		setTimeout(() => dispatch(removeNotification()), 5000)
	}

	return (
		<>
			{orderedAnecdotes.map((anecdote) => (
				<div key={anecdote.id}>
					<div>{anecdote.content}</div>
					<div>
						has {anecdote.votes}
						<button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
					</div>
				</div>
			))}
		</>
	)
}

export default AnecdoteList
