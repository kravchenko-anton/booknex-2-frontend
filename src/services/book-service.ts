import { getBookUrl } from '@/services/api.config'
import { request } from '@/services/api/request.api'
import { BookType } from '@/services/types/book-service-types'

interface BookByIdType extends BookType {
	similarBooks: BookType[]
}
export const bookService = {
	async byId(id: number) {
		return request<BookByIdType>({
			url: getBookUrl(`/${id}`)
		})
	}
}
