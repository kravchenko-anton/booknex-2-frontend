import { saveTokensStorage } from '@/redux/auth/auth.helper'
import { AuthResponseType } from '@/redux/auth/auth.types'
import { getAuthUrl, SERVER_URL } from '@/services/api-config'
import axios from 'axios'
import { getItemAsync } from 'expo-secure-store'

export const getNewTokens = async () => {
	//TODO: возможно добавить сюда try catch
	const refreshToken = await getItemAsync('refreshToken')
	const response = await axios
		.post<string, { data: AuthResponseType }>(
			SERVER_URL + getAuthUrl('/access-token'),
			{ refreshToken }
		)
		.then(res => res.data)
	if (response.accessToken)
		await saveTokensStorage({
			accessToken: response.accessToken,
			refreshToken: response.refreshToken
		})

	return response
}
