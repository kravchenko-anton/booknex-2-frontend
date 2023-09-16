import { IconProps } from '@/components/ui/icon/icon-types'
import { ViewDefaultProps } from '@/types/component-types'
import { WrapperProps } from '@/types/global'

type HeaderIcon =
	| {
			custom?: JSX.Element
	  }
	| {
			icon?: Omit<IconProps, 'variant' | 'size'>
	  }
export interface HeaderProps extends WrapperProps<ViewDefaultProps> {
	leftIcon: { back?: boolean } | HeaderIcon
	rightIcon?: HeaderIcon
}
