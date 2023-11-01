import { useMemo } from 'react'
import { useAnimatedStyle, withTiming } from 'react-native-reanimated'

export const useReadingAnimation = (visible: boolean) => {
	const headerAnimation = useAnimatedStyle(() => ({
		transform: [
			{
				translateY: withTiming(visible ? 0 : -100)
			}
		],
		opacity: withTiming(visible ? 1 : 0)
	}))

	const footerAnimation = useAnimatedStyle(() => ({
		transform: [
			{
				translateY: withTiming(visible ? 0 : 100)
			}
		],
		opacity: withTiming(visible ? 1 : 0)
	}))

	return useMemo(() => ({ headerAnimation, footerAnimation }), [visible])
}
