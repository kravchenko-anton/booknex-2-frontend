import { ImageTypes } from '@/components/ui/image/image-types'
import Skeleton from '@/components/ui/image/skeleton/skeleton'
import { getFileUrl } from '@/services/api-config'
import { FC, memo, useState } from 'react'
import { Image as DefaultImage, View } from 'react-native'

const Image: FC<ImageTypes> = ({
	height = 100,
	width = 100,
	borderRadius = 12,
	transparentSkeleton = false,
	url,
	style,
	fullSize,
	wrapperClassName,
	wrapperStyle,
	...props
}) => {
	const [isImageLoading, setIsImageLoading] = useState(true)
	return (
		<View className={wrapperClassName} style={wrapperStyle}>
			<DefaultImage
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
				{...props}
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
		</View>
	)
}

export default memo(Image)
