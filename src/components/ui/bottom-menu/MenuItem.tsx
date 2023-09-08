import { Title } from '@/components/title/title'
import { Ionicons } from '@expo/vector-icons'
import { FC } from 'react'
import { Pressable } from 'react-native'
import { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'
import { AnimatedPressable } from '../../../types/component.types'
import { Color } from '../../../utils/color'
import { menuItems } from './menu.data'


import type { IMenuItem, TypeNavigate } from './menu.interface'

interface IMenuItemProps {
	item: IMenuItem
	nav: TypeNavigate
	currentRoute?: string
}

const MenuItem: FC<IMenuItemProps> = ({ currentRoute, item, nav }) => {
	const isActive = currentRoute === item.path
	const scale = useSharedValue(1);
	const animatedStyle = useAnimatedStyle(() => {
		return {
			transform: [{ scale: scale.value }],
		};
	});
	
	const handlePress = () => {
		scale.value = withSpring(1.2, {}, () => {
			scale.value = withSpring(1);
		});
		nav(item.path);
	};
	
	return (
		<Pressable  className='items-center w-[20%]' onPress={() => handlePress()}>
				<AnimatedPressable style={[animatedStyle]}>
			<Ionicons
					name={isActive ? item.iconName : `${item.iconName}-outline` as (typeof menuItems)[0]['iconName']}
					size={34}
					color={isActive ? Color.accent : Color.gray}
				/>
				</AnimatedPressable>
				<Title> 
					{item.path}
				</Title>
		</Pressable>
	)
}

export default MenuItem
