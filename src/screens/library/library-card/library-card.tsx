import PressableContainer from '@/components/pressable-container/pressable-container'
import Icon from '@/components/ui/icon/icon'
import { Title } from '@/components/ui/title/title'
import { LibraryListElementType } from '@/screens/library/library-card/library-card-types'
import { Color } from '@/utils/color'
import { FC } from 'react'
import { View } from 'react-native'
// TODO: убрать и вынести в обычный пропс, нигде больше не юзаеться и рне будет

const LibraryCard: FC<LibraryListElementType> = ({
	icon,
	name,
	count,
	style,
	...properties
}) => {
	return (
		<PressableContainer
			className='w-full flex-row items-center justify-between rounded-xl bg-dust p-4'
			style={style}
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
		</PressableContainer>
	)
}

export default LibraryCard
