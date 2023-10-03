import type { PressableDefaultProperties } from '@/types/component-types'

export interface BookCardProperties extends PressableDefaultProperties {
	image: {
		uri: string
		size: 'small' | 'medium' | 'large'
	}
	title?: string
	author?: string
	likedPercentage?: number
	pages?: number
}
