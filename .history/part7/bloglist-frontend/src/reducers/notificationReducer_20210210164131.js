let notificationInterval = null

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

export const setNotification = (content, time) => {
	clearTimeout(notificationInterval)
	return async (dispatch) => {
		dispatch({
			type: 'DISPLAY_NOTIFICATION',
			data: {
				message: content,
			},
		})
		notificationInterval = setTimeout(() => {
			dispatch(removeNotification())
		}, time * 1000)
	}
}

export const removeNotification = () => {
	return {
		type: 'REMOVE_NOTIFICATION',
	}
}

export default notificationReducer
