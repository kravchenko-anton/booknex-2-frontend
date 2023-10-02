import { getShelfUrl } from '@/services/api-config'
import { request } from '@/services/api/request.api'
import { BookByIdType } from '@/services/types/book-service-types'
import {
	ShelfManipulationType,
	ShortShelfType
} from '@/services/types/shelf-service-types'

export const shelfService = {
	async byId(id: number) {
		return request<BookByIdType>({
			url: getShelfUrl(`/by-id/${id}`)
		})
	},

	async myList() {
		return request<BookByIdType>({
			url: getShelfUrl('/get-shelves')
		})
	},

	// admin

	async all() {
		return request({
			url: getShelfUrl('/get-all')
		})
	},
	async create(dto: ShelfManipulationType) {
		return request<ShortShelfType>({
			url: getShelfUrl('/create'),
			method: 'POST',
			data: dto
		})
	},

	async delete(id: number) {
		return request({
			url: getShelfUrl(`/delete/${id}`),
			method: 'DELETE'
		})
	},

	async update(id: number, dto: ShelfManipulationType) {
		return request<ShortShelfType>({
			url: getShelfUrl(`/update/${id}`),
			method: 'PUT',
			data: dto
		})
	}
}
