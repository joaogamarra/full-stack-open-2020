import React, { useEffect } from 'react'
import axios from 'axios'

import { apiBaseUrl } from '../constants'
import { useParams } from 'react-router-dom'
import { useStateValue } from '../state'
import { Icon } from 'semantic-ui-react'
import { setPatientDetails, setDiagnosis } from '../state/reducer'
import { Diagnosis } from '../types'

const PatientDetailPage: React.FC = () => {
	const { id } = useParams<{ id: string }>()
	const [{ patient, diagnosis }, dispatch] = useStateValue()

	useEffect(() => {
		const getPatient = async () => {
			try {
				const { data: patientFromApi } = await axios.get(`${apiBaseUrl}/patients/${id}`)

				dispatch(setPatientDetails(patientFromApi))
			} catch (e) {
				console.error(e)
			}
		}

		const getDiagnosis = async () => {
			try {
				const { data: diagnosis } = await axios.get(`${apiBaseUrl}/diagnosis/`)

				dispatch(setDiagnosis(diagnosis))
			} catch (e) {
				console.error(e)
			}
		}

		if (!patient || patient?.id !== id) {
			getPatient()
		}

		if (!diagnosis) {
			getDiagnosis()
		}
	}, [dispatch, id, patient, diagnosis])

	return (
		<div className='App'>
			<h2>
				{patient?.name} {patient?.gender === 'male' ? <Icon name='mars' /> : <Icon name='venus' />}
			</h2>
			<p>ssn: {patient?.ssn}</p>
			<p>occupation: {patient?.occupation}</p>
			<h4>entries</h4>
			{patient?.entries.map((entrie) => (
				<div key={entrie.id}>
					<p>
						{entrie.date} {entrie.description}
					</p>
					<ul>
						{entrie.diagnosisCodes?.map((code) => (
							<li key={code}>
								{code} {diagnosis?.filter((diagnosis: Diagnosis) => diagnosis.code === code)[0].name}
							</li>
						))}
					</ul>
				</div>
			))}
		</div>
	)
}

export default PatientDetailPage
