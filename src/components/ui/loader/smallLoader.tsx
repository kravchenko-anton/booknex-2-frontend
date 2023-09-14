import { Color } from '@/utils/color'
import { memo } from 'react'
import { ActivityIndicator, View } from 'react-native'

const SmallLoader = () => (
	<View className='h-full w-full items-center justify-center'>
		<ActivityIndicator
			size='small'
			color={Color.secondary}
			style={{
				width: 200,
				height: 200
			}}
		/>
	</View>
)

export default memo(SmallLoader)
