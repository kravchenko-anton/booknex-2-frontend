import { IconProps } from '@/components/ui/icon/icon-types'

type HeaderIcon =
	| {
			custom?: JSX.Element
	  }
	| {
			icon?: Omit<IconProps, 'variant' | 'size'>
	  }
export interface HeaderProps {
	leftIcon: { back?: boolean } | HeaderIcon
	rightIcon?: HeaderIcon
}
