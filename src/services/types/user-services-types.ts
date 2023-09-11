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
