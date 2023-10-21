import type { ShortBookType } from '@/services/types/book-service-types'

export interface RecommendationProperties {
	data: ShortBookType[]
	renderItem: ({ item }: { item: ShortBookType }) => JSX.Element
}
