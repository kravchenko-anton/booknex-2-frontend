import type { Style, Width_Height } from '@/types/global'

export interface SkeletonProps extends Width_Height {
	borderRadius?: number
	transparent?: boolean
	style: Style
}
