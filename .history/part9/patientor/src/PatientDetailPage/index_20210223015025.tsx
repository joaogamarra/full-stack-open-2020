import React, { useEffect } from 'react'
import axios from 'axios'

import { apiBaseUrl } from '../constants'
import { useParams } from 'react-router-dom'
import { useStateValue } from '../state'
import { Icon } from 'semantic-ui-react'
import { setPatientDetails } from '../state/reducer'

const PatientDetailPage: React.FC = () => {
	const { id } = useParams<{ id: string }>()
	const [{ patient }, dispatch] = useStateValue()

	useEffect(() => {
		const getPatient = async () => {
			try {
				const { data: patientFromApi } = await axios.get(`${apiBaseUrl}/patients/${id}`)

				dispatch(setPatientDetails(patientFromApi))
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
			<h4>entries</h4>
			{patient?.entries.map((entrie) => (
				<>
					<p key={entrie.id}>
						{entrie.date} {entrie.description}
					</p>
					<ul>
						{entrie.diagnosisCodes?.map((code) => (
							<>
								<li key={code}>{code}</li>
							</>
						))}
					</ul>
				</>
			))}
		</div>
	)
}

export default PatientDetailPage
