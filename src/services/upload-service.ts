import { getUploadUrl } from '@/services/api-config'
import { request } from '@/services/api/request.api'
import { StorageFolderType } from '@/services/types/global'

export const uploadService = {
	async upload(file: FormData, type: StorageFolderType) {
		return request<{ name: string }>({
			url: getUploadUrl(`/${type}`),
			method: 'POST',
			data: file,
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		})
	},

	async replacement(formData: FormData) {
		console.log('replacement', formData)
		return request<{ name: string }>({
			url: getUploadUrl('/replacement'),
			method: 'POST',
			data: formData,
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		})
	},

	async delete(filename: string) {
		return request({
			url: getUploadUrl('/delete'),
			method: 'POST',
			data: {
				filename
			}
		})
	}
}
