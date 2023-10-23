import { alertReducer } from '@/redux/alert/alert-slice'
import { authReducer } from '@/redux/auth/auth-slice'
import { combineReducers } from '@reduxjs/toolkit'

export const reducers = combineReducers({
	auth: authReducer,
	alert: alertReducer
})
