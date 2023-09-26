import type { PressableDefaultProps } from '@/types/component-types'
import type { ColorProps } from '@/utils/color'
import { Octicons } from '@expo/vector-icons'

export interface IconProps extends PressableDefaultProps, ColorProps {
	name: keyof typeof Octicons.glyphMap
	size: 'small' | 'medium' | 'large'
	variant?: 'filled' | 'outlined' | 'ghost'
	noPadding?: boolean
}
