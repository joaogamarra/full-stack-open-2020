import express from 'express'
import bmiCalculator from './bmiCalculator'
import calculateExercises from './calculateExercises'

const app = express()
app.use(express.json())

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
	// eslint-disable-next-line @typescript-eslint/no-explicit-any,  @typescript-eslint/no-unsafe-assignment
	const { daily_exercises, target }: any = req.body

	if (!daily_exercises || !target) {
		res.status(400).json({ error: 'invalid parameters' })
	}

	const result = calculateExercises(daily_exercises, target)

	return res.json(result)
})

const PORT = 3003

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
