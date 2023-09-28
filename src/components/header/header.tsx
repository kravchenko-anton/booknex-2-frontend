import { HeaderProps } from '@/components/header/header-types'
import Icon from '@/components/ui/icon/icon'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import type { FC } from 'react'
import { View } from 'react-native'

const Header: FC<HeaderProps> = ({
	rightIcon,
	leftIcon,
	wrapperStyle,
	wrapperClassName,
	color
}) => {
	const { goBack } = useTypedNavigation()
	return (
		<View
			className={`flex-row items-center justify-between ${wrapperClassName}`}
			style={wrapperStyle}>
			{leftIcon.back ? (
				<Icon
					name={'arrow-left'}
					onPress={() => goBack()}
					size={'large'}
					color={color}
					style={{ paddingLeft: 0 }}
				/>
			) : leftIcon.icon ? (
				<Icon
					size={'large'}
					style={{ paddingLeft: 0 }}
					color={color}
					{...leftIcon.icon}
				/>
			) : (
				leftIcon.element
			)}

			{rightIcon && rightIcon.icon ? (
				<Icon
					size={'large'}
					style={{ paddingRight: 0 }}
					color={color}
					{...rightIcon.icon}
				/>
			) : (
				rightIcon?.element
			)}
		</View>
	)
}

export default Header
