import patients from '../../data/patients'
import { Patient, NonSensitivePatient, NewPatient, NewEntry, Entry } from '../types'

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
	console.log(patients)
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

const addEntry = (patient: Patient, entry: NewEntry): Patient => {
	const newEntry = { ...entry, id: Math.floor(Math.random() * 100000).toString() }
	const patientNewEntry = {
		...patient,
		entries: patient.entries.concat(newEntry),
	}

	return patientNewEntry
}

export default {
	getPatients,
	addPatient,
	addEntry,
	getPatientByID,
}
