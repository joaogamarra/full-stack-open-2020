require('dotenv').config()

/* eslint-disable no-undef */
const PORT = process.env.PORT
let MONGODB_URI = process.env.MONGODB_URI

if (process.env.NODE_ENV === 'test') {
	MONGODB_URI = process.env.TEST_MONGODB_URI
}
/* eslint-enable no-undef */

module.exports = {
	MONGODB_URI,
	PORT,
}
