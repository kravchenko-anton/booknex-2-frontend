import { useAction } from '@/hooks/useAction'
import { SCREEN_HEIGHT } from '@/utils/dimensions'
import { useEffect } from 'react'
import type { GestureResponderEvent } from 'react-native'
import { Gesture } from 'react-native-gesture-handler'
import {
	Easing,
	Extrapolation,
	interpolate,
	runOnJS,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
	withTiming
} from 'react-native-reanimated'

export const useBottomSheet = (visible: boolean) => {
	const translationY = useSharedValue(0)
	const oldTranslationY = useSharedValue(0)
	const { closeBottomSheet } = useAction()

	useEffect(() => {
		// TODO: доделать выпригивание
		translationY.value = withSpring(-SCREEN_HEIGHT / 3, {
			stiffness: 2,
			damping: 10,
			overshootClamping: true,
			restDisplacementThreshold: 0.1,
			restSpeedThreshold: 0.1
		})
	}, [visible])

	const gesture = Gesture.Pan()
		.onStart(() => (oldTranslationY.value = translationY.value))
		.onUpdate(event => {
			translationY.value = event.translationY + oldTranslationY.value
			translationY.value = Math.max(translationY.value, -SCREEN_HEIGHT)
		})
		.onEnd(() => {
			switch (true) {
				case translationY.value < -SCREEN_HEIGHT / 2: {
					translationY.value = withTiming(-SCREEN_HEIGHT)
					break
				}
				case translationY.value > -SCREEN_HEIGHT / 5: {
					translationY.value = withTiming(
						0,
						{ duration: 200, easing: Easing.ease },
						() => runOnJS(closeBottomSheet)()
					)
					break
				}
				case translationY.value > -SCREEN_HEIGHT / 2: {
					translationY.value = withSpring(-SCREEN_HEIGHT / 3, { damping: 10 })
					break
				}
			}
		})
	const bottomSheetStyle = useAnimatedStyle(() => {
		const borderRaduis = interpolate(
			translationY.value,
			[-SCREEN_HEIGHT + 100, -SCREEN_HEIGHT + 50],
			[25, 0],
			Extrapolation.CLAMP
		)
		return {
			transform: [{ translateY: translationY.value }],
			borderTopLeftRadius: borderRaduis,
			borderTopRightRadius: borderRaduis
		}
	})

	const touch = {
		wrapper: (event: GestureResponderEvent) => {
			event.stopPropagation()
			translationY.value = withTiming(
				0,
				{ duration: 200, easing: Easing.ease },
				() => runOnJS(closeBottomSheet)()
			)
		},
		content: (event: GestureResponderEvent) => {
			event.stopPropagation()
		}
	}
	console.log('REnder hook')
	return {
		bottomSheetStyle,
		gesture,
		touch
	}
}
