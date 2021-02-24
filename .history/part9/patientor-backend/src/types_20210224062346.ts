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
	entries: Entry[]
}

export type Entry = HospitalEntry | OccupationalHealthcareEntry | HealthCheckEntry

export interface BaseEntry {
	id: string
	description: string
	date: string
	specialist: string
	diagnosisCodes?: Array<Diagnosis['code']>
}

export interface HealthCheckEntry extends BaseEntry {
	type: 'HealthCheck'
	healthCheckRating: HealthCheckRating
}

export interface HospitalEntry extends BaseEntry {
	type: 'Hospital'
	discharge?: Discharge
}

export type Discharge = { date: string; criteria: string }

export interface OccupationalHealthcareEntry extends BaseEntry {
	type: 'OccupationalHealthcare'
	employerName: string
	sickLeave?: SickLeave
}

export type SickLeave = {
	startDate: string
	endDate: string
}

export enum HealthCheckRating {
	'Healthy' = 0,
	'LowRisk' = 1,
	'HighRisk' = 2,
	'CriticalRisk' = 3,
}
export enum Gender {
	Male = 'male',
	Female = 'female',
}

export enum EntryType {
	HealthCheck = 'HealthCheck',
	OccupationalHealthCare = 'OccupationalHealthcare',
	Hospital = 'Hospital',
}

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>
export type NewPatient = Omit<Patient, 'id'>
export type NewBaseEntry = Omit<BaseEntry, 'id'>
export type NewEntry =
	| Omit<HospitalEntry, 'id'>
	| Omit<OccupationalHealthcareEntry, 'id'>
	| Omit<HealthCheckEntry, 'id'>
