import AdminButton from '@/components/layout/admin-button'
import type { ViewDefaultProps } from '@/types/component-types'
import type { FC, PropsWithChildren } from 'react'
import { memo } from 'react'
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
		<AdminButton />
	</SafeAreaView>
)

export default memo(Layout)
