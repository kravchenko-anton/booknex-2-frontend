import type { Dimensions, Style } from '@/types/global'

export interface SkeletonProperties extends Dimensions {
	borderRadius?: number
	transparent?: boolean
	style: Style
}
