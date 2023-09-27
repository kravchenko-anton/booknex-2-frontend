import { ShortBookType } from '@/services/types/book-service-types'

export interface StatisticsType {
	totalUsers: number
	totalReadTime: number
	mostReadBook: ShortBookType[]
}
