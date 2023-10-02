import { getUploadUrl } from '@/services/api-config'
import { request } from '@/services/api/request.api'

export const uploadService = {
	async upload(file: File, type: 'image' | 'epub') {
		return request<{ name: string }>({
			url: getUploadUrl(`/upload/${type}`),
			method: 'POST',
			data: file
		})
	}
}
