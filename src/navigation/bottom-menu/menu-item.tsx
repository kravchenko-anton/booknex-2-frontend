import { usePressAnimation } from '@/animations/press-animation'
import { Title } from '@/components/ui/title/title'
import { menuItems } from '@/navigation/bottom-menu/menu-data'
import {
	IMenuItem,
	TypeNavigate
} from '@/navigation/bottom-menu/menu.interface'
import { AnimatedPressable } from '@/types/component-types'
import { Color } from '@/utils/color'
import { Ionicons } from '@expo/vector-icons'
import { FC } from 'react'
import { Pressable } from 'react-native'

interface IMenuItemProps {
	item: IMenuItem
	nav: TypeNavigate
	currentRoute?: string
}

const MenuItem: FC<IMenuItemProps> = ({ currentRoute, item, nav }) => {
	const isActive = currentRoute === item.path

	const { pressFunctions, animatedStyle } = usePressAnimation()

	return (
		<Pressable
			className='w-[20%] items-center'
			onPress={() => nav(item.path)}
			{...pressFunctions}>
			<AnimatedPressable style={[animatedStyle]} pointerEvents='none'>
				<Ionicons
					name={
						isActive
							? item.iconName
							: (`${item.iconName}-outline` as (typeof menuItems)[0]['iconName'])
					}
					size={34}
					color={isActive ? Color.secondary : Color.gray}
				/>
			</AnimatedPressable>
			<Title
				size={16}
				weight={isActive ? 'bold' : 'regular'}
				color={isActive ? Color.secondary : Color.gray}>
				{item.path}
			</Title>
		</Pressable>
	)
}

export default MenuItem