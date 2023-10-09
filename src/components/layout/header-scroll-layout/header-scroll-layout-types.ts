import { AnimatedHeaderProperties } from '@/components/header/animated-header/animated-header-types'
import { HeaderProperties } from '@/components/header/header-types'
import { LineColorType } from '@/utils/color'

export interface LargeHeaderScrollLayoutProperties {
	header: Omit<HeaderProperties, 'className' | 'style' | 'color'>
	animatedHeader: Omit<AnimatedHeaderProperties, 'scrollPosition'>
	title: string
	description?: typeof this.type extends 'background' ? string : never
	type: 'background' | 'image'
	background: typeof this.type extends 'background' ? LineColorType : string
}

export interface HeaderScrollLayoutProperties {
	header: Omit<HeaderProperties, 'className' | 'style'>
	animatedHeader: Omit<AnimatedHeaderProperties, 'scrollPosition'>
}
