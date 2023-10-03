import type { IconProperties } from '@/components/ui/icon/icon-types'
import type { ViewDefaultProperties } from '@/types/component-types'
import type { ColorProperties } from '@/utils/color'

interface HeaderIcon {
	element?: JSX.Element
	icon?: Omit<IconProperties, 'color' | 'size'>
}

export interface HeaderProperties extends ColorProperties {
	wrapperStyle?: ViewDefaultProperties['style']
	wrapperClassName?: string
	leftIcon: { back?: boolean } & HeaderIcon
	rightIcon?: HeaderIcon
}
