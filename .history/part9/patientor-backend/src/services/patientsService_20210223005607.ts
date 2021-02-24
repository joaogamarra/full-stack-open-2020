import patients from '../../data/patients'
import { Patient, NonSensitivePatient, NewPatient } from '../types'

const getPatients = (): NonSensitivePatient[] => {
	return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
		id,
		name,
		dateOfBirth,
		gender,
		occupation,
	}))
}

const getPatientByID = (id: string): Patient | undefined => {
	return patients.find((p) => p.id === id)
}

const addPatient = (entry: NewPatient): Patient => {
	const newEntry = {
		id: Math.floor(Math.random() * 100000).toString(),
		...entry,
		entries: [],
	}

	patients.push(newEntry)
	return newEntry
}

export default {
	getPatients,
	addPatient,
	getPatientByID,
}
