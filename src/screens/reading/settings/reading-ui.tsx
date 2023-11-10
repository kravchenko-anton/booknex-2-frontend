import { BottomSheetListEnum } from '@/components/ui/bottom-sheet/bottom-sheet-list'
import AnimatedIcon from '@/components/ui/icon/animated-icon'
import { Slider } from '@/components/ui/slider/slider'
import { Title } from '@/components/ui/title/title'
import { useAction } from '@/hooks/useAction'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { useReadingAnimation } from '@/screens/reading/settings/reading-ui-animation'
import { AnimatedView } from '@/types/component-types'
import type { LineColorType } from '@/utils/color'
import { WINDOW_WIDTH } from '@/utils/dimensions'
import { shadeRGBColor } from '@/utils/shade-color'
import { StatusBar } from 'expo-status-bar'
import type { FC } from 'react'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message'

export const shadeBackground = -15
const ReadingUi: FC = () => {
	const { goBack } = useTypedNavigation()
	const { top } = useSafeAreaInsets()
	const { openBottomSheet, goToProgress } = useAction()
	const { progress: readerProgress, toc } = useTypedSelector(
		state => state.reader
	)
	const { visible } = useTypedSelector(state => state.readingUi)
	const { colorScheme } = useTypedSelector(state => state.readingSettings)
	const { headerAnimation, footerAnimation } = useReadingAnimation(visible)
	return (
		<View className='absolute h-screen w-full'>
			<AnimatedView
				style={[
					{
						top
					},
					headerAnimation
				]}
				className='absolute z-50 h-[65px] w-full flex-row items-center justify-between px-2'>
				<AnimatedIcon
					name={'arrow-left'}
					backgroundColor={
						shadeRGBColor(
							colorScheme.colorPalette.background,
							shadeBackground
						) as LineColorType
					}
					size={'medium'}
					className='w-[50px]'
					onPress={() => goBack()}
					color={colorScheme.colorPalette.text}
				/>
				<AnimatedIcon
					name={'kebab-horizontal'}
					backgroundColor={shadeRGBColor(
						colorScheme.colorPalette.background,
						shadeBackground
					)}
					className='w-[50px]'
					size={'medium'}
					color={colorScheme.colorPalette.text as LineColorType}
				/>
			</AnimatedView>

			<AnimatedView
				style={[
					footerAnimation,
					{
						backgroundColor: shadeRGBColor(
							colorScheme.colorPalette.background,
							shadeBackground
						)
					}
				]}
				className='h-18 absolute bottom-0 z-50 mt-0 w-full flex-1 pt-0'>
				{/* //TODO: сделать тут слайдер*/}
				<Slider
					trumbInside={true}
					initialValue={readerProgress}
					minValue={0}
					maxValue={100}
					className='mb-1 mt-2'
					borderRadius={0}
					width={WINDOW_WIDTH}
					onIndexChange={value => {
						console.log(value)
					}}
				/>
				<View className='mt-0 flex-row items-center justify-between  px-4'>
					<AnimatedIcon
						name='list-unordered'
						onPress={() =>
							toc
								? openBottomSheet(BottomSheetListEnum.readerChapters)
								: Toast.show({
										type: 'error',
										text1: 'Error',
										text2: 'Charapters is not loaded'
								  })
						}
						size='large'
						color={colorScheme.colorPalette.text}
						className='pl-0'
					/>
					<AnimatedIcon
						name='search'
						size='large'
						onPress={() => openBottomSheet(BottomSheetListEnum.readerSearch)}
						color={colorScheme.colorPalette.text}
					/>
					<Title
						size={24}
						center
						weight={'bold'}
						color={colorScheme.colorPalette.text}>
						{(readerProgress || 0) + '%'}
					</Title>
					<AnimatedIcon
						onPress={() => openBottomSheet(BottomSheetListEnum.readerSettings)}
						name='typography'
						size='large'
						color={colorScheme.colorPalette.text}
					/>
					<AnimatedIcon
						name='repo'
						size='large'
						onPress={() => openBottomSheet(BottomSheetListEnum.readerNoteBook)}
						className='pr-0'
						color={colorScheme.colorPalette.text}
					/>
				</View>
			</AnimatedView>
			<StatusBar
				style={colorScheme.statusBar}
				backgroundColor={colorScheme.colorPalette.background}
			/>
		</View>
	)
}

export default ReadingUi
