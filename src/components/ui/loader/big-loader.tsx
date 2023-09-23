import { Color } from '@/utils/color'
import { memo } from 'react'
import { ActivityIndicator, View } from 'react-native'

const BigLoader = () => {
	return (
		<View
			style={{
				height: '100%',
				width: '100%',
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
