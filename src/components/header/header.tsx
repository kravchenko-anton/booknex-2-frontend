import { HeaderProperties } from '@/components/header/header-types'
import Icon from '@/components/ui/icon/icon'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import type { FC } from 'react'
import { View } from 'react-native'

const Header: FC<HeaderProperties> = ({
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
					onPress={() => {
						goBack()
					}}
					size={'large'}
					color={color}
					className='pl-0'
				/>
			) : leftIcon.icon ? (
				<Icon
					size={'large'}
					className='pl-0'
					color={color}
					{...leftIcon.icon}
				/>
			) : (
				leftIcon.element
			)}

			{rightIcon?.icon ? (
				<Icon
					size={'large'}
					className='pr-0'
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
