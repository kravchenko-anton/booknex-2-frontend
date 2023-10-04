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
export interface UserType extends DefaultModelFields {
	email: string
	name: string
	isAdmin: boolean
	picture: string
	likedShelves: []
	unwatchedShelves: []
	likedBooks: []
	finishedBooks: []
	readingBooks: []
}
export interface UserLibraryFieldsType {
	likedShelves: []
	unwatchedShelves: []
	likedBooks: []
	finishedBooks: []
	readingBooks: []
}

export type UserLibraryType = [
	{
		name: 'Finished books'
		count: number
	},
	{
		name: 'Liked books'
		count: number
	},
	{
		name: 'Reading Books'
		count: number
	},
	{
		name: 'Liked Shelves'
		count: number
	},
	{
		name: 'UnWatched Shelves'
		count: number
	}
]

export interface UserUpdateDto
	extends Pick<UserType, 'email' | 'name' | 'picture'> {
	password: string
}
