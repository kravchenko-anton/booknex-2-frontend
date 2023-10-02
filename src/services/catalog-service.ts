import { getCatalogUrl } from '@/services/api-config'
import { request } from '@/services/api/request.api'
import {
	CatalogType,
	SearchBookType,
	TopSearchersType
} from '@/services/types/catalog-service-types'

export const catalogService = {
	async search(query: string) {
		return request<SearchBookType[]>({
			url: getCatalogUrl(`/search/${query}`),
			method: 'GET'
		})
	},
	async topSearchers() {
		return request<TopSearchersType[]>({
			url: getCatalogUrl('/topSearchers'),
			method: 'GET'
		})
	},
	async catalog() {
		return request<CatalogType>({
			url: getCatalogUrl('/'),
			method: 'GET'
		})
	}
}
