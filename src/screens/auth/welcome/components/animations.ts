import { useMemo } from 'react'
import {
	useAnimatedStyle,
	withSpring,
	withTiming
} from 'react-native-reanimated'

export const useWelcomeAnimation = (isCheckEmailModal: boolean) => {
	const showAnimation = useAnimatedStyle(() => ({
		translateY: withSpring(isCheckEmailModal ? 0 : -100, {
			damping: 50,
			stiffness: 10,
			mass: 1
		}),
		opacity: withTiming(isCheckEmailModal ? 1 : 0, {
			duration: 1000
		}),
		display: isCheckEmailModal ? 'flex' : 'none'
	}))
	const hideAnimation = useAnimatedStyle(() => ({
		translateY: withSpring(isCheckEmailModal ? 100 : 0, {
			damping: 50,
			stiffness: 10,
			mass: 1
		}),
		opacity: withTiming(isCheckEmailModal ? 0 : 1, {
			duration: 1000
		}),
		display: isCheckEmailModal ? 'none' : 'flex'
	}))
	return useMemo(
		() => ({ showAnimation, hideAnimation }),
		[showAnimation, hideAnimation]
	)
}
