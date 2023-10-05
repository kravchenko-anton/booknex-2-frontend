import { getUploadUrl } from '@/services/api-config'
import { request } from '@/services/api/request.api'
import { StorageFolderType } from '@/services/types/global'

export const uploadService = {
	async upload(file: Blob, type: StorageFolderType) {
		return request<{ name: string }>({
			url: getUploadUrl(`/upload/${type}`),
			method: 'POST',
			data: file,
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		})
	},

	async replacement(
		file: Blob,
		deleteFilename: string,
		folder: StorageFolderType
	) {
		return request<{ name: string }>({
			url: getUploadUrl('/replacement'),
			method: 'POST',
			data: {
				file,
				deleteFilename,
				folder
			},
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
