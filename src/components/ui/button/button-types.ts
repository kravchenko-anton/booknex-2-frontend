import type { PressableDefaultProperties } from '@/types/component-types'

export type ButtonProperties = PressableDefaultProperties & {
	size: 'small' | 'medium' | 'large',
	text: string,
	textSize?: number,
	uppercase?: boolean,
	variant?: 'primary' | 'secondary' | 'ghost' | 'dust' | 'pale',
	width?: number | string
}
