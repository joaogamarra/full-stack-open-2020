export interface Diagnosis {
	code: string
	name: string
	latin?: string
}

export interface Patient {
	id: string
	name: string
	ssn: string
	dateOfBirth: string
	gender: string
	occupation: string
}

export type NonSensitivePatient = Omit<Patient, 'ssn'>
export type newPatient = Omit<Patient, 'id'>
