import { HeaderProps } from '@/components/header/header-types'
import Icon from '@/components/ui/icon/icon'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import { FC } from 'react'
import { View } from 'react-native'

const Header: FC<HeaderProps> = (props) => {
	const { goBack } = useTypedNavigation()
	return <View className='justify-between items-center flex-row'>
			<Icon name={'chevron-back-outline'} style={props.noVerticalPadding ? { paddingLeft: 0 }: {}}
			      onPress={() => goBack()} size={34}/>
	</View>
}

export default Header
