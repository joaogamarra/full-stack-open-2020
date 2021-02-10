import React from 'react'
import { useSelector } from 'react-redux'
import { initializeUsers } from '../reducers/usersReducer'
import { useRouteMatch } from 'react-router-dom'

const UserDetail = () => {
	const users = useSelector((state) => state.users)
	console.log(users)

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

export default UserDetail
