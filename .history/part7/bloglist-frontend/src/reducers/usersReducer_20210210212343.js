const usersReducer = (state = null, action) => {
	switch (action.type) {
		case 'LOGGED_USER':
			return action.data
		default:
			return state
	}
}

export const setLoggedUser = (user) => {
	return (dispatch) => {
		console.log(user)
		dispatch({
			type: 'LOGGED_USER',
			data: user,
		})
	}
}

export default usersReducer
