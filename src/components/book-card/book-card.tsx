import { usePressAnimation } from '@/animations/press-animation'
import {
	heightSettings,
	widthSettings
} from '@/components/book-card/book-card-settings'
import { BookCardProperties } from '@/components/book-card/book-card-types'
import Image from '@/components/ui/image/image'
import { Title } from '@/components/ui/title/title'
import { AnimatedPressable } from '@/types/component-types'
import { Color } from '@/utils/color'
import { FC, memo } from 'react'

const BookCard: FC<BookCardProperties> = ({
	image,
	likedPercentage,
	pages,
	...properties
}) => {
	const { pressFunctions, animatedStyle } = usePressAnimation()
	return (
		<AnimatedPressable
			className='mb-2'
			style={[
				animatedStyle,
				{
					width: widthSettings[image.size]
				}
			]}
			{...pressFunctions}
			{...properties}>
			<Image
				url={image.uri}
				height={heightSettings[image.size]}
				width={widthSettings[image.size]}
			/>
			{(likedPercentage && !pages) ||
				(!likedPercentage && pages && (
					<Title
						numberOfLines={1}
						weight={'semiBold'}
						size={15}
						color={Color.gray}
						className=' mt-2'>
						{likedPercentage
							? `👍 ${likedPercentage}% liked`
							: ` 📖 ${pages} pages`}
					</Title>
				))}
			<Title numberOfLines={2} weight={'bold'} size={20} color={Color.black}>
				{properties.title}
			</Title>
			<Title
				numberOfLines={1}
				weight={'regular'}
				size={16}
				color={Color.gray}
				className='mt-1'>
				{properties.author}
			</Title>
		</AnimatedPressable>
	)
}

export default memo(BookCard)
