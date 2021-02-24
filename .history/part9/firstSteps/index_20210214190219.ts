import express from 'express'
import bmiCalculator from './bmiCalculator'

const app = express()

app.get('/', (_req, res) => {
	res.send('Hello fullstack!')
})

app.get('/bmi', (req, res) => {
	let { height, weight } = req.query

	const test: any = 1

	console.log(test)

	if (!height || isNaN(Number(height))) res.status(400).json({ error: 'invalid height parameter' })
	if (!weight || isNaN(Number(weight))) res.status(400).json({ error: 'invalid weight parameter' })

	const bmi = bmiCalculator(Number(height), Number(weight))

	res.json({ height, weight, bmi })
})

const PORT = 3003

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
