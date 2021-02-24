import express from 'express'
import bmiCalculator from './bmiCalculator'

const app = express()

app.get('/', (_req, res) => {
	res.send('Hello fullstack!')
})

app.get('/bmi', (req, res) => {
	const { height, weight } = req.query

	if (!height || isNaN(Number(height))) res.status(400).json({ error: 'invalid height parameter' })
	if (!weight || isNaN(Number(weight))) res.status(400).json({ error: 'invalid weight parameter' })

	const bmi = bmiCalculator(Number(height), Number(weight))

	res.json({ height, weight, bmi })
})

app.post('/exercises', (req, res) => {
	const { body } = req
	const { dailyExercises } = body
	let { target } = body

	if (!target || !dailyExercises) {
		return res.status(400).json({ error: 'parameters missing' })
	}

	if (!Array.isArray(dailyExercises)) {
		return res.status(400).json({ error: 'malformatted parameters' })
	}

	const hasNaNInDailyHours = dailyExercises.some((hours) => isNaN(hours))
	target = Number(target)

	if (isNaN(target) || hasNaNInDailyHours) {
		return res.status(400).json({ error: 'malformatted parameters' })
	}

	return res.json(calculateExercises(dailyExercises, target))
})

const PORT = 3003

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
