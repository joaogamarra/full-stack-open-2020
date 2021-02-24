import React from 'react'
import ReactDOM from 'react-dom'
import Header from './components/Header'
import Content from './components/Content'

const App: React.FC = () => {
	const courseName = 'Half Stack application development'
	const courseParts = [
		{
			name: 'Fundamentals',
			exerciseCount: 10,
		},
		{
			name: 'Using props to pass data',
			exerciseCount: 7,
		},
		{
			name: 'Deeper type usage',
			exerciseCount: 14,
		},
	]

	return (
		<div>
			<Header courseName={courseName} />
			<Content courseParts={courseParts} />
			<p>Number of exercises {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}</p>
		</div>
	)
}

ReactDOM.render(<App />, document.getElementById('root'))