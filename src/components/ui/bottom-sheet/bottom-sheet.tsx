import { useBottomSheet } from '@/components/ui/bottom-sheet/useBottomSheet'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { ThemeColor } from '@/redux/reading-settings/reading-settings-slice'
import { shadeBackground } from '@/screens/reading/settings/reading-ui'
import { AnimatedView } from '@/types/component-types'
import { SCREEN_HEIGHT } from '@/utils/dimensions'
import { shadeRGBColor } from '@/utils/shade-color'
import { StatusBar } from 'expo-status-bar'
import type { FC } from 'react'
import { StyleSheet, View } from 'react-native'
import { GestureDetector } from 'react-native-gesture-handler'
import { FadeIn, FadeOut } from 'react-native-reanimated'
// TODO: улучшить тут код до иделала по производительности и тж
const BottomSheet: FC = () => {
	const { bottomSheet } = useTypedSelector(state => state.bottomSheet)
	const { theme } = useTypedSelector(state => state.readingSettings)
	const { bottomSheetStyle, gesture, touch } = useBottomSheet(!!bottomSheet)
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
					style={[
						{
							top: SCREEN_HEIGHT,
							height: SCREEN_HEIGHT,
							backgroundColor: shadeRGBColor(
								ThemeColor(theme.body.background),
								shadeBackground
							)
						},
						bottomSheetStyle
					]}
					className='absolute z-50 w-full pt-4'>
					<View className='mt-1 h-[6px] w-[50px] items-center justify-center self-center rounded-full bg-gray' />
					<Component />
				</AnimatedView>
			</GestureDetector>
		</>
	)
}

export default BottomSheet
