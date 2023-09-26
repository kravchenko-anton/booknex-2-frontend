import { Color } from '@/utils/color'
import { useMemo } from 'react'
import { useAnimatedStyle } from 'react-native-reanimated'

export const headerAnimation = (scrollPosition: { value: number }) => {
	const headerStyle = useAnimatedStyle(() => {
		return {
			position: 'absolute',
			top: 0,
			left: 0,
			right: 0,
			height: 75,
			zIndex: 50,
			backgroundColor: Color.canvas,
			opacity: scrollPosition.value >= 85 ? 1 : 0,
			pointerEvents: scrollPosition.value >= 85 ? 'auto' : 'none'
		}
	})

	return useMemo(() => ({ headerStyle }), [headerStyle])
}
