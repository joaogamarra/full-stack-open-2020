import React, { Component } from 'react'

const Notification = ({ status, message }) => {
	if (message === null) {
		return null
	}

	return <div className={`notification ${status}`}>{message}</div>
}

export default Notification
