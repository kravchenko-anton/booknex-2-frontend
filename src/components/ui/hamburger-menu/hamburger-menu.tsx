import { hamburgerAnimation } from '@/components/ui/hamburger-menu/hamburger-animation'
import { Title } from '@/components/ui/title/title'
import { AnimatedPressable, AnimatedView } from '@/types/component-types'
import { Color, ColorProps } from '@/utils/color'
import { FC } from 'react'
import { View } from 'react-native'
import { useSharedValue } from 'react-native-reanimated'

const className = 'w-6 h-0.5'
interface HamburgerMenuProps extends ColorProps {
	position?: 'left' | 'right'
	elements?: {
		title: string
		onPress: () => void
	}[]
}
const HamburgerMenu: FC<HamburgerMenuProps> = ({
	color = Color.black,
	position = 'left',
	elements
}) => {
	const isOpen = useSharedValue(false)
	const animation = hamburgerAnimation(isOpen, position)
	return (
		<>
			<AnimatedPressable
				onPress={() => (isOpen.value = false)}
				style={animation.backdropStyle}
				className='absolute bottom-0 left-0 right-0 top-0 z-10 h-full w-full '
			/>
			<View className='relative z-50 '>
				<AnimatedPressable
					className='p-4'
					onPress={() => (isOpen.value = !isOpen.value)}
					style={[
						{
							...(position === 'left'
								? { paddingLeft: 0 }
								: { paddingRight: 0 })
						},
						animation.styleAnimation
					]}>
					<AnimatedView
						className={className}
						style={[
							{ backgroundColor: color },
							animation.transformFirstLineAnimation
						]}
					/>
					<AnimatedView
						className={className}
						style={[
							{ backgroundColor: color },
							animation.widthSecondLineAnimation
						]}
					/>
					<AnimatedView
						className={className}
						style={[
							{ backgroundColor: color },
							animation.transformThirdLineAnimation
						]}
					/>
				</AnimatedPressable>
				<AnimatedView
					style={[
						{
							...(position === 'left' ? { left: 0 } : { right: 0 }),
							pointerEvents: isOpen.value ? 'auto' : 'none'
						},
						animation.popupStyle
					]}
					className='absolute top-14 min-w-[200px] rounded-xl bg-white p-3'>
					{elements?.map(element => (
						<Title
							key={element.title}
							className='py-3'
							weight={'regular'}
							onPress={element.onPress}>
							{element.title}
						</Title>
					))}
				</AnimatedView>
			</View>
		</>
	)
}

export default HamburgerMenu
