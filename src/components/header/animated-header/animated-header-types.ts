import { HeaderProperties } from '@/components/header/header-types'

export interface AnimatedHeaderProperties
	extends Pick<HeaderProperties, 'right'> {
	title: string
	transientValue: number
	scrollPosition: { value: number }
}
