require('dotenv').config()

/* eslint-disable no-undef */
const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI
/* eslint-enable no-undef */

module.exports = {
	MONGODB_URI,
	PORT,
}
