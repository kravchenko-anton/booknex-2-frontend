import { getBookUrl } from '@/services/api-config'
import { request } from '@/services/api/request.api'
import {
	BookByIdType,
	BookManipulationType,
	ReviewType
} from '@/services/types/book-service-types'

export const bookService = {
	async byId(id: number) {
		return request<BookByIdType>({
			url: getBookUrl(`/by-id/${id}`)
		})
	},
	async review(id: number) {
		return request<ReviewType>({
			url: getBookUrl(`/review/${id}`),
			method: 'POST'
		})
	},

	// admin

	async create() {
		return request<BookManipulationType>({
			url: getBookUrl('/create'),
			method: 'POST'
		})
	},

	async all() {
		return request({
			url: getBookUrl('/get-all-books')
		})
	},

	async delete(id: number) {
		return request({
			url: getBookUrl(`/delete/${id}`),
			method: 'DELETE'
		})
	},
	async emotions() {
		return request({
			url: getBookUrl('/emotions')
		})
	},

	async update(id: number) {
		return request<BookManipulationType>({
			url: getBookUrl(`/update/${id}`),
			method: 'PUT'
		})
	}
}
