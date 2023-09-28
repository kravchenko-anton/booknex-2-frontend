import { useMemo } from 'react'
import { useAnimatedStyle, withSpring } from 'react-native-reanimated'

export const headerAnimation = (
	scrollPosition: { value: number },
	transientValue: number
) => {
	const headerStyle = useAnimatedStyle(() => {
		return {
			opacity: withSpring(scrollPosition.value >= transientValue ? 1 : 0),
			pointerEvents: scrollPosition.value >= transientValue ? 'auto' : 'none'
		}
	})

	return useMemo(() => ({ headerStyle }), [headerStyle])
}
