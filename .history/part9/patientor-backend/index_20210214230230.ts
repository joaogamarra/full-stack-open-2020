import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

const PORT = 3000

app.get('/api/ping', (_req, res) => {
	console.log('someone pinged here')
	res.json('pong')
})

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
