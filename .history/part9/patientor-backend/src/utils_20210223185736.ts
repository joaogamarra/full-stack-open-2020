import { NewPatient, Gender, NewBaseEntry, Diagnosis, EntryType } from './types'

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

const reqEntrie = (object: any): NewBaseEntry => {
	const type = parseEntryType(object.type)

	const newEntrie: NewBaseEntry = {
		description: parseName(object.description),
		date: parseDate(object.date),
		specialist: parseName(object.specialist),
		diagnosisCodes: parseDiagnosisCode(validEntryType.diagnosisCodes),
	}

	switch (type) {
		case 'Hospital':
	}

	return newEntrie
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

const parseDiagnosisCode = (diagnosisCode: any): Array<Diagnosis['code']> => {
	if (!diagnosisCode) return diagnosisCode

	if (!Array.isArray(diagnosisCode)) {
		throw new Error('Incorrect diagnosisCode')
	}

	const validDiagnosisCodes = diagnosisCode.every((code: any) => isString(code))

	if (validDiagnosisCodes) {
		return diagnosisCode
	} else {
		throw new Error('Incorrect diagnosisCode')
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

export default reqPatient
