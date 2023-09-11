import { UPressableProps } from '@/types/component-types'
import { IconType } from '@/types/global'

export interface IconProps extends UPressableProps {
	name: IconType
	size: 'small' | 'medium' | 'large'
	variant?: 'filled' | 'outlined' | 'ghost'
}
