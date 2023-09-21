import { useMemo } from 'react'
import {
	useAnimatedStyle,
	withSpring,
	withTiming
} from 'react-native-reanimated'

export const useRegisterAnimation = (isGenresModal: boolean) => {
	const showAnimation = useAnimatedStyle(() => ({
		translateY: withSpring(isGenresModal ? 0 : 100, {
			damping: 50,
			stiffness: 10,
			mass: 1
		}),
		opacity: withTiming(isGenresModal ? 1 : 0, {
			duration: 1000
		}),
		display: isGenresModal ? 'flex' : 'none'
	}))
	const hideAnimation = useAnimatedStyle(() => ({
		translateY: withSpring(isGenresModal ? -100 : 0, {
			damping: 50,
			stiffness: 10,
			mass: 1
		}),
		opacity: withTiming(isGenresModal ? 0 : 1, {
			duration: 1000
		}),
		display: isGenresModal ? 'none' : 'flex'
	}))
	return useMemo(
		() => ({ showAnimation, hideAnimation }),
		[showAnimation, hideAnimation]
	)
}
