import { getUsersUrl } from '@/services/api.config'
import { request } from '@/services/api/request.api'
import { UserType } from '@/services/types/user-services-types'

export const userServices = {
	async getProfile() {
		return request<UserType>({
			url: getUsersUrl('/get-profile'),
			method: 'GET'
		})
	},

	async updateUser(dto: UserType, file: File) {
		const formData = new FormData()
		formData.append('dto', JSON.stringify(dto))
		formData.append('file', file)
		return request<UserType>({
			url: getUsersUrl('/update-user'),
			method: 'POST',
			data: formData,
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		})
	},

	async toggle(type: 'reading' | 'like' | 'finish', id: number) {
		return request<UserType>({
			url: getUsersUrl(`/toggle/${type}/${id}`),
			method: 'PATCH'
		})
	}
}
