import React, { useEffect } from 'react'
import axios from 'axios'

import { Patient } from '../types'
import { apiBaseUrl } from '../constants'
import { useParams } from 'react-router-dom'
import { useStateValue } from '../state'

const PatientDetailPage: React.FC = () => {
	const id = useParams<{ id: string }>()
	const [{ patient }, dispatch] = useStateValue()

	useEffect(() => {
		const getPatient = async () => {
			try {
				console.log(`${apiBaseUrl}/patients/${id}`)
				const { data: patientFromApi } = await axios.get(`${apiBaseUrl}/patients/${id}`)

				dispatch({ type: 'SET_PATIENT_DETAILS', payload: patientFromApi })
			} catch (e) {
				console.error(e)
			}
		}

		if (!patient) {
			getPatient()
		}
	}, [id, patient, dispatch])

	return <div className='App'>{patient}</div>
}

export default PatientDetailPage
