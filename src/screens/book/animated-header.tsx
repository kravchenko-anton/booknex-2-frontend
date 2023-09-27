import HamburgerMenu from '@/components/ui/hamburger-menu/hamburger-menu'
import Icon from '@/components/ui/icon/icon'
import { Title } from '@/components/ui/title/title'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import { headerAnimation } from '@/screens/book/header-animation'
import { AnimatedView } from '@/types/component-types'
import { Color } from '@/utils/color'
import type { FC } from 'react'
import { View } from 'react-native'

interface AnimatedHeaderProps {
	title: string
	scrollPosition: { value: number }
}
const AnimatedHeader: FC<AnimatedHeaderProps> = ({ scrollPosition, title }) => {
	const { goBack } = useTypedNavigation()
	const { headerStyle } = headerAnimation(scrollPosition)
	return (
		<AnimatedView className='h-full' style={[headerStyle]}>
			<View className='mt-auto flex-row items-center justify-between px-4'>
				<View className='flex-row items-center'>
					<Icon
						name={'arrow-left'}
						onPress={() => goBack()}
						size={'medium'}
						className='pl-0'
						color={Color.black}
					/>
					<Title size={18} className='w-3/4' weight={'bold'}>
						{title}
					</Title>
				</View>
				<HamburgerMenu
					position={'right'}
					color={Color.black}
					//TODO: сделать нормальный список
					elements={[
						{ title: 'Home', onPress: () => console.log('Home') },
						{ title: 'Library', onPress: () => console.log('Library') }
					]}
				/>
			</View>
		</AnimatedView>
	)
}

export default AnimatedHeader
