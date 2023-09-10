import { TokensType } from '@/redux/auth/auth.types'
import { deleteItemAsync, getItemAsync, setItemAsync } from 'expo-secure-store'

export const getAccessToken = async () => {
	const accessToken = await getItemAsync('access_token')
	return accessToken || null
}

export const saveTokensStorage = async (data: TokensType) => {
	await setItemAsync('accessToken', data.accessToken)
	await setItemAsync('refreshToken', data.refreshToken)
}

export const deleteTokensStorage = async () => {
	await deleteItemAsync('accessToken')
	await deleteItemAsync('refreshToken')
}
