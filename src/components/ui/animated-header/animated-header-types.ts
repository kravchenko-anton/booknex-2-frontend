import { IconProps } from '@/components/ui/icon/icon-types'

export interface AnimatedHeaderProps {
	title: string
	transientValue: number
	rightIcon?: {
		icon?: IconProps
		element?: JSX.Element
	}
	scrollPosition: { value: number }
}
