import { GenreType } from '@/services/types/genre-service-types'
import { DefaultModelFields } from '@/types/global'

export interface BookType extends DefaultModelFields {
	title: string
	author: string
	description: string
	isbn: string
	color: string
	epub: string
	pages: number
	image: string
	likedPercent: number
	popularity: number
	genres: Omit<GenreType, 'createdAt' | 'updatedAt'>[]
}

export interface ShortBookType
	extends Pick<
		BookType,
		| 'title'
		| 'author'
		| 'image'
		| 'likedPercent'
		| 'id'
		| 'updatedAt'
		| 'createdAt'
	> {}

export interface BookByIdType extends BookType {
	similarBooks: BookType[]
}
