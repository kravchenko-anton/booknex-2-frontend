import { usePressAnimation } from '@/animations/press-animation'
import Icon from '@/components/ui/icon/icon'
import { Title } from '@/components/ui/title/title'
import { LibraryListElementType } from '@/screens/library/library-list-element/library-list-element-types'
import { AnimatedPressable } from '@/types/component-types'
import { Color } from '@/utils/color'
import { FC } from 'react'
import { View } from 'react-native'

const LibraryListElement: FC<LibraryListElementType> = ({
	icon,
	name,
	count,
	style,
	...properties
}) => {
	const { pressFunctions, animatedStyle } = usePressAnimation()
	return (
		<AnimatedPressable
			className='w-full flex-row items-center justify-between rounded-xl bg-dust p-4'
			style={[animatedStyle, style]}
			{...pressFunctions}
			{...properties}>
			<View className='flex-row items-center justify-between'>
				<Icon name={icon} size={'medium'} className='w-[40px] pb-0 pl-0 pt-0' />
				<Title size={20} weight={'bold'}>
					{name}
				</Title>
			</View>
			<Title size={20} weight={'regular'} color={Color.secondary}>
				{count}
			</Title>
		</AnimatedPressable>
	)
}

export default LibraryListElement
