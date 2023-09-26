import type { PressableDefaultProps } from '@/types/component-types'

export interface BookCardProps extends PressableDefaultProps {
	image: {
		uri: string
		width: number
		height: number
	}
	title?: string
	author?: string
	likedPercent?: number
	pages?: number
}
