import { getCatalogUrl } from '@/services/api-config'
import { request } from '@/services/api/request.api'
import { ShortBookType } from '@/services/types/book-service-types'
import { CatalogType } from '@/services/types/catalog-service-types'

export const catalogService = {
	async search(query: string) {
		return request<ShortBookType[]>({
			url: getCatalogUrl(`/search/${query}`),
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
