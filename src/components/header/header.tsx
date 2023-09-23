import { HeaderProps } from '@/components/header/header-types'
import Icon from '@/components/ui/icon/icon'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import { FC } from 'react'
import { View } from 'react-native'

const Header: FC<HeaderProps> = ({
	rightIcon,
	leftIcon,
	wrapperStyle,
	wrapperClassName
}) => {
	const { goBack } = useTypedNavigation()
	return (
		<View
			className={`flex-row items-center justify-between ${wrapperClassName}`}
			style={wrapperStyle}>
			{'back' in leftIcon && leftIcon.back ? (
				<Icon
					name={'chevron-left'}
					onPress={() => goBack()}
					size={'large'}
					style={{ paddingLeft: 0 }}
				/>
			) : 'icon' in leftIcon && leftIcon.icon ? (
				<Icon size={'large'} style={{ paddingLeft: 0 }} {...leftIcon.icon} />
			) : (
				'custom' in leftIcon && leftIcon.custom
			)}

			{rightIcon && 'icon' in rightIcon && rightIcon.icon ? (
				<Icon size={'large'} style={{ paddingRight: 0 }} {...rightIcon.icon} />
			) : (
				rightIcon && 'custom' in rightIcon && rightIcon.custom
			)}
		</View>
	)
}

export default Header
