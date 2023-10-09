import { usePressAnimation } from '@/animations/press-animation'
import { Title } from '@/components/ui/title/title'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import { AnimatedPressable } from '@/types/component-types'
import { Color } from '@/utils/color'
import { shadeRGBColor } from '@/utils/shade-color'
import { LinearGradient } from 'expo-linear-gradient'
import { FC } from 'react'

interface ShelfListItemProperties {
	id: number
	backgroundColor: string
	icon: string
	name: string
}
const ShelfCard: FC<ShelfListItemProperties> = properties => {
	const { pressFunctions, animatedStyle } = usePressAnimation()
	const { navigate } = useTypedNavigation()
	return (
		<AnimatedPressable
			onPress={() => {
				navigate('Shelf', { id: properties.id })
			}}
			className='mb-2 h-[120px] w-[110px]'
			style={animatedStyle}
			{...pressFunctions}>
			<LinearGradient
				start={[0.45, 0.1]}
				end={[0.4, 1]}
				colors={[
					properties.backgroundColor,
					shadeRGBColor(properties.backgroundColor, -40)
				]}
				className='h-full w-full flex-1 rounded-xl  px-2 pb-2'>
				<Title className='ml-auto mt-1' color={Color.white} size={32}>
					{properties.icon}
				</Title>
				<Title
					numberOfLines={2}
					color={Color.white}
					weight={'bold'}
					className='mt-auto'
					size={16}>
					{properties.name}
				</Title>
			</LinearGradient>
		</AnimatedPressable>
	)
}

export default ShelfCard
