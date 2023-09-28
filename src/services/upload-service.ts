import { getUploadUrl } from '@/services/api-config'
import { request } from '@/services/api/request.api'
import { BookType } from '@/services/types/book-service-types'

interface BookByIdType extends BookType {
	similarBooks: BookType[]
}

export const uploadService = {
	async upload(file: File, type: 'image' | 'epub') {
		return request<{ name: string }>({
			url: getUploadUrl(`/upload/${type}`),
			method: 'POST',
			data: file
		})
	}
}
