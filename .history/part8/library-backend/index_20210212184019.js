const { ApolloServer, UserInputError, gql } = require('apollo-server')
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')

const MONGODB_URI =
	'mongodb+srv://fullstack:nSeXBdwdxp3a321i@cluster0.wbrto.mongodb.net/phonebook?retryWrites=true&w=majority'

console.log('connecting to', MONGODB_URI)

mongoose
	.connect(MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true,
	})
	.then(() => {
		console.log('connected to MongoDB')
	})
	.catch((error) => {
		console.log('error connection to MongoDB:', error.message)
	})

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
		author: Author!
		id: ID!
		genres: [String!]!
	}

	type User {
		username: String!
		favoriteGenre: String!
		id: ID!
	}

	type Token {
		value: String!
	}

	type Query {
		authorCount: Int!
		allAuthors: [Author!]!
		bookCount: Int!
		allBooks(author: String, genre: String): [Book!]!
		me: User
	}

	type Mutation {
		addBook(title: String!, published: Int!, author: String!, genres: [String!]!): Book
		editAuthor(name: String!, setBornTo: Int!): Author
		createUser(username: String!, favoriteGenre: String!): User
		login(username: String!, password: String!): Token
	}
`

const resolvers = {
	Query: {
		authorCount: () => Author.collection.countDocuments(),
		allAuthors: async () => {
			await Author.find({})
		},
		bookCount: () => Author.collection.countDocuments(),
		allBooks: (root, { author, genre }) => {
			if (author && genre) return books.filter((b) => b.author === author && b.genres.includes(genre))
			if (author) return books.filter((b) => b.author === author)
			if (genre) return Book.find({ genres: { $in: genre } })

			return Book.find({}).populate('author')
		},
	},

	Mutation: {
		addBook: async (root, args) => {
			const authorId = mongoose.Types.ObjectId()
			const book = new Book({ ...args, author: authorId })
			console.log(authorId)

			author = new Author({
				name: args.author,
				born: null,
				bookCount: 1,
				_id: authorId,
				books: [book._id],
			})
			try {
				await author.save()
				await book.save()
			} catch (error) {
				throw new UserInputError(error.message, {
					invalidArgs: args,
				})
			}

			return book
		},

		editAuthor: async (root, { name, setBornTo }) => {
			const author = await Author.findOne({ name: name })
			if (!author) return null
			author.born = setBornTo
			try {
				await author.save()
			} catch (error) {
				throw new UserInputError(error.message, {
					invalidArgs: args,
				})
			}

			return author
		},
	},

	Author: {
		bookCount: ({ name }) => Book.countDocuments({ author: name }),
	},
}

const server = new ApolloServer({
	typeDefs,
	resolvers,
})

server.listen().then(({ url }) => {
	console.log(`Server ready at ${url}`)
})
