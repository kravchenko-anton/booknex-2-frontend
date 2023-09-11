import { UserType } from '@/services/types/user-services-types'

export interface AuthFieldsType extends Pick<UserType, 'email'> {
	password: string
}

export type IAuthState = Pick<UserType, 'email' | 'id' | 'isAdmin'>

export interface TokensType {
	accessToken: string
	refreshToken: string
}

export interface AuthResponseType extends TokensType {
	user: Pick<UserType, 'id' | 'email' | 'isAdmin'>
}
