import Icon from '@/components/ui/icon/icon'
import Image from '@/components/ui/image/image'
import { Title } from '@/components/ui/title/title'
import { Color } from '@/utils/color'
import { shadeRGBColor } from '@/utils/shade.color'
import { LinearGradient } from 'expo-linear-gradient'
import { FC } from 'react'
import { FlatList, View } from 'react-native'
import { RecommendationProps } from './recommendation-types'

const Recommendation: FC<RecommendationProps> = ({ data }) => {
	return (
		<View className='relative mt-4 items-center px-2'>
			<View className='absolute mb-4 h-full w-full rounded-[10px] bg-[#FDF7F4]'>
				<LinearGradient
					colors={[Color.primary, shadeRGBColor(Color.primary, -50)]}
					start={[0.1, 1.5]}
					end={[1, 0.9]}
					style={{
						borderRadius: 10,
						height: '50%'
					}}
				/>
			</View>
			<Icon
				name='thumbs-up-sharp'
				size={'small'}
				className='mb-2 mt-4 h-[45px] w-[45px] bg-canvas p-2'
			/>
			<Title className='mb-4' weight={'bold'} color={Color.white}>
				Recommended for you
			</Title>
			<FlatList
				horizontal
				className='mb-4'
				bounces={false}
				showsHorizontalScrollIndicator={false}
				data={data}
				renderItem={({ item }) => (
					<View className='mx-2 max-w-[160px]'>
						<Image url={item.image} height={200} width={150} />
						<View className='mt-2'>
							<Title numberOfLines={2} weight={'semiBold'}>
								{item.title}
							</Title>
							<Title numberOfLines={1} size={16} color={Color.gray}>
								{item.author}
							</Title>
						</View>
					</View>
				)}
			/>
		</View>
	)
}

export default Recommendation
