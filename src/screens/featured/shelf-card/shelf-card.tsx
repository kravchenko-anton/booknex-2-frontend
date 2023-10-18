import PressableContainer from '@/components/pressable-container/pressable-container'
import { Title } from '@/components/ui/title/title'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import { Color } from '@/utils/color'
import { LinearGradient } from 'expo-linear-gradient'
import { FC } from 'react'
import { ImageBackground } from 'react-native'

interface ShelfListItemProperties {
	id: number
	picture: string
	icon: string
	name: string
}
const ShelfCard: FC<ShelfListItemProperties> = properties => {
	const { navigate } = useTypedNavigation()
	return (
		<PressableContainer
			onPress={() => {
				navigate('Shelf', { id: properties.id })
			}}
			className='mb-2 h-[130px] w-[120px] rounded-xl'>
			<ImageBackground
				source={{
					uri: properties.picture
				}}
				borderRadius={12}
				className='h-full w-full flex-1'>
				<LinearGradient
					colors={['transparent', Color.black]}
					start={[0.2, 0.2]}
					end={[0, 0.8]}
					className='absolute h-full w-full flex-1 rounded-xl'
				/>
				<Title
					numberOfLines={2}
					color={Color.white}
					weight={'bold'}
					className='mb-2 ml-2 mt-auto'
					size={16}>
					{properties.name}
				</Title>
			</ImageBackground>
		</PressableContainer>
	)
}

export default ShelfCard
