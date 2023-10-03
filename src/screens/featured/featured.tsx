import BookCard from '@/components/book-card/book-card'
import RainbowBookCard from '@/components/book-card/rainbow-book-card/rainbow-book-card'
import ScrollLayout from '@/components/layout/scroll-layout'
import Button from '@/components/ui/button/button'
import FlatList from '@/components/ui/flatlist/flatlist'
import FullScreenLoader from '@/components/ui/loader/big-loader'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import RecommendationList from '@/screens/featured/recommendation-list/recommendation-list'
import { catalogService } from '@/services/catalog-service'
import { removeEmoji } from '@/utils/remove-emoji'
import { useQuery } from '@tanstack/react-query'

const Featured = () => {
	const { data: catalog } = useQuery(['catalog'], () =>
		catalogService.catalog()
	)
	const { navigate } = useTypedNavigation()
	if (!catalog) return <FullScreenLoader />
	return (
		<ScrollLayout>
			<RecommendationList data={catalog.recommendations} />
			<FlatList
				horizontal
				data={catalog.mostRelatedGenres}
				renderItem={({ item: genre }) => (
					<Button
						onPress={() => {
							navigate('Genre', { id: genre.id })
						}}
						size={'medium'}
						variant={'ghost'}
						text={genre.name}
						className='mt-4 px-4'
					/>
				)}
			/>
			<FlatList
				headerText={'Best Sellers'}
				horizontal
				data={catalog.bestSellers}
				renderItem={({ item: book }) => (
					<BookCard
						onPress={() => {
							navigate('Book', { id: book.id })
						}}
						image={{ uri: book.image, height: 230, width: 150 }}
						title={book.title}
						likedPercentage={book.likedPercentage}
					/>
				)}
			/>
			<FlatList
				horizontal
				mt={40}
				data={catalog.popularNow}
				renderItem={({ item: book }) => (
					<RainbowBookCard
						onPress={() => {
							navigate('Book', { id: book.id })
						}}
						backgroundColor={book.color}
						image={{ uri: book.image }}
						title={book.title}
						description={book.description}
					/>
				)}
			/>
			<FlatList
				headerText={'New Releases'}
				horizontal
				data={catalog.newReleases}
				renderItem={({ item: book }) => (
					<BookCard
						onPress={() => {
							navigate('Book', { id: book.id })
						}}
						image={{ uri: book.image, height: 230, width: 145 }}
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
						renderItem={({ item: book }) => (
							<BookCard
								onPress={() => {
									navigate('Book', { id: book.id })
								}}
								image={{
									uri: book.image,
									height: 200,
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
				renderItem={({ item: book }) => (
					<BookCard
						onPress={() => {
							navigate('Book', { id: book.id })
						}}
						pages={book.pages}
						image={{
							uri: book.image,
							height: 260,
							width: 170
						}}
						title={book.title}
						author={book.author}
					/>
				)}
			/>
		</ScrollLayout>
	)
}

export default Featured
