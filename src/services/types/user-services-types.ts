import { DefaultModelFields, IconType } from '@/types/global'

export interface UserProfileTypes
	extends Pick<UserType, 'email' | 'name' | 'picture'> {
	statistics: UserStatisticsType
}
export type UserStatisticsType = [
	{
		name: 'Books read'
		icon: IconType
		count: number
	},
	{
		name: 'Pages read'
		icon: IconType
		count: number
	},
	{
		name: 'Time in read'
		icon: IconType
		count: string
	},
	{
		name: 'Reading speed'
		icon: IconType
		count: string
	}
]
export interface UserType extends DefaultModelFields, UserLibraryFieldsType {
	email: string
	name: string
	isAdmin: boolean
	picture: string
}
export interface UserLibraryFieldsType {
	watchedShelves: []
	unwatchedShelves: []
	likedBooks: []
	finishedBooks: []
	readingBooks: []
}

type UserLibraryElementType = {
	type: keyof UserLibraryFieldsType
	name: string
	icon: IconType
	count: number
}

export type GetMoreType<T extends keyof UserLibraryFieldsType> = {
	title: string
} & Record<keyof UserLibraryFieldsType, UserLibraryFieldsType[T]>

export type UserLibraryType = {
	books: UserLibraryElementType[]
	shelves: UserLibraryElementType[]
}

export type UserUpdateBioDto = Pick<UserType, 'email' | 'name'>

export interface UserUpdatePasswordDto {
	password: string
	oldPassword: string
}
