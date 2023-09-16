import { ScrollViewDefaultProps } from '@/types/component-types'
import { FC, memo, PropsWithChildren } from 'react'
import { ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const ScrollLayout: FC<PropsWithChildren<ScrollViewDefaultProps>> = ({
	children,
	...props
}) => (
	<SafeAreaView edges={['right', 'top', 'left']} className='flex-1'>
		<ScrollView className='flex-1' {...props}>
			{children}
		</ScrollView>
	</SafeAreaView>
)

export default memo(ScrollLayout)
