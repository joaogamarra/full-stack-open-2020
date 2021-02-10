import usersService from '../services/users'

const usersReducer = (state = null, action) => {
	switch (action.type) {
		case 'LOGGED_USER':
			return action.data
		case 'INIT_USERS':
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

export const initializeUsers = () => {
	return async (dispatch) => {
		const users = await usersService.getAll()
		dispatch({
			type: 'INIT_USERS',
			data: users,
		})
	}
}

export default usersReducer
