import { BookType } from '@/services/types/book-service-types'
import { DefaultModelFields } from '@/types/global'

export interface AddHistoryDto {
	time: number
	bookId: number
}

export interface HistoryGetType extends DefaultModelFields {
	time: number
	book: BookType
}
