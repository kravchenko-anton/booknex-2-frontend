import { Color } from '@/utils/color'
import { memo } from 'react'
import { ActivityIndicator, View } from 'react-native'

const BigLoader = () => {
	return (
		<View
			style={{
				backgroundColor: Color.canvas
			}}
			className='absolute h-full w-full items-center justify-center'>
			<ActivityIndicator
				size='large'
				color={Color.secondary}
				className='h-[200px] w-[200px]'
			/>
		</View>
	)
}

export default memo(BigLoader)
