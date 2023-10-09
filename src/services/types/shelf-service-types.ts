import { BookType, ShortBookType } from '@/services/types/book-service-types'
import { DefaultModelFields } from '@/types/global'

export interface ShelfType extends DefaultModelFields {
	title: string
	description: string
	color: string
	image: string
	books: (ShortBookType &
		Pick<BookType, 'description' | 'pages' | 'likedPercentage'>)[]
}

export interface ShortShelfType extends Omit<ShelfType, 'books'> {
	icon: string
}

export type ShelfManipulationType = Omit<ShelfType, 'books' | 'color'>
