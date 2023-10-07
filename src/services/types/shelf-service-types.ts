import { ShortBookType } from '@/services/types/book-service-types'
import { DefaultModelFields } from '@/types/global'

export interface ShelfType extends DefaultModelFields {
	name: string
	color: string
	image: string
	books: ShortBookType[]
}

export interface ShortShelfType extends Omit<ShelfType, 'books'> {
	icon: string
}

export type ShelfManipulationType = Omit<ShelfType, 'books' | 'color'>
