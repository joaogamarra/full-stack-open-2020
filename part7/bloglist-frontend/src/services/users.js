import axios from 'axios'
const baseUrl = '/api/users'

const getAll = async () => {
	const response = await axios.get(baseUrl)
	console.log('file: users.js ~ line 6 ~ response', response)
	return response.data
}

export default { getAll }
