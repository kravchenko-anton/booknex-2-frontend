import BookCard from '@/components/book-card/book-card'
import Header from '@/components/header/header'
import ScrollLayout from '@/components/layout/scroll-layout'
import AnimatedHeader from '@/components/ui/animated-header/animated-header'
import FlatList from '@/components/ui/flatlist/flatlist'
import BigLoader from '@/components/ui/loader/big-loader'
import { Title } from '@/components/ui/title/title'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import { useTypedRoute } from '@/hooks/useTypedRoute'
import { genreService } from '@/services/genre-service'
import { removeEmoji } from '@/utils/removeEmoji'
import { useQuery } from '@tanstack/react-query'
import { useSharedValue } from 'react-native-reanimated'

const Genre = () => {
	const { params } = useTypedRoute<'Genre'>()
	const { data: genre } = useQuery(['genres', params.id], () =>
		genreService.byId(+params.id)
	)
	const scrollPosition = useSharedValue(0)
	const { navigate } = useTypedNavigation()
	if (!genre) return <BigLoader />
	return (
		<>
			<AnimatedHeader
				title={removeEmoji(genre.name)}
				scrollPosition={scrollPosition}
				transientValue={50}
			/>
			<ScrollLayout
				onScroll={event => {
					scrollPosition.value = event.nativeEvent.contentOffset.y
				}}>
				<Header
					wrapperClassName='px-2'
					rightIcon={{
						element: (
							<Title size={24} weight={'bold'}>
								{genre.name}
							</Title>
						)
					}}
					leftIcon={{
						back: true
					}}
				/>
				<FlatList
					horizontal
					headerText={'Best Sellers'}
					data={genre.bestSellers}
					renderItem={({ item: book }) => (
						<BookCard
							title={book.title}
							image={{
								uri: book.image,
								height: 250,
								width: 160
							}}
							onPress={() => navigate('Book', { id: book.id })}
						/>
					)}
				/>

				<FlatList
					horizontal
					headerText={'Newest Books'}
					data={genre.newestBooks}
					renderItem={({ item: book }) => (
						<BookCard
							title={book.title}
							image={{
								uri: book.image,
								height: 220,
								width: 140
							}}
							onPress={() => navigate('Book', { id: book.id })}
						/>
					)}
				/>
			</ScrollLayout>
		</>
	)
}

export default Genre
