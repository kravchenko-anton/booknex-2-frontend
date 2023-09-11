import { HeaderProps } from '@/components/header/header-types'
import Icon from '@/components/ui/icon/icon'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import { FC } from 'react'
import { View } from 'react-native'

const Header: FC<HeaderProps> = props => {
	const { goBack } = useTypedNavigation()
	return (
		<View className='flex-row items-center justify-between'>
			{'back' in props.leftIcon && props.leftIcon.back ? (
				<Icon
					name={'chevron-back-outline'}
					onPress={() => goBack()}
					size={'large'}
					style={{ paddingLeft: 0 }}
				/>
			) : 'icon' in props.leftIcon && props.leftIcon.icon ? (
				<Icon
					size={'large'}
					style={{ paddingLeft: 0 }}
					{...props.leftIcon.icon}
				/>
			) : (
				'custom' in props.leftIcon && props.leftIcon.custom
			)}

			{props.rightIcon && 'icon' in props.rightIcon && props.rightIcon.icon ? (
				<Icon
					size={'large'}
					style={{ paddingRight: 0 }}
					{...props.rightIcon.icon}
				/>
			) : (
				props.rightIcon && 'custom' in props.rightIcon && props.rightIcon.custom
			)}
		</View>
	)
}

export default Header
