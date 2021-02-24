import patients from '../../data/patients.json'
import { NonSensitivePatient } from '../types'

const getPatients = (): NonSensitivePatient[] => {
	return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
		id,
		name,
		dateOfBirth,
		gender,
		occupation,
	}))
}

export default {
	getPatients,
}
