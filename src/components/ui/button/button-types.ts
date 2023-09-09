import { UPressableProps } from '@/types/component.types'
import { IconType } from '@/types/global'

export type IButtonTypes = UPressableProps & {
	size: 'small' | 'medium' | 'large'
	width?: number | string
	textSize?: number
	icon?: IconType
	iconSize?: number
	borderRadius?: number
	variant?: 'primary' | 'secondary' | 'accent'  | 'ghost'
	uppercase?: boolean
	text: string
}
