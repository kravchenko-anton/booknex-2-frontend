import { FC, memo, PropsWithChildren } from 'react'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { UViewProps } from '../types/component.types'

const Layout: FC<PropsWithChildren<UViewProps>> = ({ children, ...props }) => (
	<SafeAreaView edges={['right', 'top', 'left']} className='flex-1'>
		<View className='flex-1 p-2' {...props}>
			{children}
		</View>
	</SafeAreaView>
)

export default memo(Layout)
