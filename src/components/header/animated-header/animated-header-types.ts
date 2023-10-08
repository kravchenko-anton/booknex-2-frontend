import { HeaderProperties } from '@/components/header/header-types'

export interface AnimatedHeaderProperties
	extends Pick<HeaderProperties, 'rightIcon'> {
	title: string
	transientValue: number
	scrollPosition: { value: number }
}
