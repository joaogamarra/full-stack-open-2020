const { ApolloServer, gql } = require('apollo-server')

const typeDefs = gql`
	type Author {
		name: String!
		born: Int
		bookCount: Int
		id: ID!
	}

	type Book {
		title: String!
		published: Int!
		author: String!
		id: ID!
		genres: [String!]!
	}

	type Query {
		authorCount: Int!
		allAuthors: [Author!]!
		bookCount: Int!
		allBooks(author: String, genre: String): [Book!]!
	}

	type Mutation {
		addBook(title: String!, published: Int!, author: String!, genres: [String!]!): Book
		editAuthor(name: String!, setBornTo: Int!): Author
	}
`

const { v1: uuid } = require('uuid')

const resolvers = {
	Query: {
		authorCount: () => authors.length,
		allAuthors: () => authors,
		bookCount: () => books.length,
		allBooks: (root, { author, genre }) => {
			if (author && genre) return books.filter((b) => b.author === author && b.genres.includes(genre))
			if (author) return books.filter((b) => b.author === author)
			if (genre) return books.filter((b) => b.genres.includes(genre))

			return books
		},
	},

	Mutation: {
		addBook: (root, args) => {
			const book = { ...args, id: uuid() }
			if (!authors.find((a) => a.name === book.author)) {
				authors = authors.concat({ name: book.author, id: uuid() })
			}
			console.log(book)
			books = books.concat(book)
			return book
		},

		editAuthor: (root, { name, setBornTo }) => {
			const author = authors.find((a) => a.name === name)
			if (!author) return null

			const updatedAuthor = { ...author, born: setBornTo }
			authors = authors.map((a) => (a.name === name ? updatedAuthor : a))
			return updatedAuthor
		},
	},

	Author: {
		bookCount: ({ name }) => books.filter((b) => b.author === name).length,
	},
}

const server = new ApolloServer({
	typeDefs,
	resolvers,
})

server.listen().then(({ url }) => {
	console.log(`Server ready at ${url}`)
})
