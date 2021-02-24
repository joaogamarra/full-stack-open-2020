import patients from '../../data/patients.json'
import { NonSensitivePatient } from '../types'

const getPatients = (): NonSensitivePatient[] => {
	return patients
}

export default {
	getPatients,
}
