import { useSelector, useDispatch } from 'react-redux'
import { filter } from '../reducers/filterReducer'

const Filter = () => {
	const dispatch = useDispatch()
	const filterValue = useSelector((state) => state.filter)

	console.log(filterValue)

	const handleChange = (event) => {
		dispatch(filter(filterValue))
	}
	const style = {
		marginBottom: 10,
	}

	return (
		<div style={style}>
			filter <input onChange={handleChange} value={filterValue} />
		</div>
	)
}

export default Filter
