import MenuItem from '@/navigation/bottom-menu/menu-item'
import { Color } from '@/utils/color'
import type { FC } from 'react'
import { View } from 'react-native'
import { menuItems } from './menu-data'

import { TypeNavigate } from './menu.interface'

interface IBottomMenu {
	nav: TypeNavigate
	currentRoute?: string
}

const BottomMenu: FC<IBottomMenu> = properties => {
	return (
		<View
			className='border-t-solid w-full flex-row items-center justify-between border-t px-2 pb-2 pt-3'
			style={{
				borderTopColor: Color.gray,
				backgroundColor: Color.canvas
			}}>
			{menuItems.map(item => (
				<MenuItem key={item.path} item={item} {...properties} />
			))}
		</View>
	)
}

export default BottomMenu
