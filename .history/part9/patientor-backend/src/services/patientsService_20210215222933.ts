import patients from '../../data/patients.json'
import { Patient, NonSensitivePatient, newPatientEntry } from '../types'

const getPatients = (): NonSensitivePatient[] => {
	return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
		id,
		name,
		dateOfBirth,
		gender,
		occupation,
	}))
}

const addPatient = (entry: newPatientEntry): Patient => {
	const newEntry = {
		id: Math.floor(Math.random() * 100000).toString(),
		...entry,
	}

	patients.push(newEntry)
	return newEntry
}

export default {
	getPatients,
	addPatient,
}
