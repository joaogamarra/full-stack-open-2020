import express from 'express'
import cors from 'cors'
import diagnosesRouter from './routes/diagnoses'

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/diagnoses', diagnosesRouter)

const PORT = 3000

app.get('/api/ping', (_req, res) => {
	console.log('someone pinged here')
	res.send('pong')
})

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
