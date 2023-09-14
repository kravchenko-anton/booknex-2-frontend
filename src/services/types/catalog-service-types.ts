import { BookType } from '@/services/types/book-service-types'

export interface CatalogType {
	recommendations: BookType[]
	popularNow: BookType[]
	bestSellers: BookType[]
	newReleases: BookType[]
	genres: {
		name: string
		books: BookType[]
	}[]
}
