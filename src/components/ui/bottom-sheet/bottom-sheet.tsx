import { useBottomSheet } from '@/components/ui/bottom-sheet/useBottomSheet'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { shadeBackground } from '@/screens/reading/settings/reading-ui'
import { ThemeColor } from '@/screens/reading/settings/sheet/reading/theme-pack'
import { AnimatedView } from '@/types/component-types'
import { SCREEN_HEIGHT } from '@/utils/dimensions'
import { shadeRGBColor } from '@/utils/shade-color'
import { StatusBar } from 'expo-status-bar'
import type { FC } from 'react'
import { useEffect, useRef } from 'react'
import { StyleSheet, View } from 'react-native'
import { GestureDetector } from 'react-native-gesture-handler'
import type Animated from 'react-native-reanimated'
import { FadeIn, FadeOut } from 'react-native-reanimated'
// TODO: улучшить тут код до иделала по производительности и тж
const BottomSheet: FC = () => {
	const { bottomSheet } = useTypedSelector(state => state.bottomSheet)
	const { colorScheme } = useTypedSelector(state => state.readingSettings)
	const bottomSheetReference = useRef<Animated.View>(null)
	const { bottomSheetStyle, toggle, gesture, touch } = useBottomSheet(
		!!bottomSheet
	)
	useEffect(() => {
		if (!bottomSheetReference.current) return
		bottomSheetReference.current?.measure((x, y, width, height) => {
			if (!height) return
			toggle(height)
		})
	}, [toggle])
	if (!bottomSheet) return null
	const { component: Component } = bottomSheet
	return (
		<>
			<AnimatedView
				entering={FadeIn}
				exiting={FadeOut}
				onTouchStart={touch.wrapper}
				style={{ ...StyleSheet.absoluteFillObject }}
				className='absolute z-10 h-full w-full flex-1  bg-[#0000006a]'
			/>
			<StatusBar hidden={true} />
			<GestureDetector gesture={gesture}>
				<AnimatedView
					ref={bottomSheetReference}
					style={[
						{
							top: SCREEN_HEIGHT,
							paddingBottom: 40,
							backgroundColor: shadeRGBColor(
								ThemeColor(colorScheme.theme.body.background),
								shadeBackground
							)
						},
						bottomSheetStyle
					]}
					className='absolute z-50 w-full pt-3.5'>
					<View className='mb-2 mt-1 h-[6px] w-[50px] items-center justify-center self-center rounded-full bg-gray' />
					<Component />
				</AnimatedView>
			</GestureDetector>
		</>
	)
}

export default BottomSheet
