import {
	AuthorType,
	ShortAuthorType
} from '@/services/types/author-service-types'
import { BookType, ShortBookType } from '@/services/types/book-service-types'
import { DefaultModelFields } from '@/types/global'

export interface GenreType extends DefaultModelFields {
	name: string
	color: string
	books: BookType[]
}

export interface SimilarBestSellersType extends Omit<GenreType, 'books'> {
	majorBooks: ShortBookType[]
}

export interface GenreByIdType extends Omit<GenreType, 'books'> {
	newestBooks: Pick<BookType, keyof ShortBookType | 'color' | 'description'>[]
	bestSellers: ShortBookType[]
	bestSellersFromSimilar: SimilarBestSellersType[]
	bestAuthors: (ShortAuthorType & Pick<AuthorType, 'picture'>)[]
}
