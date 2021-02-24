import { newPatient } from './types'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const reqPatient = (object: any): newPatient => {
	const newEntry: newPatient = {
		// ...
	}

	return newEntry
}

const parseSsn = (ssn: any): string => {
	if (!ssn || !isString(ssn)) {
		throw new Error('Incorrect or missing ssn: ' + ssn)
	}

	return ssn
}

const isString = (text: any): text is string => {
	return typeof text === 'string' || text instanceof String
}

export default reqPatient
