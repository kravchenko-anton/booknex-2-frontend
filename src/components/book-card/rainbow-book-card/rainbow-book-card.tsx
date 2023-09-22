import { usePressAnimation } from '@/animations/press-animation'
import { RainbowBookCardProps } from '@/components/book-card/rainbow-book-card/rainbow-book-card-types'
import Image from '@/components/ui/image/image'
import { Title } from '@/components/ui/title/title'
import { AnimatedPressable } from '@/types/component-types'
import { Color } from '@/utils/color'
import { WINDOW_WIDTH } from '@/utils/dimensions'
import { FC } from 'react'
import { View } from 'react-native'

const RainbowBookCard: FC<RainbowBookCardProps> = props => {
	const { pressFunctions, animatedStyle } = usePressAnimation()
	return (
		<AnimatedPressable
			className='justify-between rounded-xl p-4'
			style={[
				{
					width: WINDOW_WIDTH * 0.9,
					height: 300,
					marginBottom: 6,
					backgroundColor: props.backgroundColor
				},
				animatedStyle
			]}
			{...pressFunctions}>
			<View className='items-center'>
				<Image
					url={props.image.uri}
					height={props.image.height}
					width={props.image.width}
				/>
				<Title
					numberOfLines={1}
					className='mt-2'
					weight={'bold'}
					size={20}
					color={Color.white}>
					{props.title}
				</Title>
			</View>
			<Title size={16} numberOfLines={3} color={Color.white} weight={'regular'}>
				{props.description}
			</Title>
		</AnimatedPressable>
	)
}

export default RainbowBookCard
