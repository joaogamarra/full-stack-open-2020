import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
	const dispatch = useDispatch()

	const anecdotes = useSelector((state) => state.anecdotes)
	const filterValue = useSelector((state) => state.filter.value)

	const filteredAnecdotes = () => {
		if (filterValue !== undefined && anecdotes) {
			console.log(filterValue)
			anecdotes.filter((anecdote) => {
				console.log(anecdote.content.toLowerCase())
				return anecdote.content.toLowerCase().includes(filterValue.toLowerCase())
			})
		} else {
			return anecdotes
		}
	}
	console.log(filteredAnecdotes())

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
