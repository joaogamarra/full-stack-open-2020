interface exerciseResult {
	periodLength: number
	trainingDays: number
	success: boolean
	rating: number | undefined
	ratingDescription: string | undefined
	target: number
	average: number
}

interface exerciseValues {
	data: number[]
	target: number
}

const parseArgumentsExercises = (args: Array<string>): exerciseValues => {
	if (args.length < 4) throw new Error('Not enough arguments')

	const target = Number(args[2])
	const data = args.slice(3).map((hours) => Number(hours))
	const dataValidation = data.some((value) => isNaN(value))

	if (!isNaN(target) && !dataValidation) {
		return {
			data: data,
			target: target,
		}
	} else {
		throw new Error('Provided values were not numbers!')
	}
}

const calculateExercises = (data: number[], target: number): exerciseResult => {
	const periodLength = data.length
	const trainingDays = data.filter((d) => d > 0).length
	const average = data.reduce((a, b) => a + b, 0) / periodLength
	const success = average >= target
	let ratingDescription
	let rating

	if (average < target - 1) {
		ratingDescription = 'terrible, do better'
		rating = 1
	}
	if (average < target) {
		ratingDescription = 'not too bad but could be better'
		rating = 2
	}
	if (average >= target) {
		ratingDescription = 'congratulions, target achieved'
		rating = 3
	}

	return {
		periodLength,
		trainingDays,
		success,
		rating,
		ratingDescription,
		target,
		average,
	}
}

try {
	const { data, target } = parseArgumentsExercises(process.argv)
	console.log(calculateExercises(data, target))
} catch (e) {
	console.log('Error, something bad happened, message: ', e.message)
}

export default calculateExercises
