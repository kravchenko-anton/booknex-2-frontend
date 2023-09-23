import { Color } from '@/utils/color'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@/utils/dimensions'
import { memo } from 'react'
import { ActivityIndicator, View } from 'react-native'

const BigLoader = () => {
	return (
		<View
			style={{
				height: SCREEN_HEIGHT,
				width: SCREEN_WIDTH,
				backgroundColor: Color.canvas
			}}
			className='absolute items-center justify-center'>
			<ActivityIndicator
				size='large'
				color={Color.secondary}
				style={{
					width: 200,
					height: 200
				}}
			/>
		</View>
	)
}

export default memo(BigLoader)
