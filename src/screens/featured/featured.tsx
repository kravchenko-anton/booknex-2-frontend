import BookCard from '@/components/book-card/book-card'
import RainbowBookCard from '@/components/book-card/rainbow-book-card/rainbow-book-card'
import ScrollLayout from '@/components/layout/scroll-layout'
import Button from '@/components/ui/button/button'
import FlatList from '@/components/ui/flatlist/flatlist'
import FullScreenLoader from '@/components/ui/loader/big-loader'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import RecommendationList from '@/screens/featured/recommendation-list/recommendation-list'
import ShelfCard from '@/screens/featured/shelf-card/shelf-card'
import { catalogService } from '@/services/catalog-service'
import { shelfService } from '@/services/shelf-service'
import { removeEmoji } from '@/utils/remove-emoji'
import { useQuery } from '@tanstack/react-query'

const Featured = () => {
	const { data: catalog } = useQuery(['catalogs'], () =>
		catalogService.catalog()
	)
	const { data: shelves } = useQuery(['shelves'], () => shelfService.catalog())
	const { navigate } = useTypedNavigation()
	if (!catalog) return <FullScreenLoader />
	return (
		<ScrollLayout>
			<FlatList
				horizontal
				data={shelves}
				renderItem={({ item: shelve }) => (
					<ShelfCard
						id={shelve.id}
						backgroundColor={shelve.color}
						icon={shelve.icon}
						name={shelve.title}
					/>
				)}
			/>
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
						className='px-4'
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
						image={{ uri: book.picture, size: 'large' }}
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
						image={{ uri: book.picture }}
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
						image={{ uri: book.picture, size: 'medium' }}
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
									uri: book.picture,
									size: 'small'
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
							uri: book.picture,
							size: 'medium'
						}}
						title={book.title}
						author={book.author.name}
					/>
				)}
			/>
		</ScrollLayout>
	)
}

export default Featured
