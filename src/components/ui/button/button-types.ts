import { UPressableProps } from '@/types/component-types'

export type ButtonProps = UPressableProps & {
	width?: number | string
	size: 'small' | 'medium' | 'large'
	variant?: 'primary' | 'secondary' | 'ghost'
	textSize?: number
	uppercase?: boolean
	text: string
}
