import { createStore, combineReducers } from 'redux'
import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'
import { composeWithDevTools } from 'redux-devtools-extension'

const reducer = combineReducers({
	anecdotes: anecdoteReducer,
	filter: filterReducer,
	notification: notificationReducer,
})

export const store = createStore(reducer, composeWithDevTools())
