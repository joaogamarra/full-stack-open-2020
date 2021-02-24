import express from 'express'
import patientsService from '../services/patientsService'

const router = express.Router()

router.get('/', (_req, res) => {
	res.send(patientsService.getPatients())
})

router.post('/', (req, res) => {
	const { name, ssn, dateOfBirth, gender, occupation } = req.body
	const newPatient = patientsService.addPatient(name, ssn, dateOfBirth, gender, occupation)
	res.json(addPatient)
})

export default router
