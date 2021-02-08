const notificationReducer = (state = '', action) => {
	switch (action.type) {
		case 'DISPLAY_NOTIFICATION':
			return action.data
		case 'HIDE_NOTIFICATION':
			return ''
		default:
			return state
	}
}

export const setNotification = (content) => {
	return async (dispatch) => {
		dispatch({
			type: 'DISPLAY_NOTIFICATION',
			data: {
				message: content,
			},
		})

		setTimeout(() => {
			dispatch(removeNotification())
		}, 5000)
	}
}

export const removeNotification = () => {
	return {
		type: 'REMOVE_NOTIFICATION',
	}
}

export default notificationReducer
