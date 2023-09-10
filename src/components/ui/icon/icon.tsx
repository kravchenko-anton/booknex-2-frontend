import { IconProps } from '@/components/ui/icon/icon-types'
import { Ionicons } from '@expo/vector-icons'
import { FC } from 'react'
import { Pressable } from 'react-native'

const Icon:FC<IconProps> =
	({
	name = 'alert-outline',
	color,
	size = 24,
	padding = 8,
...props
}) => {
	return <Pressable className='justify-center items-center' style={{
		padding: padding,
	}} {...props}>
		<Ionicons name={name} size={size} color={color} />
	</Pressable>
}

export default Icon
