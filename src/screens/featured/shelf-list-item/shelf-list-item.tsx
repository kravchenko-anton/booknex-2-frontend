import { usePressAnimation } from '@/animations/press-animation'
import { Title } from '@/components/ui/title/title'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import { AnimatedPressable } from '@/types/component-types'
import { Color } from '@/utils/color'
import { FC } from 'react'

interface ShelfListItemProperties {
	id: number
	backgroundColor: string
	icon: string
	name: string
}
const ShelfListItem: FC<ShelfListItemProperties> = properties => {
	const { pressFunctions, animatedStyle } = usePressAnimation()
	const { navigate } = useTypedNavigation()
	return (
		<AnimatedPressable
			onPress={() => {
				navigate('Shelf', { id: properties.id })
			}}
			className='mb-2 h-[120px] w-[110px] rounded-xl px-2 pb-2'
			style={[
				{
					backgroundColor: properties.backgroundColor
				},
				animatedStyle
			]}
			{...pressFunctions}>
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
		</AnimatedPressable>
	)
}

export default ShelfListItem
