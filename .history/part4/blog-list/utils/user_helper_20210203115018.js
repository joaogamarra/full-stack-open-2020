const User = require('../models/user')

const usersInDb = async (request, response) => {
	const users = await User.find({})
	return response.json(users)
}

module.exports = {
	usersInDb,
}
