import { deleteTokensStorage, getAccessToken } from '@/redux/auth/auth.helper'
import { SERVER_URL } from '@/services/api-config'
import { getNewTokens } from '@/services/api/helper.auth'
import { errorCatch } from '@/utils/catch-error'
import axios from 'axios'

const instance = axios.create({
	baseURL: SERVER_URL,
	headers: {
		'Content-Type': 'application/json'
	}
})

instance.interceptors.request.use(async config => {
	const accessToken = await getAccessToken()

	if (config.headers && accessToken)
		config.headers.Authorization = `Bearer ${accessToken}`

	return config
})

instance.interceptors.response.use(
	config => config,
	async error => {
		const originalRequest = error.config
		if (
			(error.response.status === 401 ||
				errorCatch(error) === 'jwt expired' ||
				errorCatch(error) === 'jwt must be provided') &&
			error.config &&
			!error.config._isRetry
		) {
			originalRequest._isRetry = true
			try {
				await getNewTokens()
				return instance.request(originalRequest)
			} catch (error) {
				if (errorCatch(error) === 'jwt expired') await deleteTokensStorage()
			}
		}

		throw error
	}
)
export default instance
