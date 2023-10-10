import { AnimatedHeartProperties } from '@/components/animated-heart/animated-heart-types'
import { useFavoriteAnimation } from '@/components/animated-heart/useHeartAnimation'
import { useToggle } from '@/hooks/useToggle/useToggle'
import { AnimatedView } from '@/types/component-types'
import { Color } from '@/utils/color'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { FC } from 'react'
import { Pressable, StyleSheet } from 'react-native'
import { withSpring } from 'react-native-reanimated'

const AnimatedHeart: FC<AnimatedHeartProperties> = ({
	size = 30,
	type,
	id,
	color = Color.white,
	style,
	...properties
}) => {
	const { handleToggle, isSmashed } = useToggle({ type, id })
	const { outlineStyle, fillStyle, liked } = useFavoriteAnimation(isSmashed)
	return (
		<Pressable
			onPress={() => {
				liked.value = withSpring(liked.value === 1 ? 0 : 1)
				handleToggle()
			}}
			className='items-center justify-center px-2'
			style={style}
			{...properties}>
			<AnimatedView
				className='items-center justify-center'
				style={[StyleSheet.absoluteFill, outlineStyle]}>
				<MaterialCommunityIcons
					name='heart-outline'
					size={size}
					color={color}
				/>
			</AnimatedView>

			<AnimatedView className='items-center justify-center' style={fillStyle}>
				<MaterialCommunityIcons name='heart' size={size} color={Color.alert} />
			</AnimatedView>
		</Pressable>
	)
}

export default AnimatedHeart
