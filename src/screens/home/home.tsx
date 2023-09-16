import Header from '@/components/header/header'
import ScrollLayout from '@/components/layout/scroll-layout'
import FlatList from '@/components/ui/flatlist/flatlist'
import Image from '@/components/ui/image/image'
import FullScreenLoader from '@/components/ui/loader/fullScreenLoader'
import { Title } from '@/components/ui/title/title'
import Recommendation from '@/screens/home/components/recommendation/recommendation'
import { catalogService } from '@/services/catalog-service'
import { Color } from '@/utils/color'
import { WINDOW_WIDTH } from '@/utils/dimensions'
import { useQuery } from '@tanstack/react-query'
import { View } from 'react-native'

const Home = () => {
	const { data: catalog } = useQuery(['adss'], () => catalogService.catalog())
	if (!catalog) return <FullScreenLoader />
	console.log(catalog)
	return (
		<ScrollLayout showsVerticalScrollIndicator={false}>
			<Header
				wrapperClassName='px-2 mb-2'
				leftIcon={{
					custom: (
						<Title weight={'semiBold'} size={30}>
							{new Date().getHours() < 12
								? 'Good morning'
								: new Date().getHours() < 18
								? 'Good afternoon'
								: 'Good evening'}
						</Title>
					)
				}}
				rightIcon={{
					icon: {
						name: `time-outline`
					}
				}}
			/>
			<Recommendation data={catalog.recommendations} />
			<FlatList
				horizontal
				data={catalog.mostRelatedGenres}
				renderItem={({ item }) => (
					<Title
						color={Color.black}
						weight={'regular'}
						className='mr-2 rounded-3xl bg-white p-2 px-3'>
						{item.name}
					</Title>
				)}
			/>
			<FlatList
				headerText={'Best Sellers'}
				horizontal
				data={catalog.bestSellers}
				renderItem={({ item }) => (
					<Image url={item.image} height={220} width={160} />
				)}
			/>
			<FlatList
				headerText={'Popular Now'}
				horizontal
				data={catalog.popularNow}
				renderItem={({ item }) => (
					<View
						className='justify-between rounded-xl p-4'
						style={{
							width: WINDOW_WIDTH * 0.9,
							height: 300,
							backgroundColor: `#${Math.floor(
								Math.random() * 16777215
							).toString(16)}`
						}}>
						<View className='items-center'>
							<Image url={item.image} height={150} width={100} />
							<Title
								numberOfLines={1}
								className='mt-2'
								weight={'bold'}
								size={20}
								color={Color.white}>
								{item.title}
							</Title>
						</View>
						<Title
							size={16}
							numberOfLines={3}
							color={Color.white}
							weight={'regular'}>
							{item.description}
						</Title>
					</View>
				)}
			/>
			<FlatList
				headerText={'New Releases'}
				horizontal
				data={catalog.newReleases}
				renderItem={({ item }) => (
					<Image url={item.image} height={250} width={180} />
				)}
			/>
			{catalog.genres.map(genre => {
				return (
					<FlatList
						key={genre.name}
						headerText={genre.name}
						horizontal
						data={genre.books}
						renderItem={({ item }) => (
							<Image url={item.image} height={220} width={160} />
						)}
					/>
				)
				//TODO: сделать после жанров что читают другие в виде отзывов
			})}
		</ScrollLayout>
	)
}

export default Home
