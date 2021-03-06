const notificationReducer = (state = '', action) => {
	switch (action.type) {
		case 'DISPLAY_NOTIFICATION':
			return action.data
		case 'REMOVE_NOTIFICATION':
			return ''
		default:
			return state
	}
}

export const setNotification = (content) => {
	return {
		type: 'DISPLAY_NOTIFICATION',
		data: {
			message: content,
		},
	}
}

export const removeNotification = () => {
	return {
		type: 'REMOVE_NOTIFICATION',
	}
}

export default notificationReducer
