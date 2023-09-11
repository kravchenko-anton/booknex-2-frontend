import { BookType } from '@/services/types/book-service-types'
import { DefaultModelFields } from '@/types/global'

export interface addHistoryDto {
	time: number
	bookId: 8
}

export interface HistoryByBookIdType extends DefaultModelFields {
	time: number
}

export interface HistoryGetType extends DefaultModelFields {
	time: number
	book: BookType
}
