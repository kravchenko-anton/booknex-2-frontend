import { BookType, ShortBookType } from '@/services/types/book-service-types'
import { DefaultModelFields } from '@/types/global'

export interface GenreType extends DefaultModelFields {
	name: string
	color: string
	books: BookType[]
}

export interface GenreByIdType extends Omit<GenreType, 'books'> {
	newestBooks: ShortBookType[]
	bestSellers: ShortBookType[]
}
