import React, { useEffect } from 'react'
import axios from 'axios'

import { Patient } from '../types'
import { apiBaseUrl } from '../constants'
import { useParams } from 'react-router-dom'
import { useStateValue } from '../state'

const PatientDetailPage: React.FC = () => {
	const params = useParams<{ id: string }>()
	const [{ patient }, dispatch] = useStateValue()

	useEffect(() => {
		const getPatient = async () => {
			try {
				const { data: patientFromApi } = await axios.get(`${apiBaseUrl}/patients/${params.id}`)
				console.log(patientFromApi)

				dispatch({ type: 'SET_PATIENT_DETAILS', payload: patientFromApi })
			} catch (e) {
				console.error(e)
			}
		}

		getPatient()
	}, [params, patient, dispatch])

	return <div className='App'></div>
}

export default PatientDetailPage
