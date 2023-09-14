import { DefaultModelFields } from '@/types/global'

export interface UserType extends DefaultModelFields {
	email: string
	name: string
	isAdmin: boolean
	picture: string
	likedBooks: []
	finishBooks: []
	readingBooks: []
}

export interface UserUpdateDto
	extends Pick<UserType, 'email' | 'name' | 'picture'> {
	password: string
}
