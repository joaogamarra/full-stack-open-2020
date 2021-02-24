import React, { useState, useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
	const [genres, setGenres] = useState([])
	const [genre, setGenre] = useState('')

	let result = useQuery(ALL_BOOKS, {
		pollInterval: 3000,
	})

	const [resultFilter] = useLazyQuery(ALL_BOOKS)

	useEffect(() => {
		result.data?.allBooks.forEach((book) => {
			book.genres.forEach((genre) => {
				if (!genres.includes(genre)) setGenres(genres.concat(genre))
			})
		})
	}, [result, genres])

	const genreFilter = (e) => {
		setGenre(e.target.value)
		resultFilter({ variables: { genre: e.target.value } })
		console.log(e.target.value)
	}

	if (!props.show) {
		return null
	}

	return (
		<div>
			<h2>books</h2>

			<table>
				<tbody>
					<tr>
						<th>name</th>
						<th>author</th>
						<th>published</th>
					</tr>
					{resultFilter.data &&
						resultFilter.data.allBooks.map((a) => (
							<tr key={a.title}>
								<td>{a.title}</td>
								<td>{a.author.name}</td>
								<td>{a.published}</td>
							</tr>
						))}
					{!resultFilter.data &&
						result.data.allBooks.map((a) => (
							<tr key={a.title}>
								<td>{a.title}</td>
								<td>{a.author.name}</td>
								<td>{a.published}</td>
							</tr>
						))}
				</tbody>
			</table>

			{genres.map((genre) => (
				<button onClick={genreFilter} value={genre} key={genre}>
					{genre}
				</button>
			))}
		</div>
	)
}

export default Books
