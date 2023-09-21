import { BookType, ShortBookType } from '@/services/types/book-service-types'
import { GenreType } from '@/services/types/genre-service-types'

export interface CatalogType {
	recommendations: ShortBookType[]
	mostRelatedGenres: Pick<
		GenreType,
		'name' | 'createdAt' | 'id' | 'updatedAt'
	>[]
	popularNow: (ShortBookType & { description: string })[]
	bestSellers: ShortBookType[]
	newReleases: ShortBookType[]
	sameBreath: ShortBookType[]
	genres: {
		name: string
		books: BookType[]
	}[]
}
