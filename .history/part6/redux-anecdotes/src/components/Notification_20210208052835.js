import { useSelector } from 'react-redux'

const Notification = () => {
	const notification = useSelector((state) => state.notification.message)
	notification.subscribe(() => {
		console.log('change in notif message')
	})

	const style = {
		border: 'solid',
		padding: 10,
		borderWidth: 1,
	}
	return <>{notification && <div style={style}>{notification}</div>}</>
}

export default Notification
