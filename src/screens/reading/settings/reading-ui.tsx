import AnimatedIcon from '@/components/ui/icon/animated-icon'
import { Title } from '@/components/ui/title/title'
import { useAction } from '@/hooks/useAction'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { useAnimation } from '@/screens/reading/settings/reading-ui-animation'
import { AnimatedView } from '@/types/component-types'
import { Color } from '@/utils/color'
import { StatusBar } from 'expo-status-bar'
import type { FC } from 'react'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const shadow = {
	shadowColor: '#000',
	shadowOffset: {
		width: 0,
		height: 3
	},
	shadowOpacity: 0.27,
	shadowRadius: 4.65,
	elevation: 7
}
const ReadingUi: FC = () => {
	const { goBack } = useTypedNavigation()
	const { visible } = useTypedSelector(state => state.readingUi)
	const { top, bottom } = useSafeAreaInsets()
	const { changeFontFamily } = useAction() // TODO: сделать настройки шрифта бо щас не работает
	const { headerAnimation, footerAnimation } = useAnimation(visible)
	return (
		<View className='absolute h-screen w-full'>
			<AnimatedView
				style={[
					{
						top
					},
					headerAnimation
				]}
				// TODO: сделать тут адаптивный топ
				className='absolute z-50 h-[65px] w-full flex-row items-center justify-between px-2'>
				<AnimatedIcon
					name={'arrow-left'}
					backgroundColor={Color.white}
					size={'medium'}
					style={shadow}
					className='w-[50px]'
					onPress={() => goBack()}
					color={Color.black}
				/>
				<AnimatedIcon
					name={'kebab-horizontal'}
					backgroundColor={Color.white}
					className='w-[50px]'
					style={shadow}
					size={'medium'}
					color={Color.black}
				/>
			</AnimatedView>

			<AnimatedView
				style={footerAnimation}
				className='h-18 absolute bottom-0 z-50 w-full flex-1 flex-row items-center justify-between  bg-white px-4'>
				{/* //TODO: сделать тут слайдер*/}
				<AnimatedIcon
					name='quote'
					size='large'
					color={Color.gray}
					className='pl-0'
				/>
				<AnimatedIcon name='search' size='large' color={Color.gray} />
				<Title size={24} center weight={'bold'} color={Color.primary}>
					{'0%'}
				</Title>
				<AnimatedIcon
					onPress={() => changeFontFamily('Impact, fantasy')}
					name='typography'
					size='large'
					color={Color.gray}
				/>
				<AnimatedIcon
					name='note'
					size='large'
					onPress={() => changeFontFamily('Arial, Helvetica, sans-serif')}
					className='pr-0'
					color={Color.gray}
				/>
			</AnimatedView>
			<StatusBar hidden={!visible} backgroundColor={Color.white} />
		</View>
	)
}

export default ReadingUi
