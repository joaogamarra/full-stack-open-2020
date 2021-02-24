import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
	query {
		allAuthors {
			name
			born
		}
	}
`

export const ALL_BOOKS = gql`
	query ($genre){
		allBooks (genre: $genre){
			title
			author {
				name
			}
			published
			genres
		}
	}
`

export const EDIT_AUTHOR = gql`
	mutation editAuthor($name: String!, $born: Int!) {
		editAuthor(name: $name, setBornTo: $born) {
			name
			born
		}
	}
`

export const LOGIN = gql`
	mutation login($username: String!, $password: String!) {
		login(username: $username, password: $password) {
			value
		}
	}
`
