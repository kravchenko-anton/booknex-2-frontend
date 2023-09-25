import { PressableDefaultProps } from '@/types/component-types'

export type ButtonProps = PressableDefaultProps & {
	width?: number | string
	size: 'small' | 'medium' | 'large'
	variant?: 'primary' | 'secondary' | 'ghost' | 'dust' | 'pale'
	textSize?: number
	uppercase?: boolean
	text: string
}
