import { usePressAnimation } from '@/animations/press-animation'
import { BookCardProps } from '@/components/book-card/book-card-types'
import Image from '@/components/ui/image/image'
import { Title } from '@/components/ui/title/title'
import { AnimatedPressable } from '@/types/component-types'
import { Color } from '@/utils/color'
import { FC, memo } from 'react'

const BookCard: FC<BookCardProps> = ({
	image,
	likedPercent,
	pages,
	...props
}) => {
	const { pressFunctions, animatedStyle } = usePressAnimation()
	return (
		<AnimatedPressable
			style={[
				animatedStyle,
				{
					width: image.width,
					marginBottom: 6
				}
			]}
			{...pressFunctions}
			{...props}>
			<Image url={image.uri} height={image.height} width={image.width} />
			{(likedPercent && !pages) ||
				(!likedPercent && pages && (
					<Title
						numberOfLines={1}
						weight={'semiBold'}
						size={15}
						color={Color.gray}
						className=' mt-2'>
						{likedPercent ? `👍 ${likedPercent}% liked` : ` 📖 ${pages} pages`}
					</Title>
				))}
			{props.title && (
				<Title numberOfLines={2} weight={'bold'} size={20} color={Color.black}>
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

export default memo(BookCard)
