import {
	deleteTokensStorage,
	saveTokensStorage
} from '@/redux/auth/auth.helper'
import { AuthFieldsType, AuthResponseType } from '@/redux/auth/auth.types'
import { SERVER_URL, getAuthUrl } from '@/services/api.config'
import { errorCatch } from '@/utils/catch-error'
import { errorToast } from '@/utils/errorToast'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const register = createAsyncThunk<AuthResponseType, AuthFieldsType>(
	'auth/register',
	async ({ email, password }, thunkAPI) => {
		try {
			const register = await axios
				.post(SERVER_URL + getAuthUrl('/register'), { email, password })
				.then(res => res.data)
			await saveTokensStorage({
				accessToken: register.accessToken,
				refreshToken: register.refreshToken
			})
			return register
		} catch (e) {
			return thunkAPI.rejectWithValue(e)
		}
	}
)

export const login = createAsyncThunk<AuthResponseType, AuthFieldsType>(
	'auth/login',
	async ({ email, password }, thunkAPI) => {
		try {
			const login = await axios
				.post(SERVER_URL + getAuthUrl('/login'), { email, password })
				.then(res => res.data)
			await saveTokensStorage({
				accessToken: login.accessToken,
				refreshToken: login.refreshToken
			})
			return login
		} catch (e) {
			return thunkAPI.rejectWithValue(e)
		}
	}
)

export const getNewToken = createAsyncThunk<AuthResponseType, string>(
	'auth/getToken',
	async (refreshToken, thunkAPI) => {
		try {
			const tokens = await axios
				.post(SERVER_URL + getAuthUrl('/access-token'), { refreshToken })
				.then(res => res.data)
			await saveTokensStorage({
				accessToken: tokens.accessToken,
				refreshToken: tokens.refreshToken
			})
			return tokens
		} catch (e) {
			return thunkAPI.rejectWithValue(e)
		}
	}
)

export const logout = createAsyncThunk('auth/logout', async () => {
	try {
		await deleteTokensStorage()
	} catch (e) {
		errorToast(errorCatch(e))
	}
	return {}
})
