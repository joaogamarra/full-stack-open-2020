import { useSelector, useDispatch } from 'react-redux'
import { addVote } from './reducers/anecdoteReducer'
import moduleName from './components/AnecdoteForm'
import AnecdoteForm from './components/AnecdoteForm'

const App = () => {
	const anecdotes = useSelector((state) => state)
	const orderedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes)
	const dispatch = useDispatch()

	const vote = (id) => {
		dispatch(addVote(id))
	}

	return (
		<div>
			<h2>Anecdotes</h2>
			{orderedAnecdotes.map((anecdote) => (
				<div key={anecdote.id}>
					<div>{anecdote.content}</div>
					<div>
						has {anecdote.votes}
						<button onClick={() => vote(anecdote.id)}>vote</button>
					</div>
				</div>
			))}
			<AnecdoteForm />
		</div>
	)
}

export default App
