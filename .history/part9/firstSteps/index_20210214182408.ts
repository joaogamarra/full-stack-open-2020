import express from 'express'

const app = express()

app.get('/', (_req, res) => {
	res.send('Hello fullstack!')
})

app.get('/bmi', (req, res) => {
	const { weight } = req.query

	res.send(weight)
})

const PORT = 3003

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
