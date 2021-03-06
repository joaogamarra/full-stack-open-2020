import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
	const response = await axios.get(baseUrl)
	return response.data
}

const createNew = async (content) => {
	const object = { content, votes: 0 }

	console.log('file: anecdotesService.js ~ line 13 ~ content', content)
	console.log('file: anecdotesService.js ~ line 13 ~ object', object)
	const response = await axios.post(baseUrl, object)
	return response.data
}

// eslint-disable-next-line
export default { getAll, createNew }
