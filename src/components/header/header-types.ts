import type { IconProps } from '@/components/ui/icon/icon-types'
import type { ViewDefaultProps } from '@/types/component-types'
import type { WrapperProps } from '@/types/global'
import type { ColorProps } from '@/utils/color'

type HeaderIcon = {
	element?: JSX.Element
	icon?: Omit<IconProps, 'color' | 'size'>
}

export interface HeaderProps
	extends WrapperProps<ViewDefaultProps>,
		ColorProps {
	leftIcon: { back?: boolean } & HeaderIcon
	rightIcon?: HeaderIcon
}
