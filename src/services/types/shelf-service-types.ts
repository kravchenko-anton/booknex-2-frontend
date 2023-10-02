import { ShortBookType } from '@/services/types/book-service-types'

export interface ShelfType {
	name: string
	color: string
	picture: string
	books: ShortBookType[]
}

export type ShortShelfType = Omit<ShelfType, 'books'>

export interface ShelfManipulationType {
	name: string
	picture: string
	books: number[]
}
