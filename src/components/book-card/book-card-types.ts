import type { PressableDefaultProperties } from '@/types/component-types'

export interface BookCardProperties extends PressableDefaultProperties {
	image: {
		uri: string
		width: number
		height: number
	}
	title?: string
	author?: string
	likedPercentage?: number
	pages?: number
}
