import { getUsersUrl } from '@/services/api-config'
import { request } from '@/services/api/request.api'
import { ShortBookType } from '@/services/types/book-service-types'
import { ShortShelfType } from '@/services/types/shelf-service-types'
import {
	UserLibraryFieldsType,
	UserLibraryType,
	UserType,
	UserUpdateDto
} from '@/services/types/user-services-types'
import { DefaultModelFields } from '@/types/global'

export const userServices = {
	async getProfile() {
		return request<UserType>({
			url: getUsersUrl('/get-profile'),
			method: 'GET'
		})
	},
	async getLibrary() {
		return request<UserLibraryType>({
			url: getUsersUrl('/get-library'),
			method: 'GET'
		})
	},

	async getMore(type: keyof UserLibraryFieldsType) {
		return request<ShortBookType[] | ShortShelfType[]>({
			url: getUsersUrl(`/library/${type}`),
			method: 'GET'
		})
	},
	async update(dto: UserUpdateDto) {
		return request<Pick<UserType, 'email' | 'name' | keyof DefaultModelFields>>(
			{
				url: getUsersUrl('/update-user'),
				method: 'POST',
				data: dto
			}
		)
	},

	async toggle(type: keyof UserLibraryFieldsType, id: number) {
		return request<{ toggle: boolean }>({
			url: getUsersUrl(`/toggle/${type}/${id}`),
			method: 'PATCH'
		})
	},

	// admin

	async all() {
		return request({
			url: getUsersUrl('/get-all-users')
		})
	},

	async delete(id: number) {
		return request({
			url: getUsersUrl(`/delete/${id}`),
			method: 'DELETE'
		})
	}
}
