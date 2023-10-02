import { DefaultModelFields } from '@/types/global'

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
