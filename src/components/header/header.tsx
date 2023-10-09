import { HeaderProperties } from '@/components/header/header-types'
import { useHeader } from '@/components/header/useHeader'
import { Color } from '@/utils/color'
import type { FC } from 'react'
import { isValidElement } from 'react'
import { View } from 'react-native'

const Header: FC<HeaderProperties> = ({
	style,
	color = Color.black,
	leftIcon = 'back',
	...properties
}) => {
	const { rightIconSettings, leftIconSettings } = useHeader({
		color,
		leftIcon,
		rightIcon: properties.rightIcon
	})
	return (
		<View className={'flex-row items-center justify-between'} style={style}>
			{
				leftIconSettings[
					leftIcon === 'back'
						? leftIcon
						: isValidElement(properties.rightIcon)
						? 'element'
						: 'icon'
				]
			}
			{properties.rightIcon &&
				rightIconSettings[
					isValidElement(properties.rightIcon) ? 'element' : 'icon'
				]}
		</View>
	)
}

export default Header
