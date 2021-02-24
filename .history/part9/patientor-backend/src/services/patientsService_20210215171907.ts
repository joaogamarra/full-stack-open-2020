import patients from '../../data/patients.json'
import { Patient, NonSensitivePatient } from '../types'

const getPatients = (): Patient[] => {
	return patients
}

export default {
	getPatients,
}
