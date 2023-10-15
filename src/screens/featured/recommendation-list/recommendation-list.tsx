import BookCard from '@/components/book-card/book-card'
import Icon from '@/components/ui/icon/icon'
import { Title } from '@/components/ui/title/title'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import { Color } from '@/utils/color'
import { shadeRGBColor } from '@/utils/shade-color'
import { LinearGradient } from 'expo-linear-gradient'
import type { FC } from 'react'
import { FlatList, View } from 'react-native'
import type { RecommendationProperties } from './recommendation-list-types'

const RecommendationList: FC<RecommendationProperties> = ({ data = [] }) => {
	const { navigate } = useTypedNavigation()
	return (
		<View className='relative mt-4 items-center px-2'>
			<View className='absolute mb-4 h-full w-full rounded-[10px] bg-pale'>
				<LinearGradient
					colors={[Color.primary, shadeRGBColor(Color.primary, -50)]}
					start={[0.1, 1.5]}
					end={[1, 0.9]}
					className='h-[50%] rounded-xl'
				/>
			</View>
			<Icon
				name='thumbsup'
				size={'medium'}
				className='mb-2 mt-4 h-[45px] w-[45px] bg-canvas p-2'
			/>
			<Title className='mb-4' weight={'bold'} color={Color.white}>
				Recommended for you
			</Title>
			<FlatList
				ItemSeparatorComponent={() => <View className='w-[12px]' />}
				contentContainerStyle={{ paddingHorizontal: 8 }}
				horizontal
				className='mb-4'
				bounces={false}
				renderToHardwareTextureAndroid={true}
				removeClippedSubviews={true}
				showsHorizontalScrollIndicator={false}
				data={data}
				renderItem={({ item: book }) => (
					<BookCard
						onPress={() => {
							navigate('Book', { id: book.id })
						}}
						image={{
							uri: book.picture,
							size: 'medium'
						}}
						title={book.title}
						author={book.author.name}
					/>
				)}
			/>
		</View>
	)
}

export default RecommendationList
