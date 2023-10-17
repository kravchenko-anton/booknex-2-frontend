import { usePressAnimation } from '@/animations/press-animation'
import {
	pictureSettings,
	titleSettings
} from '@/components/author-card/author-card-settings'
import { AuthorCardProperties } from '@/components/author-card/author-card-types'
import Image from '@/components/ui/image/image'
import { Title } from '@/components/ui/title/title'
import { AnimatedPressable } from '@/types/component-types'
import { FC, memo } from 'react'

const AuthorCard: FC<AuthorCardProperties> = ({
	style,
	size = 'medium',
	...properties
}) => {
	const { pressFunctions, animatedStyle } = usePressAnimation()
	return (
		<AnimatedPressable
			className='mb-2'
			style={[
				{
					width: pictureSettings[size]
				},
				animatedStyle,
				style
			]}
			{...pressFunctions}
			{...properties}>
			<Image
				url={properties.picture}
				width={pictureSettings[size]}
				height={pictureSettings[size]}
			/>
			<Title size={titleSettings[size]} center weight={'bold'}>
				{properties.name}
			</Title>
		</AnimatedPressable>
	)
}

export default memo(AuthorCard)
