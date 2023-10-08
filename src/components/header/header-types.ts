import type { IconProperties } from '@/components/ui/icon/icon-types'
import type { ViewDefaultProperties } from '@/types/component-types'
import type { ColorProperties } from '@/utils/color'

type HeaderIcon = Omit<IconProperties, 'color' | 'size'> | Element | JSX.Element

export interface HeaderProperties
	extends ColorProperties,
		Pick<ViewDefaultProperties, 'style' | 'className'> {
	leftIcon?: 'back' | HeaderIcon
	rightIcon?: HeaderIcon
}
