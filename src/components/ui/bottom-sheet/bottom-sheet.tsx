import { useBottomSheet } from '@/components/ui/bottom-sheet/useBottomSheet'
import { AnimatedView } from '@/types/component-types'
import { SCREEN_HEIGHT } from '@/utils/dimensions'
import { StatusBar } from 'expo-status-bar'
import type { FC } from 'react'
import { StyleSheet, View } from 'react-native'
import { GestureDetector } from 'react-native-gesture-handler'
import { FadeIn, FadeOut } from 'react-native-reanimated'
// TODO: улучшить тут код до иделала по производительности и тж

const BottomSheet: FC = () => {
	const { bottomSheetStyle, colorPallet, bottomSheet, gesture, touch } =
		useBottomSheet()
	if (!bottomSheet) return null
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
							paddingBottom: 40,
							backgroundColor: colorPallet.backgroundColor
						},
						bottomSheetStyle
					]}
					className='absolute z-50 w-full pt-3.5'>
					<View className='mb-2 mt-1 h-[6px] w-[50px] items-center justify-center self-center rounded-full bg-gray' />
					<bottomSheet.component />
				</AnimatedView>
			</GestureDetector>
		</>
	)
}

export default BottomSheet
