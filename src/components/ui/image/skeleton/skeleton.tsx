import type { SkeletonProps } from '@/components/ui/image/skeleton/skeleton-types'
import { Color } from '@/utils/color'
import { FC, memo } from 'react'
import { View } from 'react-native'

const Skeleton: FC<SkeletonProps> = ({
	style,
	height = 100,
	transparent = false,
	width = 100,
	borderRadius = 6
}) => {
	return (
		<View
			style={[
				{
					height: height as number,
					width,
					borderRadius,
					backgroundColor: transparent ? 'transparent' : Color.dust
				},
				style
			]}
		/>
	)
}

export default memo(Skeleton)
