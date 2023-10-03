import { HeaderProperties } from '@/components/header/header-types'
import Icon from '@/components/ui/icon/icon'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import type { FC } from 'react'
import { View } from 'react-native'

const Header: FC<HeaderProperties> = properties => {
	const { goBack } = useTypedNavigation()
	return (
		<View
			className={`flex-row items-center justify-between ${properties.wrapperClassName}`}
			style={properties.wrapperStyle}>
			{properties.leftIcon.back ? (
				<Icon
					name={'arrow-left'}
					onPress={() => {
						goBack()
					}}
					size={'large'}
					color={properties.color}
					className='pl-0'
				/>
			) : properties.leftIcon.icon ? (
				<Icon
					size={'large'}
					className='pl-0'
					color={properties.color}
					{...properties.leftIcon.icon}
				/>
			) : (
				properties.leftIcon.element
			)}

			{properties.rightIcon?.icon ? (
				<Icon
					size={'large'}
					className='pr-0'
					color={properties.color}
					{...properties.rightIcon.icon}
				/>
			) : (
				properties.rightIcon?.element
			)}
		</View>
	)
}

export default Header
