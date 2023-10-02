import type { PressableDefaultProperties } from '@/types/component-types'

export type ButtonProperties = PressableDefaultProperties & {
	width?: number | string
	size: 'small' | 'medium' | 'large'
	variant?: 'primary' | 'secondary' | 'ghost' | 'dust' | 'pale'
	textSize?: number
	uppercase?: boolean
	text: string
}
