import { IconProperties } from '@/components/ui/icon/icon-types'

export interface AnimatedHeaderProperties {
	title: string
	transientValue: number
	rightIcon?: {
		icon?: IconProperties
		element?: JSX.Element
	}
	scrollPosition: { value: number }
}
