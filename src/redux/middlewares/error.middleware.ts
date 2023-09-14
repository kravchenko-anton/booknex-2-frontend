import { errorToast } from '@/utils/errorToast'
import { isRejectedWithValue } from '@reduxjs/toolkit'
import { Middleware, MiddlewareAPI } from 'redux'

export const rtkQueryErrorLogger: Middleware =
	(api: MiddlewareAPI) => next => action => {
		if (isRejectedWithValue(action)) {
			errorToast(action.payload)
		}

		return next(action)
	}
