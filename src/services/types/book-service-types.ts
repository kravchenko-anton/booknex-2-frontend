import { ShortAuthorType } from '@/services/types/author-service-types'
import { GenreType } from '@/services/types/genre-service-types'
import { DefaultModelFields } from '@/types/global'

export interface BookType extends DefaultModelFields {
	title: string
	author: ShortAuthorType
	description: string
	color: string
	epub: string
	pages: number
	picture: string
	likedPercentage: number
	popularity: number
	genres: Omit<GenreType, 'createdAt' | 'updatedAt'>[]
}

export type ShortBookType = Pick<
	BookType,
	| 'title'
	| 'author'
	| 'picture'
	| 'likedPercentage'
	| 'id'
	| 'updatedAt'
	| 'createdAt'
>

export interface BookByIdType extends BookType {
	similarBooks: BookType[]
}

export interface ReviewType {
	emotion: string
	comment: string
	tags: string[]
}

export interface BookManipulationType {
	title: string
	author: string
	description: string
	image: string
	epub: string
	pages: number
	likedPercentage: number
	popularity: number
	majorGenre: string
	genres: string[]
}
