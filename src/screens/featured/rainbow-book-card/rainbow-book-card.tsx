import { usePressAnimation } from '@/animations/press-animation'
import Image from '@/components/ui/image/image'
import { Title } from '@/components/ui/title/title'
import { RainbowBookCardProperties } from '@/screens/featured/rainbow-book-card/rainbow-book-card-types'
import { AnimatedPressable } from '@/types/component-types'
import { Color } from '@/utils/color'
import type { FC } from 'react'
import { View } from 'react-native'

const RainbowBookCard: FC<RainbowBookCardProperties> = ({
	image,
	...properties
}) => {
	const { pressFunctions, animatedStyle } = usePressAnimation()
	return (
		<AnimatedPressable
			className='mb-1.5 h-[300px] w-[300px] justify-between rounded-xl p-4'
			style={[
				{
					backgroundColor: properties.backgroundColor
				},
				animatedStyle
			]}
			{...pressFunctions}
			{...properties}>
			<View className='items-center'>
				<Image url={image.uri} height={image.height} width={image.width} />
				<Title
					numberOfLines={1}
					className='mt-2'
					weight={'bold'}
					size={20}
					color={Color.white}>
					{properties.title}
				</Title>
			</View>
			<Title size={16} numberOfLines={3} color={Color.white} weight={'regular'}>
				{properties.description}
			</Title>
		</AnimatedPressable>
	)
}

export default RainbowBookCard
