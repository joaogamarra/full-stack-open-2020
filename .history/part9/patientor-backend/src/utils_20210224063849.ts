import {
	NewPatient,
	Gender,
	NewEntry,
	Diagnosis,
	EntryType,
	HealthCheckRating,
	NewBaseEntry,
	SickLeave,
	Discharge,
} from './types'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const reqPatient = (object: any): NewPatient => {
	const newPatient: NewPatient = {
		name: parseName(object.name),
		ssn: parseSsn(object.ssn),
		dateOfBirth: parseDateOfBirth(object.dateOfBirth),
		gender: parseGender(object.gender),
		occupation: parseOccupation(object.occupation),
		entries: [],
	}

	return newPatient
}

export const reqEntry = (object: any): NewEntry => {
	const type = parseEntryType(object.type)

	const newEntry: NewBaseEntry = {
		description: parseName(object.description),
		date: parseDate(object.date),
		specialist: parseName(object.specialist),
		diagnosisCodes: parseDiagnosisCode(object.diagnosisCodes),
	}

	switch (type) {
		case EntryType.HealthCheck:
			return {
				...newEntry,
				type: type,
				healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
			}
		case EntryType.OccupationalHealthCare:
			const entryObj = {
				...newEntry,
				type: type,
				employerName: parseName(object.employerName),
				sickLeave: parseSickLeave(object.sickLeave),
			}

			return entryObj
		case EntryType.Hospital:
			return { ...newEntry, discharge: parseDischarge(object.discharge) }

		default:
			throw new Error(`Invalid Entry`)
	}
}

const parseName = (name: any): string => {
	if (!name || !isString(name)) {
		throw new Error(`Incorrect or missing name:  ${name}`)
	}

	return name
}

const parseSsn = (ssn: any): string => {
	if (!ssn || !isString(ssn)) {
		throw new Error(`Incorrect or missing ssn:  ${ssn}`)
	}

	return ssn
}

const parseDateOfBirth = (dateOfBirth: any): string => {
	if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
		throw new Error(`Incorrect or missing dateOfBirth:  ${dateOfBirth}`)
	}

	return dateOfBirth
}

const parseDate = (date: any): string => {
	if (!date || !isString(date) || !isDate(date)) {
		throw new Error(`Incorrect or missing dateOfBirth:  ${date}`)
	}

	return date
}

const parseOccupation = (occupation: any): string => {
	if (!occupation || !isString(occupation)) {
		throw new Error(`Incorrect or missing occupation:  ${occupation}`)
	}

	return occupation
}

const parseGender = (gender: any): Gender => {
	if (!gender || !isString(gender) || !isGender(gender)) {
		throw new Error(`Incorrect or missing gender:  ${gender}`)
	}
	return gender
}

const parseEntryType = (type: any): EntryType => {
	if (!type || !isString(type) || !isEntryType(type)) {
		throw new Error(`Incorrect or missing type:  ${type}`)
	}

	return type
}

const parseDiagnosisCode = (diagnosisCodes: any): Array<Diagnosis['code']> => {
	if (diagnosisCodes) {
		if (!Array.isArray(diagnosisCodes)) {
			throw new Error('Incorrect or missing diagnoses')
		}
	}

	// eslint-disable-next-line @typescript-eslint/no-unsafe-return
	return diagnosisCodes
}

const parseHealthCheckRating = (healthCheckRating: any): HealthCheckRating => {
	if (!healthCheckRating || !isHealthCheckRating(healthCheckRating)) {
		throw new Error(`Incorrect or missing health check rating: ${healthCheckRating}`)
	}
	return healthCheckRating
}

const parseSickLeave = (object: any): SickLeave => {
	if (!object) throw new Error('Icorrect or missing sick leave')

	return {
		startDate: parseDate(object.startDate),
		endDate: parseDate(object.endDate),
	}
}

const parseDischarge = (object: any): Discharge => {
	if (!object) throw new Error('Missing discharge')

	return {
		date: parseDate(object.date),
		criteria: parseName(object.criteria),
	}
}

const isString = (text: any): text is string => {
	return typeof text === 'string' || text instanceof String
}

const isDate = (date: string): boolean => {
	return Boolean(Date.parse(date))
}

const isGender = (param: any): param is Gender => {
	return Object.values(Gender).includes(param)
}

const isEntryType = (param: any): param is EntryType => {
	return Object.values(EntryType).includes(param)
}

const isHealthCheckRating = (param: any): param is HealthCheckRating => {
	return Object.values(HealthCheckRating).includes(param)
}

export default reqPatient
