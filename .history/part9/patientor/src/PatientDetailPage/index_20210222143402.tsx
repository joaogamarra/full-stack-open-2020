import React, { useEffect } from 'react'
import axios from 'axios'

import { Patient } from '../types'
import { apiBaseUrl } from '../constants'
import { useParams } from 'react-router-dom'
import { useStateValue } from '../state'

const PatientDetailPage: React.FC = () => {
	const id = useParams<{ id: string }>()
	const [{ patient }, dispatch] = useStateValue()

	return <div className='App'>{patient}</div>
}

export default PatientDetailPage
