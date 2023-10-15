import { AnimatedHeaderProperties } from '@/components/header/animated-header/animated-header-types'
import { HeaderProperties } from '@/components/header/header-types'
import { ReactNode } from 'react'

export interface LargeHeaderScrollLayoutProperties {
	animatedHeader: Omit<AnimatedHeaderProperties, 'scrollPosition'>
	headerChildren: ReactNode
}

export interface HeaderScrollLayoutProperties {
	header: Omit<HeaderProperties, 'className' | 'style'>
	animatedHeader: Omit<AnimatedHeaderProperties, 'scrollPosition'>
}
