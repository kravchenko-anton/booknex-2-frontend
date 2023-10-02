import type { PressableDefaultProperties } from '@/types/component-types'
import type { ColorProperties } from '@/utils/color'
import { Octicons } from '@expo/vector-icons'

export interface IconProperties
	extends PressableDefaultProperties,
		ColorProperties {
	name: keyof typeof Octicons.glyphMap
	size: 'small' | 'medium' | 'large'
	variant?: 'filled' | 'outlined' | 'ghost'
	noPadding?: boolean
}
