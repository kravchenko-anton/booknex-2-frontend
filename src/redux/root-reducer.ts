import { alertReducer } from '@/redux/alert/alert-slice'
import { authReducer } from '@/redux/auth/auth-slice'
import { readingUiReducer } from '@/redux/reading-settings/reading-ui-slice'
import { combineReducers } from '@reduxjs/toolkit'

export const reducers = combineReducers({
	auth: authReducer,
	alert: alertReducer,
	readingUi: readingUiReducer
})
