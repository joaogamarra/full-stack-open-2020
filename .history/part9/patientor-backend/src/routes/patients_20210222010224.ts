import express from 'express'
import patientsService from '../services/patientsService'
import reqPatient from '../utils'

const router = express.Router()

router.get('/', (_req, res) => {
	res.send(patientsService.getPatients())
})

router.get('/:id', (_req, res) => {
	const patient = patientsService.getPatientByID(_req.params.id
		if(patient){
			res.send(patient)
		} else {
			res.sendStatus(404);
		}
})

router.post('/', (req, res) => {
	try {
		const newPatient = reqPatient(req.body)
		const addedPatient = patientsService.addPatient(newPatient)
		res.json(addedPatient)
	} catch (e) {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		res.status(400).send(e.message)
	}
})

export default router
