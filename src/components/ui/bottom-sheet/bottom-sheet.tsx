import { useBottomSheet } from '@/components/ui/bottom-sheet/useBottomSheet'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { AnimatedView } from '@/types/component-types'
import { SCREEN_HEIGHT } from '@/utils/dimensions'
import { StatusBar } from 'expo-status-bar'
import type { FC } from 'react'
import { StyleSheet, View } from 'react-native'
import { GestureDetector } from 'react-native-gesture-handler'
import { FadeIn, FadeOut } from 'react-native-reanimated'
// TODO: улучшить тут код до иделала по производительности и тж
const BottomSheet: FC = () => {
	const { bottomSheet } = useTypedSelector(state => state.bottomSheet)
	const { bottomSheetStyle, gesture, touch } = useBottomSheet(!!bottomSheet)
	if (!bottomSheet) return null
	const { component: Component, background } = bottomSheet
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
					onTouchStart={touch.content}
					style={[
						{
							top: SCREEN_HEIGHT,
							height: SCREEN_HEIGHT,
							backgroundColor: background
						},
						bottomSheetStyle
					]}
					className='absolute z-50 w-full p-4'>
					<View className='mt-1 h-[6px] w-[50px] items-center justify-center self-center rounded-full bg-gray' />
					<Component />
				</AnimatedView>
			</GestureDetector>
		</>
	)
}

export default BottomSheet
