import AnimatedIcon from '@/components/ui/icon/animated-icon'
import { Title } from '@/components/ui/title/title'
import { useAction } from '@/hooks/useAction'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { useReadingAnimation } from '@/screens/reading/settings/reading-ui-animation'
import { ThemeColor } from '@/screens/reading/settings/sheet/reading/theme-pack'
import { AnimatedView } from '@/types/component-types'
import type { LineColorType } from '@/utils/color'
import { shadeRGBColor } from '@/utils/shade-color'
import { StatusBar } from 'expo-status-bar'
import type { FC } from 'react'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export const shadeBackground = -15
const ReadingUi: FC = () => {
	const { goBack } = useTypedNavigation()
	const { top } = useSafeAreaInsets()
	const { openBottomSheet } = useAction()
	const { progress } = useTypedSelector(state => state.reader)
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
							ThemeColor(colorScheme.theme.body.background),
							shadeBackground
						) as LineColorType
					}
					size={'medium'}
					className='w-[50px]'
					onPress={() => goBack()}
					color={ThemeColor(colorScheme.theme.p.color)}
				/>
				<AnimatedIcon
					name={'kebab-horizontal'}
					backgroundColor={
						shadeRGBColor(
							ThemeColor(colorScheme.theme.body.background),
							shadeBackground
						) as LineColorType
					}
					className='w-[50px]'
					size={'medium'}
					color={ThemeColor(colorScheme.theme.p.color)}
				/>
			</AnimatedView>

			<AnimatedView
				style={[
					footerAnimation,
					{
						backgroundColor: shadeRGBColor(
							ThemeColor(colorScheme.theme.body.background),
							shadeBackground
						)
					}
				]}
				className='h-18 absolute bottom-0 z-50 w-full flex-1 flex-row items-center justify-between   px-4'>
				{/* //TODO: сделать тут слайдер*/}
				<AnimatedIcon
					name='list-unordered'
					size='large'
					color={ThemeColor(colorScheme.theme.p.color) as LineColorType}
					className='pl-0'
				/>
				<AnimatedIcon
					name='search'
					size='large'
					color={ThemeColor(colorScheme.theme.p.color)}
				/>
				<Title
					size={24}
					center
					weight={'bold'}
					color={ThemeColor(colorScheme.theme.a.color)}>
					{(progress || 0) + '%'}
				</Title>
				<AnimatedIcon
					onPress={() => openBottomSheet('readingSettings')}
					name='typography'
					size='large'
					color={ThemeColor(colorScheme.theme.p.color)}
				/>
				<AnimatedIcon
					name='note'
					size='large'
					className='pr-0'
					color={ThemeColor(colorScheme.theme.p.color)}
				/>
			</AnimatedView>
			{
				// решить что делать с статус баром чтобы адаптивно подстраивался цвет
			}
			<StatusBar
				style={colorScheme.statusBar}
				backgroundColor={colorScheme.theme.body.background}
			/>
		</View>
	)
}

export default ReadingUi
