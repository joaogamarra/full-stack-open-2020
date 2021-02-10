import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initializeUsers } from '../reducers/usersReducer'

const Users = () => {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(initializeUsers())
	}, [dispatch])

	const users = useSelector((state) => state.users)

	console.log(users)

	return (
		<>
			<h2>Users</h2>
			<table>
				<tbody>
					<tr>
						<td>
							<strong>Name</strong>
						</td>
						<td>
							<strong>Blogs Created</strong>
						</td>
					</tr>
					{users.map((user) => (
						<tr key={user.username}>
							<td>{user.name}</td>
							<td>{user.blogs.length}</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	)
}

export default Users
