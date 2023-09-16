import { UPressableProps } from '@/types/component-types'
import { IconType } from '@/types/global'
import { ColorProps } from '@/utils/color'

export interface IconProps extends UPressableProps, ColorProps {
	name: IconType
	size: 'small' | 'medium' | 'large'
	variant?: 'filled' | 'outlined' | 'ghost'
}
