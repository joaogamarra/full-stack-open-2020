import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initializeUsers } from '../reducers/usersReducer'
import { Link, useRouteMatch } from 'react-router-dom'

const Users = () => {
	const users = useSelector((state) => state.users)

	const match = useRouteMatch('/users/:id')
	userDetail = users.find((user) => user.id === match.params.id)

	return (
		<>
			<h2>{userDetail.name}</h2>
			<h4>added blogs</h4>
			<ul>
				{userDetail.blogs.map((blog) => {
					;<li>blog.title</li>
				})}
			</ul>
		</>
	)
}

export default Users
