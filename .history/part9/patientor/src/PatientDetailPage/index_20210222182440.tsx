import React, { useEffect } from 'react'
import axios from 'axios'

import { apiBaseUrl } from '../constants'
import { useParams } from 'react-router-dom'
import { useStateValue } from '../state'
import { Icon } from 'semantic-ui-react'

const PatientDetailPage: React.FC = () => {
	const { id } = useParams<{ id: string }>()
	const [{ patient }, dispatch] = useStateValue()

	useEffect(() => {
		const getPatient = async () => {
			try {
				const { data: patientFromApi } = await axios.get(`${apiBaseUrl}/patients/${id}`)
				console.log(patientFromApi)

				dispatch({ type: 'SET_PATIENT_DETAILS', payload: patientFromApi })
			} catch (e) {
				console.error(e)
			}
		}

		if (!patient || patient?.id !== id) {
			getPatient()
		}
	}, [dispatch, id, patient])

	return (
		<div className='App'>
			<h2>
				{patient?.name} {patient?.gender === 'male' ? <Icon name='mars' /> : <Icon name='venus' />}
			</h2>
			<p>ssn: {patient?.ssn}</p>
			<p>occupation: {patient?.occupation}</p>
		</div>
	)
}

export default PatientDetailPage
