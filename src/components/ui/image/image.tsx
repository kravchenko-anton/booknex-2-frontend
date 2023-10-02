import { ImageTypes } from '@/components/ui/image/image-types'
import Skeleton from '@/components/ui/image/skeleton/skeleton'
import { getFileUrl } from '@/services/api-config'
import { FC, memo, useEffect, useState } from 'react'
import { Image as DefaultImage } from 'react-native'

const Image: FC<ImageTypes> = ({
	height = 100,
	width = 100,
	borderRadius = 12,
	transparentSkeleton = false,
	url,
	style,
	fullSize,
	...properties
}) => {
	const [isImageLoading, setIsImageLoading] = useState(true)

	useEffect(() => {
		setIsImageLoading(true)
		DefaultImage.prefetch(getFileUrl(url)).then(() => {
			setIsImageLoading(false)
		})
	}, [])

	return (
		<>
			<DefaultImage
				onError={error => {
					console.error('Image loading error:', error)
				}}
				onLoadEnd={() => {
					setIsImageLoading(false)
				}}
				source={{
					uri: getFileUrl(url),
					width,
					height
				}}
				style={[
					{
						width,
						height: fullSize ? '100%' : height,
						display: isImageLoading ? 'none' : 'flex',
						borderRadius
					},
					style
				]}
				{...properties}
			/>
			{isImageLoading && (
				<Skeleton
					width={width}
					transparent={transparentSkeleton}
					height={height}
					style={[
						{
							borderRadius
						},
						style
					]}
				/>
			)}
		</>
	)
}

export default memo(Image)
