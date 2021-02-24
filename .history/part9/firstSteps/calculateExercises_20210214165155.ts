interface exerciseResult {
	periodLength: number
	trainingDays: number
	success: boolean
	rating: number
	ratingDescription: string
	target: number
	average: number
}

const parseArguments = (args: Array<string>): bmiValues => {
	if (args.length < 4) throw new Error('Not enough arguments')
	if (args.length > 4) throw new Error('Too many arguments')

	if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
		return {
			height: Number(args[2]),
			weight: Number(args[3]),
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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))
