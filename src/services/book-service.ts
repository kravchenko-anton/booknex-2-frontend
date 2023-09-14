import { getBookUrl } from '@/services/api-config'
import { request } from '@/services/api/request.api'
import { BookByIdType } from '@/services/types/book-service-types'

export const bookService = {
	async byId(id: number) {
		return request<BookByIdType>({
			url: getBookUrl(`/${id}`)
		})
	}
}
