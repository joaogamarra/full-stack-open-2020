const app = require('./app')
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')

const Blog = require('./models/blog')

app.use(cors())
app.use(express.json())

const server = http.createServer(app)

server.listen(config.PORT, () => {
	logger.info(`Server running on port ${config.PORT}`)
})
