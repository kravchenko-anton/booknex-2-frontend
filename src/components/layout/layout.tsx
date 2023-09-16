import { ViewDefaultProps } from '@/types/component-types'
import { FC, memo, PropsWithChildren } from 'react'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Layout: FC<PropsWithChildren<ViewDefaultProps>> = ({
	children,
	...props
}) => (
	<SafeAreaView edges={['right', 'top', 'left']} className='flex-1'>
		<View className='flex-1 p-2' {...props}>
			{children}
		</View>
	</SafeAreaView>
)

export default memo(Layout)
