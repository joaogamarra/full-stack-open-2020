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

export interface Entry {}

export enum Gender {
	Male = 'male',
	Female = 'female',
}

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>
export type newPatient = Omit<Patient, 'id'>
