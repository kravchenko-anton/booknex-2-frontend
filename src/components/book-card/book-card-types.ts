import { ViewDefaultProps } from '@/types/component-types'

export interface BookCardProps extends ViewDefaultProps {
	image: {
		uri: string
		width: number
		height: number
	}
	title?: string
	author?: string
	likingRate?: number
}
