import type { ImageDefaultProps } from '@/types/component-types'
import type { Width_Height, WrapperProps } from '@/types/global'

export interface ImageTypes
	extends Omit<ImageDefaultProps, 'source'>,
		Width_Height,
		WrapperProps<ImageDefaultProps['style']> {
	url: string
	transparentSkeleton?: boolean
	fullSize?: boolean
}
