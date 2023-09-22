import { usePressAnimation } from '@/animations/press-animation'
import { BookCardProps } from '@/components/book-card/book-card-types'
import Image from '@/components/ui/image/image'
import { Title } from '@/components/ui/title/title'
import { AnimatedPressable } from '@/types/component-types'
import { Color } from '@/utils/color'
import { FC } from 'react'

const BookCard: FC<BookCardProps> = props => {
	const { pressFunctions, animatedStyle } = usePressAnimation()
	return (
		<AnimatedPressable
			{...pressFunctions}
			style={[
				animatedStyle,
				{
					width: props.image.width,
					marginBottom: 6
				}
			]}>
			<Image
				url={props.image.uri}
				height={props.image.height}
				width={props.image.width}
			/>
			{props.title && (
				<Title
					numberOfLines={2}
					weight={'bold'}
					size={20}
					color={Color.black}
					className='mt-2'>
					{props.title}
				</Title>
			)}
			{props.author && (
				<Title
					numberOfLines={1}
					weight={'regular'}
					size={16}
					color={Color.gray}
					className='mt-1'>
					{props.author}
				</Title>
			)}
		</AnimatedPressable>
	)
}

export default BookCard
