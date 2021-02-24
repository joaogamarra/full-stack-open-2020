export interface Diagnosis {
	code: string
	name: string
	latin?: string
}

export interface Patient {
	id: number
	name: string
	ssn: string
	dateOfBirth: string
	gender: string
	occupation: string
}
