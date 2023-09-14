import { getUsersUrl } from '@/services/api-config'
import { request } from '@/services/api/request.api'
import { UserType, UserUpdateDto } from '@/services/types/user-services-types'

export const userServices = {
	async getProfile() {
		return request<UserType>({
			url: getUsersUrl('/get-profile'),
			method: 'GET'
		})
	},

	async updateUser(dto: UserUpdateDto) {
		return request<UserType>({
			url: getUsersUrl('/update-user'),
			method: 'POST',
			data: dto,
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
