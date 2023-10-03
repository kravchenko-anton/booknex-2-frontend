import { AnimatedHeaderProperties } from '@/components/ui/animated-header/animated-header-types'
import { headerAnimation } from '@/components/ui/animated-header/header-animation'
import Icon from '@/components/ui/icon/icon'
import { Title } from '@/components/ui/title/title'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import { AnimatedView } from '@/types/component-types'
import { Color } from '@/utils/color'
import type { FC } from 'react'
import { View } from 'react-native'

const AnimatedHeader: FC<AnimatedHeaderProperties> = properties => {
	const { goBack } = useTypedNavigation()
	const { headerStyle } = headerAnimation(
		properties.scrollPosition,
		properties.transientValue
	)
	return (
		<AnimatedView
			className='absolute left-0 right-0 top-0 z-50 h-[75px] bg-canvas'
			style={headerStyle}>
			<View className='mt-auto flex-row items-center justify-between px-4'>
				<View className='flex-row items-center'>
					<Icon
						name={'arrow-left'}
						onPress={() => {
							goBack()
						}}
						size={'medium'}
						className='pl-0'
						color={Color.black}
					/>
					<Title size={18} className='w-3/4' weight={'bold'}>
						{properties.title}
					</Title>
				</View>
				{properties.rightIcon?.icon ? (
					<Icon {...properties.rightIcon.icon} />
				) : (
					properties.rightIcon?.element
				)}
			</View>
		</AnimatedView>
	)
}

export default AnimatedHeader
