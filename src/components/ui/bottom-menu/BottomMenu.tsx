import { FC } from 'react'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Color } from '../../../utils/color'
import { menuItems } from './menu.data'


import { TypeNavigate } from './menu.interface'
import MenuItem from './MenuItem'

interface IBottomMenu {
	nav: TypeNavigate
	currentRoute?: string
}

const BottomMenu: FC<IBottomMenu> = props => {
	const { bottom } = useSafeAreaInsets()

	return (
		<View
			className='flex-row justify-between pt-3 px-2 items-center w-full border-t border-t-solid'
			style={{
				paddingBottom: bottom + 8,
				borderTopColor: Color.gray,
				backgroundColor: Color.background,
			}}
		>
			{menuItems.map(item => (
				<MenuItem key={item.path } item={item} {...props} />
			))}
		</View>
	)
}

export default BottomMenu
