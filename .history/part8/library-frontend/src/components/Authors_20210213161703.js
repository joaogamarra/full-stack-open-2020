import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const Authors = (props) => {
	const [name, setAuthorName] = useState('')
	const [born, setAuthorBirth] = useState('')
	const result = useQuery(ALL_AUTHORS, {
		pollInterval: 2000,
	})

	const [editAuthor] = useMutation(EDIT_AUTHOR)

	const handleSubmit = (e) => {
		e.preventDefault()

		if (name === '') setAuthorName(result.data.allAuthors[0].name)

		editAuthor({ variables: { name, born } })
	}

	if (!props.show) {
		return null
	}

	if (result.loading) {
		return <div>loading...</div>
	}

	return (
		<div>
			<h2>authors</h2>
			<table>
				<tbody>
					<tr>
						<th>name</th>
						<th>born</th>
						<th>books</th>
					</tr>
					{result.data.allAuthors.map((a) => (
						<tr key={a.name}>
							<td>{a.name}</td>
							<td>{a.born}</td>
							<td>{a.bookCount}</td>
						</tr>
					))}
				</tbody>
			</table>
			{props.token && (
				<>
					<h4>Set birthyear</h4>
					<form onSubmit={handleSubmit}>
						<select name='authorName' onChange={({ target }) => setAuthorName(target.value)}>
							{result.data.allAuthors.map((a) => (
								<option key={a.name} value={a.name}>
									{a.name}
								</option>
							))}
						</select>
						<input
							type='number'
							name='authorBirth'
							value={born}
							onChange={({ target }) => setAuthorBirth(parseInt(target.value))}
						/>
						<input type='submit' />
					</form>
				</>
			)}
		</div>
	)
}

export default Authors
