const usersReducer = (state = null, action) => {
	switch (action.type) {
		case 'LOGGED_USER':
			console.log(action)
			return action.data
		default:
			return state
	}
}

export const setLoggedUser = (user) => {
	console.log('file: usersReducer.js ~ line 11 ~ user', user)

	return {
		type: 'LOGGED_USER',
		data: user,
	}
}

export default usersReducer
