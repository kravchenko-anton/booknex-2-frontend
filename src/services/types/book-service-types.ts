import { GenreType } from '@/services/types/genre-service-types'
import { DefaultModelFields } from '@/types/global'

export interface BookType extends DefaultModelFields {
	title: string
	author: string
	description: string
	isbn: string
	epub: string
	image: string
	likedPercent: number
	popularity: number
	genres: Omit<GenreType, 'createdAt' | 'updatedAt'>[]
}

export interface BookByIdType extends BookType {
	similarBooks: BookType[]
}
