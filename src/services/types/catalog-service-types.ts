import { BookType, ShortBookType } from '@/services/types/book-service-types'
import { GenreType } from '@/services/types/genre-service-types'

interface SameBreathBookType extends ShortBookType {
	pages: number
}
export interface CatalogType {
	recommendations: ShortBookType[]
	mostRelatedGenres: Pick<
		GenreType,
		'name' | 'createdAt' | 'id' | 'updatedAt'
	>[]
	popularNow: (ShortBookType & { description: string; color: string })[]
	bestSellers: ShortBookType[]
	newReleases: ShortBookType[]
	sameBreath: SameBreathBookType[]
	genres: {
		name: string
		majorBooks: BookType[]
	}[]
}

export interface searchBookType extends ShortBookType {
	likedPercent: number
	pages: number
	isbn: string
}
