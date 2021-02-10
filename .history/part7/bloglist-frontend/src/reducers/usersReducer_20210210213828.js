const usersReducer = (state = null, action) => {
	switch (action.type) {
		case 'LOGGED_USER':
			return action.data
		default:
			return state
	}
}

export const setLoggedUser = (user) => {
	return {
		type: 'LOGGED_USER',
		data: {
			token: user.token,
			username: user.username,
			name: user.name,
		},
	}
}

export default usersReducer
