import diagnoses from '../../data/diagnoses.json'
import { Diagnosis } from '../types'

const getDiagnoses = (): Diagnosis[] => {
	console.log(diagnoses)
	return diagnoses
}

export default {
	getDiagnoses,
}
