import { ShortBookType } from '@/services/types/book-service-types'
import { ShortShelfType } from '@/services/types/shelf-service-types'
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
	watchedShelves: ShortShelfType[]
	hiddenShelves: ShortShelfType[]
	finishedBooks: ShortBookType[]
	readingBooks: ShortBookType[]
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
