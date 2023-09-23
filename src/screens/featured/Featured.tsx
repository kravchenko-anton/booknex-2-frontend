import BookCard from '@/components/book-card/book-card'
import Header from '@/components/header/header'
import ScrollLayout from '@/components/layout/scroll-layout'
import Button from '@/components/ui/button/button'
import FlatList from '@/components/ui/flatlist/flatlist'
import FullScreenLoader from '@/components/ui/loader/big-loader'
import { Title } from '@/components/ui/title/title'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import RainbowBookCard from '@/screens/featured/rainbow-book-card/rainbow-book-card'
import Recommendation from '@/screens/featured/recommendation/recommendation'
import { catalogService } from '@/services/catalog-service'
import { removeEmoji } from '@/utils/removeEmoji'
import { useQuery } from '@tanstack/react-query'

const Featured = () => {
	const { data: catalog } = useQuery(['catalog'], () =>
		catalogService.catalog()
	)
	const { navigate } = useTypedNavigation()
	if (!catalog) return <FullScreenLoader />
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
						name: `history`
					}
				}}
			/>
			<Recommendation data={catalog.recommendations} />
			<FlatList
				horizontal
				data={catalog.mostRelatedGenres}
				renderItem={({ item }) => (
					<Button
						size={'medium'}
						variant={'ghost'}
						text={item.name}
						className='mb-2 mr-2 rounded-3xl bg-white px-4 py-2'
					/>
				)}
			/>
			<FlatList
				headerText={'Best Sellers'}
				horizontal
				data={catalog.bestSellers}
				renderItem={({ item }) => (
					<BookCard
						onPress={() => navigate('Book', { id: item.id })}
						image={{ uri: item.image, height: 230, width: 150 }}
						title={item.title}
						likedPercent={item.likedPercent}
					/>
				)}
			/>
			<FlatList
				horizontal
				mt={40}
				data={catalog.popularNow}
				renderItem={({ item }) => (
					<RainbowBookCard
						onPress={() => navigate('Book', { id: item.id })}
						backgroundColor={item.color}
						image={{ uri: item.image, height: 140, width: 100 }}
						title={item.title}
						description={item.description}
					/>
				)}
			/>
			<FlatList
				headerText={'New Releases'}
				horizontal
				data={catalog.newReleases}
				renderItem={({ item }) => (
					<BookCard
						onPress={() => navigate('Book', { id: item.id })}
						image={{ uri: item.image, height: 230, width: 145 }}
					/>
				)}
			/>
			{catalog.genres.map(genre => {
				return (
					<FlatList
						key={genre.name}
						headerText={removeEmoji(genre.name)}
						horizontal
						mt={30}
						data={genre.majorBooks}
						renderItem={({ item }) => (
							<BookCard
								onPress={() => navigate('Book', { id: item.id })}
								image={{
									uri: item.image,
									height: 190,
									width: 130
								}}
							/>
						)}
					/>
				)
			})}

			<FlatList
				headerText={'In the same breath'}
				horizontal
				data={catalog.sameBreath}
				renderItem={({ item }) => (
					<BookCard
						onPress={() => navigate('Book', { id: item.id })}
						pages={item.pages}
						image={{
							uri: item.image,
							height: 260,
							width: 170
						}}
						title={item.title}
						author={item.author}
					/>
				)}
			/>
		</ScrollLayout>
	)
}

export default Featured
