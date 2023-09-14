import MenuItem from '@/navigation/bottom-menu/menu-item'
import { Color } from '@/utils/color'
import { FC } from 'react'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { menuItems } from './menu-data'

import { TypeNavigate } from './menu.interface'

interface IBottomMenu {
	nav: TypeNavigate
	currentRoute?: string
}

const BottomMenu: FC<IBottomMenu> = props => {
	const { bottom } = useSafeAreaInsets()

	return (
		<View
			className='border-t-solid w-full flex-row items-center justify-between border-t px-2 pt-3'
			style={{
				paddingBottom: bottom + 8,
				borderTopColor: Color.gray,
				backgroundColor: Color.canvas
			}}>
			{menuItems.map(item => (
				<MenuItem key={item.path} item={item} {...props} />
			))}
		</View>
	)
}

export default BottomMenu