const calculateBmi = (weight: number, height: number): string => {
	const bmi = weight / height ** 2
	console.log(bmi)

	if (bmi < 18.5) {
		return 'Underweight'
	} else if (bmi < 25) {
		return 'Normal (healthy weight)'
	} else if (bmi < 30) {
		return 'Overweight'
	} else {
		return 'Obese'
	}
}

console.log(calculateBmi(180, 74))
