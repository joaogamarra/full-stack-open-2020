import React from 'react'
import { useSelector } from 'react-redux'
import { initializeUsers } from '../reducers/usersReducer'
import { useRouteMatch } from 'react-router-dom'

const Users = () => {
	const users = useSelector((state) => state.users)

	const match = useRouteMatch('/users/:id')
	const userDetail = users.find((user) => user.id === match.params.id)

	return (
		<>
			<h2>{userDetail.name}</h2>
			<h4>added blogs</h4>
			<ul>
				{userDetail.blogs.map((blog) => (
					<li>{blog.title}</li>
				))}
			</ul>
		</>
	)
}

export default Users
